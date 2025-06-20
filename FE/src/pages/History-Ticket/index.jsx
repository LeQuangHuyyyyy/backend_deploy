import React, { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router";

const TABS = [
  { label: "Tất cả" },
  { label: "Thành công" },
  { label: "Đang xử lý" },
  { label: "Đã huỷ" },
];

const STATUS_TABS = [{ label: "Sắp diễn ra" }, { label: "Đã kết thúc" }];

export default function HistoryTicket() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [activeStatus, setActiveStatus] = useState(0);

  const handleNavigateBuyTicket = () => {
    navigate("/");
  };
  // Giả sử chưa có vé nào
  const tickets = [];

  return (
    <div className="history-ticket">
      <h2 className="history-ticket__title">Vé đã mua</h2>
      <div className="history-ticket__tabs">
        {TABS.map((tab, idx) => (
          <button
            key={tab.label}
            className={`history-ticket__tab${
              activeTab === idx ? " active" : ""
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="history-ticket__status-tabs">
        {STATUS_TABS.map((tab, idx) => (
          <button
            key={tab.label}
            className={`history-ticket__status-tab${
              activeStatus === idx ? " active" : ""
            }`}
            onClick={() => setActiveStatus(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="history-ticket__content">
        {tickets.length === 0 ? (
          <div className="history-ticket__empty">
            <div className="history-ticket__empty-img">
              {/* SVG minh họa hoàng hôn */}
              <svg width="240" height="240" viewBox="0 0 240 240">
                <circle cx="120" cy="120" r="120" fill="#7a3f09" />
                <ellipse cx="120" cy="120" rx="100" ry="40" fill="#c13d0e" />
                <circle cx="170" cy="90" r="30" fill="#b36d0a" />
                <path
                  d="M60 180 Q120 160 180 180"
                  stroke="#000"
                  strokeWidth="6"
                  fill="none"
                />
                <ellipse cx="120" cy="170" rx="30" ry="35" fill="#6a5c1b" />
                <ellipse cx="120" cy="170" rx="20" ry="25" fill="#8a7c2b" />
                {/* Hình nhân vật */}
                <ellipse cx="120" cy="150" rx="28" ry="25" fill="#7a7a2b" />
                <ellipse cx="120" cy="135" rx="18" ry="16" fill="#b3b34a" />
                <ellipse cx="110" cy="170" rx="7" ry="10" fill="#b3b34a" />
                <ellipse cx="130" cy="170" rx="7" ry="10" fill="#b3b34a" />
              </svg>
            </div>
            <div className="history-ticket__empty-text">Bạn chưa có vé nào</div>
            <button className="history-ticket__buy-btn" onClick={handleNavigateBuyTicket}>Mua vé ngay</button>
          </div>
        ) : (
          // Hiển thị danh sách vé nếu có
          <div>Danh sách vé...</div>
        )}
      </div>
    </div>
  );
}
