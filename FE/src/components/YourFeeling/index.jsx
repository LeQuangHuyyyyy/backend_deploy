import React, { useState } from "react";
import "./index.scss";
import { LuImage, LuVideo } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { uploadImageToCloudinary } from "../../utils/upload";
import { message, Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../config/api";
import { toast } from "react-toastify";
const user = {
  name: "Hung Nguyen",
  avatar:
    "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
};
const groups = [
  { id: "me", name: "Hung Nguyen", avatar: user.avatar },
  { id: "group1", name: "Hùng Group", avatar: user.avatar },
  { id: "group2", name: "Nhóm Vui Vẻ", avatar: user.avatar },
];

export default function YourFeeling() {
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [urlImage, setUrlImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setContent("");
    setTitle("");
    setFileList([]);
    setUrlImage("");
    setSelectedGroup(groups[0]);
  };
  const handleGroupChange = (e) => {
    const group = groups.find((g) => g.id === e.target.value);
    setSelectedGroup(group);
  };
  const handleContentChange = (e) => setContent(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
  const handleFinish = async () => {
    if (!title.trim()) {
      toast.error("Vui lòng nhập tiêu đề!");
      return;
    }
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung!");
      return;
    }
    if (!urlImage) {
      toast.error("Vui lòng tải lên một ảnh!");
      return;
    }

    const data = {
      content: content,
      imageUrl: urlImage,
      title: title,
    };
    console.log(data);
    try {
      const response = await api.post("/blogs", data);
      console.log(response);
      toast.success("Đăng bài viết thành công!");
      handleCloseModal();
    } catch (error) {
      console.log(error);
      toast.error("Đăng bài viết thất bại!");
    }
  };
  return (
    <>
      <div
        className="your-feeling-container"
        onClick={handleOpenModal}
        style={{ cursor: "pointer" }}
      >
        <div className="post-input-section">
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
          <div className="text-input-wrapper">
            <span>Thêm Bài Viết Của Bạn Ở Đây</span>
          </div>
        </div>
        <hr className="divider" />
        <div className="post-actions">
          <button className="action-button">
            <LuVideo className="action-icon" />
            <span>Video</span>
          </button>
          <button className="action-button">
            <LuImage className="action-icon" />
            <span>Ảnh</span>
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-create-post">
            <div className="modal-header">
              <span className="modal-title">Tạo bài viết</span>
              <button className="close-btn" onClick={handleCloseModal}>
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="modal-user-row">
              <img
                src={selectedGroup.avatar}
                alt="avatar"
                className="modal-avatar"
              />
              <div className="modal-user-info">
                <select
                  value={selectedGroup.id}
                  onChange={handleGroupChange}
                  className="group-select"
                >
                  {groups.map((g) => (
                    <option value={g.id} key={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-title-input">
              <textarea
                className="modal-content-input"
                placeholder="Tiêu đề"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <textarea
              className="modal-content-input"
              placeholder="Bạn đang nghĩ gì?"
              value={content}
              onChange={handleContentChange}
            />
            <div className="modal-actions-row">
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
                  style={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
            <div className="modal-footer" onClick={handleFinish}>
              <button className="post-btn">Đăng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
