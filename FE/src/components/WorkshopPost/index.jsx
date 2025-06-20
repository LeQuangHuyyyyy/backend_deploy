import { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  TimePicker,
  Upload,
  message,
  Row,
  Col,
  Modal,
  Image,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import "./index.scss";
import { uploadImageToCloudinary } from "../../utils/upload";
import UploadExample from "../../utils/imagekit-upload";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import api from "../../config/api";
import { DatePicker } from "antd";
import dayjs from "dayjs"; // dùng để xử lý thời gian
import { showSuccessToast } from "./../../config/configToast";
import { toast } from "react-toastify";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
const { Option } = Select;

const WorkshopPost = ({ onClose }) => {
  const [fileList, setFileList] = useState([]);
  const [urlImage, setUrlImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(true);

  //const fileInputRef = useRef(null);
  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();
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
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  // Xử lý upload ảnh lên Cloudinary
  const handleFileUpload = async ({ file }) => {
    const imageUrl = await uploadImageToCloudinary(file);
    setUrlImage(imageUrl);
    if (imageUrl) {
      message.success("Upload ảnh thành công!");
      setFileList([{ uid: "-1", name: file.name, url: imageUrl }]);
    } else {
      message.error("Upload ảnh thất bại, vui lòng thử lại!");
    }
  };

  // Xử lý khi thay đổi fileList (AntD)
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Hàm upload video (gọi khi submit form)
  const handleVideoUpload = async () => {
    if (!videoFile) {
      alert("Please select a file to upload");
      return;
    }

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file: videoFile,
        fileName: videoFile.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        // onProgress: (event) => {
        //   setProgress((event.loaded / event.total) * 100);
        // },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };

  // Hàm submit form
  const handleFinish = async (values) => {
    // Gọi upload video trước (nếu có)
    //await handleVideoUpload();
    // Sau đó xử lý các giá trị form khác
    // ...
    try {
      const payload = {
        ...values,
        price: Number(values.price), // Chuyển sang number
        urlImage: urlImage, // Lấy URL ảnh từ fileList
      };
      const response = await api.post("/workshops", payload);
      console.log(response);
      showSuccessToast("Tạo workshop thành công");
    } catch (error) {
      console.log(error);
      toast.error("Tạo workshop thất bại");
    }
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
    setVideoFile(null);
    setPreviewImage("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
    setVideoFile(null);
    setPreviewImage("");
  };

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await api.get("/auth");
      //   if (!response.ok) {
      //       // If the server response is not successful, extract the error text for debugging.
      //       const errorText = await response.text();
      //       throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      //   }

      // Parse and destructure the response JSON for upload credentials.
      //const data = await response.json();
      const { signature, expire, token, publicKey } = response.data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  return (
    <Modal
      title="Tạo workshop mới"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1000}
    >
      <Form
        layout="vertical"
        className="workshop-form"
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 10 }}
        style={{ width: 900 }}
      >
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <Form.Item
              label="Thêm Hình Ảnh"
              name="urlImage"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
            >
              <Upload
                className="custom-upload"
                customRequest={handleFileUpload}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
              >
                {fileList.length >= 1 ? null : (
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload>
              {/* Preview khi click vào ảnh */}
              {previewImage && (
                <Image
                  style={{ width: "200% ", height: "200%" }}
                  className="custom-image"
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
            {/* <Form.Item
                label="Thêm Video"
                name="video"
                valuePropName="fileList"
                getValueFromEvent={(e) =>
                  Array.isArray(e) ? e : e && e.fileList
                }
              >
                <UploadExample onFileChange={(file) => setVideoFile(file)} />
              </Form.Item> */}
            <Form.Item label="Thông tin sự kiện" name="description" required>
              {/* <RichTextEditor value={description} onChange={setDescription} /> */}
              <Input.TextArea
                placeholder="VD: Làm Gốm là 1 nghệ thuật, và người làm gốm là 1 nghệ nhân"
                rows={4}
              />
            </Form.Item>
            <Form.Item label="Dia chi" name="address">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={14}>
            <Form.Item label="Tên Workshop" name="workshopTitle">
              <Input placeholder="VD: Làm Gốm" />
            </Form.Item>
            <Form.Item label="Doanh mục" name="category">
              <Select placeholder="VD: Nghệ thuật và sáng tạo">
                <Option value="ART">Nghệ thuật và sáng tạo</Option>
                <Option value="BUSINESS">Kinh doanh</Option>
                <Option value="COOKING">Ẩm thực</Option>
                <Option value="MUSIC">Âm nhạc</Option>
                <Option value="PHOTOGRAPHY">Nhiếp ảnh</Option>
                <Option value="TECHNOLOGY">Công nghệ</Option>
                <Option value="OTHER">Khác</Option>
                <Option value="WORKSHOP">Hội thảo</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Giá tiền cho vé " name="price">
              <Input placeholder="VD: 123.000 đ" />
            </Form.Item>

            <Form.List name="schedules">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div
                      key={key}
                      style={{
                        marginBottom: 24,
                        border: "1px solid #ccc",
                        padding: 16,
                        borderRadius: 8,
                      }}
                    >
                      {/* <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "title"]}
                            label="Tiêu đề lịch trình"
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập tiêu đề!",
                              },
                            ]}
                          >
                            <Input placeholder="VD: Buổi sáng làm gốm" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "description"]}
                            label="Mô tả lịch trình"
                          >
                            <Input placeholder="VD: Học cách tạo hình sản phẩm" />
                          </Form.Item>
                        </Col>
                      </Row> */}
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "startTime"]}
                            label="Thời gian bắt đầu"
                            rules={[
                              {
                                required: true,
                                message: "Chọn thời gian bắt đầu!",
                              },
                              // Rule: startTime phải ở tương lai
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value) return Promise.resolve();
                                  if (value.isBefore(dayjs())) {
                                    return Promise.reject(
                                      new Error(
                                        "Schedule start time must be in the future"
                                      )
                                    );
                                  }
                                  return Promise.resolve();
                                },
                              }),
                            ]}
                          >
                            <DatePicker
                              showTime
                              style={{ width: "100%" }}
                              format="YYYY-MM-DD HH:mm:ss"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "endTime"]}
                            label="Thời gian kết thúc"
                            rules={[
                              {
                                required: true,
                                message: "Chọn thời gian kết thúc!",
                              },
                              // Rule: endTime phải sau startTime
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  const startTime = getFieldValue([
                                    "schedules",
                                    name,
                                    "startTime",
                                  ]);

                                  // Nếu chưa chọn đủ thì bỏ qua
                                  if (!value || !startTime)
                                    return Promise.resolve();

                                  // Nếu đã là dayjs thì giữ nguyên, nếu là string thì chuyển về dayjs
                                  const end = dayjs.isDayjs(value)
                                    ? value
                                    : dayjs(value);
                                  const start = dayjs.isDayjs(startTime)
                                    ? startTime
                                    : dayjs(startTime);

                                  if (!end.isValid() || !start.isValid())
                                    return Promise.resolve();

                                  if (end.isSameOrBefore(start)) {
                                    return Promise.reject(
                                      new Error(
                                        "Schedule end time must be after start time"
                                      )
                                    );
                                  }

                                  return Promise.resolve();
                                },
                              }),
                            ]}
                          >
                            <DatePicker
                              showTime
                              style={{ width: "100%" }}
                              format="YYYY-MM-DD HH:mm:ss"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Button onClick={() => remove(name)} danger>
                        Xóa lịch trình này
                      </Button>
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      htmlType="submit"
                      block
                      icon={<PlusOutlined />}
                    >
                      + Thêm lịch trình
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <div className="button-group">
                <Button type="primary" htmlType="submit" className="submit-btn">
                  Tạo
                </Button>
                <Button
                  className="submit-btn"
                  style={{ marginRight: 20 }}
                  onClick={onClose}
                >
                  Hủy
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default WorkshopPost;
