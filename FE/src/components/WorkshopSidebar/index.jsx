import React from "react";
import "./index.scss";
import {
  ClockCircleOutlined,
  BookOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";

const latestWorkshops = [
  {
    id: 1,
    author: "Hưng Nguyễn",
    title: "The Complete Web.....",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 30,
  },
  {
    id: 2,
    author: "Hưng Nguyễn",
    title: "The Complete Web.....",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 30,
  },
  {
    id: 3,
    author: "Hưng Nguyễn",
    title: "The Complete Web ......",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 30,
  },
];

export default function WorkshopSidebar() {
  return (
    <div className="workshop-sidebar">
      {/* Workshop Info Card */}
      <div className="workshop-info-card">
        <div className="workshop-info-title">Thông tin của Workshop</div>
        <div className="workshop-info-list">
          <div className="workshop-info-item">
            <ClockCircleOutlined />
            <span>Thời Lượng</span>
            <span className="info-value">20 Tiếng</span>
          </div>
          <div className="workshop-info-item">
            <BookOutlined />
            <span>Số Lượng Bài Học</span>
            <span className="info-value">15</span>
          </div>
          <div className="workshop-info-item">
            <UserOutlined />
            <span>Người Tham Gia</span>
            <span className="info-value">Max 15</span>
          </div>
          <div className="workshop-info-item">
            <StarOutlined />
            <span>Kĩ Năng</span>
            <span className="info-value">Nâng Cao</span>
          </div>
        </div>
        <button className="join-btn">
          Tham gia workshop{" "}
          <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
        </button>
      </div>

      {/* Latest Workshops */}
      <div className="workshop-latest-card">
        <div className="workshop-latest-title">Workshop mới nhất</div>
        <div className="workshop-latest-list">
          {latestWorkshops.map((ws) => (
            <div className="workshop-latest-item" key={ws.id}>
              <img src={ws.avatar} alt={ws.author} className="latest-avatar" />
              <div className="latest-info">
                <div className="latest-author">By {ws.author}</div>
                <div className="latest-title">{ws.title}</div>
                <div className="latest-rating">
                  <span className="star">★</span>
                  {ws.rating}
                  <span className="review-count">({ws.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
