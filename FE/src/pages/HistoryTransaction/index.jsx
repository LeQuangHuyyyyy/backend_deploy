import React, { useState } from "react";
import "./index.scss";
import {
  LeftOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import BannerChu from "../../components/bannerChu";

const transactions = [
  {
    id: 1,
    type: "in",
    title: "Hoàn tiền",
    desc: "giao dịch từ Vietbank",
    date: "21/01/2025",
    time: "14:41",
    amount: 100000,
  },
  {
    id: 2,
    type: "out",
    title: "Tham gia workshop",
    desc: "giao dịch từ Vietbank",
    date: "21/01/2025",
    time: "14:41",
    amount: -100000,
  },
  {
    id: 3,
    type: "in",
    title: "Hoàn tiền",
    desc: "giao dịch từ Vietbank",
    date: "21/01/2025",
    time: "14:41",
    amount: 100000,
  },
];

const TABS = [
  { key: "all", label: "Toàn bộ" },
  { key: "in", label: "Tiền vào" },
  { key: "out", label: "Tiền ra" },
];

function formatMoney(vnd) {
  return vnd.toLocaleString("vi-VN") + " VND";
}

export default function HistoryTransaction() {
  const [fromDate, setFromDate] = useState("21/01/2004");
  const [toDate, setToDate] = useState("21/01/2030");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = transactions.filter((t) =>
    activeTab === "all" ? true : t.type === activeTab
  );

  return (
    <div className="history-transaction-page">
      <BannerChu
        title="LỊCH SỬ GIAO DỊCH"
        breadcrumb="TRANG CHỦ / LỊCH SỬ GIAO DỊCH"
      />

      <div className="history-header">
        <div className="history-header-back">
          <LeftOutlined className="back-icon" />
        </div>
        <div className="date-group">
          <div className="date-label">từ ngày:</div>
          <div className="date-value">
            {fromDate} <CalendarOutlined className="calendar-icon" />
          </div>
        </div>
        <div className="date-group">
          <div className="date-label">đến ngày:</div>
          <div className="date-value">
            {toDate} <CalendarOutlined className="calendar-icon" />
          </div>
        </div>
      </div>
      <button className="search-btn">Tìm kiếm</button>
      <div className="history-content">
        <div className="history-tabs">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </div>
          ))}
        </div>
        <div className="history-list">
          {filtered.map((item) => (
            <div className="history-item" key={item.id}>
              <div className="history-item-left">
                <CreditCardOutlined className="item-icon" />
                <div>
                  <div className="item-title">{item.title}</div>
                  <div className="item-desc">{item.desc}</div>
                </div>
              </div>
              <div className="history-item-right">
                <div className="item-date">
                  {item.date} &nbsp; {item.time}
                </div>
                <div
                  className={`item-amount ${
                    item.amount > 0 ? "amount-in" : "amount-out"
                  }`}
                >
                  {(item.amount > 0 ? "+" : "") + formatMoney(item.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
