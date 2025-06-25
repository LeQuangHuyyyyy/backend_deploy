import React, { useState } from "react";
import "./index.scss";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSend } from "react-icons/ai";
import FormSocial from "../formsocial";

const mockComments = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Nguyễn Văn A",
    content: "Bài viết hay quá!",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Trần Thị B",
    content: "Đồng cảm với bạn!",
  },
];

export default function PostDetailModal({
  open,
  onClose,
  post,
  comments = mockComments,
  
  currentUser = {
    name: "Hung Nguyen",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
}) {
  const [commentValue, setCommentValue] = useState("");

  if (!open) return null;

  return (
    <div className="post-detail-modal__overlay">
      <div className="post-detail-modal__container">
        <div className="post-detail-modal__header">
          <span>Bài viết của {post?.name || "User"}</span>
          <button className="post-detail-modal__close" onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="post-detail-modal__content">
          <FormSocial {...post} />
        </div>
        <div className="post-detail-modal__comments">
          {comments.map((c) => (
            <div className="post-detail-modal__comment" key={c.id}>
              <img
                src={c.avatar}
                alt={c.name}
                className="post-detail-modal__comment-avatar"
              />
              <div className="post-detail-modal__comment-body">
                <div className="post-detail-modal__comment-name">{c.name}</div>
                <div className="post-detail-modal__comment-content">
                  {c.content}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="post-detail-modal__input-wrapper">
          <img
            src={currentUser.avatar}
            alt="me"
            className="post-detail-modal__input-avatar"
          />
          <input
            className="post-detail-modal__input"
            placeholder={`Bình luận dưới tên ${currentUser.name}`}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button className="post-detail-modal__send-btn">
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
}
