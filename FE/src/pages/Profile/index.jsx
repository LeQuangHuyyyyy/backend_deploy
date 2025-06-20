import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  Row,
  Col,
  Image,
} from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/api";
import { uploadImageToCloudinary } from "../../utils/upload";
import { showSuccessToast } from "../../config/configToast";
import { logout } from "../../redux/features/userSlice";

const Profile = () => {
  // State preview ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // State lưu danh sách file ảnh upload (AntD)
  const [fileList, setFileList] = useState([]);
  // State lưu dữ liệu người dùng
  const [data, setData] = useState({});
  // State/form control của AntD
  const [form] = Form.useForm();
  // Thêm state để lưu URL ảnh (avatar)
  const [avatarUrl, setAvatarUrl] = useState("");
  // Lấy user từ Redux

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy dữ liệu tài khoản từ API
  const fetchAccountData = async () => {
    try {
      const response = await api.get("users/me");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Gọi fetchAccountData khi component mount
  useEffect(() => {
    fetchAccountData();
  }, []);

  // Khi `data` thay đổi => set giá trị form
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        // email: data.email,
        // address: data.address,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        // birthday: data.birthday ? dayjs(data.birthday) : null,
        avatar: data.avatarUrl, // Đúng trường trả về từ API
      });
      // Nếu server trả về link ảnh => set vào state để hiển thị
      if (data.avatarUrl) {
        setAvatarUrl(data.avatarUrl);
        setFileList([
          {
            uid: "-1",
            name: "avatar",
            url: data.avatarUrl,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [data, form]);
  const getSvgDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file); // Đọc file SVG dưới dạng văn bản
      reader.onload = () => {
        const svgText = reader.result;
        const encodedSvg = encodeURIComponent(svgText); // Mã hóa URL
        const dataUrl = `data:image/svg+xml,${encodedSvg}`;
        resolve(dataUrl);
      };
      reader.onerror = (error) => reject(error);
    });
  // Hàm đọc file thành base64 để preview
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  // Xử lý preview khi click vào ảnh
  const handlePreview = async (file) => {
    if (!file.url && !file.preview && !file.url?.startsWith("data:image/svg")) {
      file.preview = await getBase64(file.originFileObj);
    }
    if (!file.url || file.url.startsWith("data:image/svg")) return;
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // Xử lý khi thay đổi fileList (AntD)
  const handleChange = async ({ fileList: newFileList }) => {
    const updatedFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (file.type === "image/svg+xml" && file.originFileObj) {
          try {
            const dataUrl = await getSvgDataUrl(file.originFileObj);
            return { ...file, url: dataUrl, thumbUrl: dataUrl };
          } catch (error) {
            console.error("Lỗi khi tạo data URL cho SVG:", error);
            return file;
          }
        }
        return file;
      })
    );
    setFileList(updatedFileList);
  };
  // Hàm upload ảnh lên Cloudinary
  const handleFileUpload = async ({ file }) => {
    const imageUrl = await uploadImageToCloudinary(file);
    if (imageUrl) {
      message.success("Upload ảnh thành công!");
      // Cập nhật fileList để hiển thị
      setFileList([{ uid: "-1", name: file.name, url: imageUrl }]);
      // Lưu URL ảnh vào state
      setAvatarUrl(imageUrl);
      // Lưu luôn vào Form field "avatar"
      form.setFieldsValue({ avatar: imageUrl });
    } else {
      message.error("Upload ảnh thất bại, vui lòng thử lại!");
    }
  };

  // // Hàm logout
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("role");
  //   dispatch(logout());
  //   message.success("Bạn đã đăng xuất!");
  //   navigate("/login");
  // };

  // // Nút quay lại
  // const handleHome = () => {
  //   navigate("/");
  // };

  // Hàm xử lý khi form submit
  const onFinish = async (values) => {
    try {
      console.log("Form values:", values);
      // Gọi API update
      await api.put("/users/me", values);
      showSuccessToast("Update success");
      message.success("Cập nhật thông tin thành công!");
      // Fetch lại dữ liệu mới
      fetchAccountData();
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật!");
      console.error(error);
    }
  };

  return (
    <div className="profile-page">
      <h2 style={{ textAlign: "center" }}>Thông tin cá nhân</h2>
      {/* Upload Avatar */}
      <div
        className="image-upload"
        style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #fdf6ee",
            }}
          />
        ) : (
          <Upload
            className="custom-upload"
            customRequest={({ file }) => handleFileUpload({ file })}
            listType="picture-circle"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            maxCount={1}
            previewFile={(file) => {
              if (file.url?.startsWith("data:image/svg")) {
                return Promise.reject(new Error("Không preview được ảnh SVG"));
              }
              return Promise.resolve(file.url || file.thumbUrl);
            }}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        )}
        {/* Preview khi click vào ảnh */}
        {previewImage && !previewImage.startsWith("data:image/svg") && (
          <Image
            style={{ width: "200% ", height: "200%" }}
            className="custom-image"
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>

      {/* Form hiển thị thông tin người dùng */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="form-user"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Form.Item label="Email" name="email">
              <Input type="email" />
            </Form.Item> */}
        {/* <Form.Item label="Địa chỉ" name="address">
              <Input />
            </Form.Item> */}
        <Form.Item label="Tên" name="lastName" style={{ width: "20%" }}>
          <Input />
        </Form.Item>

        {/* <Form.Item label="Ngày sinh" name="birthday">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item> */}
        <Form.Item label="Họ" name="firstName" style={{ width: "20%" }}>
          <Input />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone" style={{ width: "20%" }}>
          <Input />
        </Form.Item>

        {/* Trường ẩn để giữ URL avatar, nếu cần */}
        <Form.Item name="avatar" style={{ display: "none" }}>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item>
          <div className="button-left">
            {/* Khi bấm "Lưu thay đổi", form sẽ gọi onFinish */}
            <Button
              htmlType="submit"
              style={{
                marginRight: 10,
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              Lưu thay đổi
            </Button>
            {/* <Button onClick={handleLogout} danger icon={<LogoutOutlined />}>
              Đăng xuất
            </Button>
            <Button
              type="default"
              className="ant-btn-default"
              onClick={handleHome}
            >
              Quay lại
            </Button> */}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
