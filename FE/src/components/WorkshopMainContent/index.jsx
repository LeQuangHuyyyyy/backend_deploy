import React, { useState } from "react";
import "./index.scss";
import { StarFilled } from "@ant-design/icons";

const reviews = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/100?img=68",
    name: "AHIHI",
    content:
      "Nam vel lacus eu nisl bibendum accumsan vitae vitae nibh. Nam nec eros id magna hendrerit sagittis. Nullam sed mi non odio feugiat volutpat sit amet nec amet nec elit. Maecenas id hendrerit ipsum. Sed eget auctor metus, ac dapibus dolor.",
    rating: 5,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/100?img=12",
    name: "AHEHE",
    content:
      "Nam vel lacus eu nisl bibendum accumsan vitae vitae nibh. Nam nec eros id magna hendrerit sagittis. Nullam sed mi non odio feugiat volutpat sit amet nec amet nec elit. Maecenas id hendrerit ipsum. Sed eget auctor metus, ac dapibus dolor.",
    rating: 5,
  },
];

export default function WorkshopMainContent() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="workshop-main-content">
      {/* Workshop Image & Info */}
      <div className="workshop-main-header">
        <img
          className="workshop-main-image"
          src="https://img.youtube.com/vi/2Vv-BfVoq4g/maxresdefault.jpg"
          alt="Workshop"
        />
        <div className="workshop-main-author">
          <img
            className="author-avatar"
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="author"
          />
          <div>
            <div className="author-name">Guy Hawkins</div>
            <div className="author-role">PROJECT MANAGER</div>
          </div>
          <div className="author-rating">
            <span>
              {[...Array(5)].map((_, i) => (
                <StarFilled
                  key={i}
                  style={{ color: "#f7b731", fontSize: 16 }}
                />
              ))}
            </span>
            <span className="review-count">(25 Reviews)</span>
          </div>
          <div className="workshop-main-price">000.000 Đ</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="workshop-tabs">
        <div
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Tổng Quan
        </div>
        <div
          className={`tab-btn ${activeTab === "curriculum" ? "active" : ""}`}
          onClick={() => setActiveTab("curriculum")}
        >
          Khung chương trình
        </div>
        <div
          className={`tab-btn ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Đánh giá
        </div>
        <div
          className={`tab-btn ${activeTab === "intro" ? "active" : ""}`}
          onClick={() => setActiveTab("intro")}
        >
          Lời mở đầu
        </div>
      </div>

      {/* Tab Content */}
      <div className="workshop-tab-content">
        {activeTab === "overview" && (
          <div>
            <h3>Workshop về ....</h3>
            <p>
              Đây là phần tổng quan về workshop. Bạn có thể thêm nội dung mô tả
              ở đây.
            </p>
          </div>
        )}
        {activeTab === "curriculum" && (
          <div>
            <h3>Khung chương trình</h3>
            <p>Danh sách các bài học, module, ...</p>
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
            <h3>2 bài đánh giá</h3>
            <div className="workshop-reviews">
              {reviews.map((r) => (
                <div className="review-item" key={r.id}>
                  <img className="review-avatar" src={r.avatar} alt={r.name} />
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-content">{r.content}</div>
                    <div className="review-stars">
                      {[...Array(r.rating)].map((_, i) => (
                        <StarFilled
                          key={i}
                          style={{ color: "#f7b731", fontSize: 16 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "intro" && (
          <div>
            <h3>Lời mở đầu</h3>
            <p>Giới thiệu về workshop, giảng viên, ...</p>
          </div>
        )}
      </div>
    </div>
  );
}
