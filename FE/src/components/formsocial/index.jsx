import React, { useState } from "react";
import "./index.scss";
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

function renderContent(content) {
  // Tô màu hashtag dạng [#ENW493c] hoặc [#ENW492c]
  return content.split(/(\[#\w+\])/g).map((part, idx) => {
    if (/^\[#\w+\]$/.test(part)) {
      return (
        <span key={idx} className="form-social__hashtag">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function FormSocial({
  avatar,
  name,
  group,
  content = "",
  images = [],

  isLiked = false,

  onClick,
  onCommentClick,
}) {
  const [showFull, setShowFull] = useState(false);
  const showImages = images.slice(0, 3);
  const remain = images.length - 3;

  // Cắt content theo số từ
  const words = content.split(/\s+/);
  const maxWords = 100;
  const shouldTruncate = words.length > maxWords && !showFull;
  const displayContent = shouldTruncate
    ? words.slice(0, maxWords).join(" ") + "..."
    : content;

  return (
    <div className="form-social" onClick={onClick}>
      <div className="form-social__header">
        <img className="form-social__avatar" src={avatar} alt="avatar" />
        <div className="form-social__header-info">
          <div className="form-social__name">{group}</div>
          <div className="form-social__subtitle">{name}</div>
        </div>
        <div className="form-social__dots">
          <BsThreeDots />
        </div>
      </div>
      <div className="form-social__content">
        {renderContent(displayContent)}
        {shouldTruncate && (
          <span
            className="form-social__see-more"
            onClick={(e) => {
              e.stopPropagation();
              setShowFull(true);
            }}
          >
            {" "}
            Xem thêm
          </span>
        )}
      </div>
      {images.length > 0 && (
        <div className="form-social__images">
          {showImages.map((img, idx) => (
            <div className="form-social__img-wrap" key={idx}>
              <img className="form-social__img" src={img} alt="social-img" />
              {idx === 2 && remain > 0 && (
                <div className="form-social__img-overlay">+{remain}</div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="form-social__actions">
        <div className={`form-social__action-btn${isLiked ? " liked" : ""}`}>
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          <span>Thích</span>
        </div>
        <div
          className="form-social__action-btn"
          onClick={(e) => {
            e.stopPropagation();
            onCommentClick && onCommentClick();
          }}
        >
          <AiOutlineComment />
          <span>Bình luận</span>
        </div>
      </div>
    </div>
  );
}
