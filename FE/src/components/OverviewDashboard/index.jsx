import React, { useState } from "react";
import "./index.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import api from "../../config/api";
import { Select } from "antd";

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

const percentRevenue = 0;
const percentTicket = 0;

const data = {
  labels: [
    "10 tháng 5 '25",
    "12 tháng 5 '25",
    "14 tháng 5 '25",
    "16 tháng 5 '25",
    "18 tháng 5 '25",
    "20 tháng 5 '25",
    "22 tháng 5 '25",
    "24 tháng 5 '25",
    "26 tháng 5 '25",
    "28 tháng 5 '25",
    "30 tháng 5 '25",
    "1 tháng 6 '25",
    "3 tháng 6 '25",
    "5 tháng 6 '25",
    "7 tháng 6 '25",
  ],
  datasets: [
    {
      label: "Doanh thu",
      data: [0, 1, 2, 1.5, 3, 2.5, 4, 3.5, 5, 4.5, 3, 2, 1, 2, 10],
      borderColor: "#a259ff",
      backgroundColor: "#a259ff",
      yAxisID: "y1",
      tension: 0.4,
      pointRadius: 2,
      borderWidth: 10,
    },
    {
      label: "Số vé bán",
      data: [0, 2, 1, 3, 2, 4, 3, 5, 4, 3, 2, 1, 2, 3, 100],
      borderColor: "#1abc60",
      backgroundColor: "#1abc60",
      yAxisID: "y2",
      tension: 0.4,
      pointRadius: 2,
      borderWidth: 10,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "black",
        font: { size: 14 },
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#23272a",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      ticks: { color: "black" },
      grid: { color: "#333" },
    },
    y1: {
      type: "linear",
      position: "left",
      title: { display: true, text: "Doanh thu", color: "#black" },
      ticks: { color: "#black", stepSize: 1 },
      grid: { color: "#333" },
      min: 0,
    },
    y2: {
      type: "linear",
      position: "right",
      title: { display: true, text: "Số vé bán", color: "black" },
      ticks: { color: "black", stepSize: 1 },
      grid: { drawOnChartArea: false },
      min: 0,
    },
  },
};

export default function OverviewDashboard() {
  const [seletedDiscount, setSeletectedDiscount] = useState(null);
  const [selectedDiscountPercentage, setSelectedDiscountPercentage] =
    useState(0);
  const [listDiscount, setListDiscount] = useState([]);
  const fetchDiscountList = async () => {
    try {
      const response = await api.get("Discount");
      const discounts = response.data.items;
      const filterDiscount = discounts.filter((item) => item.id !== 1);
      setListDiscount(filterDiscount);
    } catch (error) {
      console.log(error);
      toast.error("Error while fetching data!!");
    }
  };
  return (
    <div className="overview-dashboard">
      <div className="overview-dashboard__header">
        <div className="overview-dashboard__date">
          <span role="img" aria-label="calendar" style={{ marginRight: 8 }}>
            📅
          </span>
          04 Tháng 06, 2025 - 00:00
        </div>
        <div>
          <Select
            style={{ width: "100%", marginTop: 10 }}
            placeholder="Chon workshop"
            onChange={(value, option) => {
              setSeletectedDiscount(value);
              setSelectedDiscountPercentage(option?.data_percentage || 0);
            }}
          >
            {listDiscount.map((discount) => (
              <Option
                key={discount.id}
                value={discount.id}
                data_percentage={discount.percentage}
              >
                {`${discount.code} - Giảm ${discount.percentage}%`}
              </Option>
            ))}
          </Select>
          <button className="overview-dashboard__switch-btn">
            Đổi suất diễn
          </button>
          <button className="overview-dashboard__switch-btn">
            Chon workshop
          </button>
        </div>
      </div>
      <h2 className="overview-dashboard__title">Doanh thu</h2>
      <div className="overview-dashboard__overview">
        <div className="overview-dashboard__card">
          <div className="overview-dashboard__card-title">Doanh thu</div>
          <div className="overview-dashboard__card-value">0đ</div>
          <div className="overview-dashboard__card-desc">Tổng: 0đ</div>
          <div className="overview-dashboard__progress">
            <CircularProgressbar
              value={percentRevenue}
              text={`${percentRevenue} %`}
              styles={buildStyles({
                pathColor: "#ffb800",
                textColor: "#ffb800",
                trailColor: "#23272a",
                textSize: "22px",
                strokeLinecap: "round",
              })}
            />
          </div>
        </div>
        <div className="overview-dashboard__card">
          <div className="overview-dashboard__card-title">Số vé đã bán</div>
          <div className="overview-dashboard__card-value">0 vé</div>
          <div className="overview-dashboard__card-desc">Tổng: 10 vé</div>
          <div className="overview-dashboard__progress">
            <CircularProgressbar
              value={percentTicket}
              text={`${percentTicket} %`}
              styles={buildStyles({
                pathColor: "#ffb800",
                textColor: "#ffb800",
                trailColor: "#23272a",
                textSize: "22px",
                strokeLinecap: "round",
              })}
            />
          </div>
        </div>
      </div>
      <div className="overview-dashboard__chart-section">
        <div className="overview-dashboard__chart-header">
          <span className="dot purple"></span> Doanh thu
          <span className="dot green" style={{ marginLeft: 24 }}></span> Số vé
          bán
          {/* <div className="overview-dashboard__chart-range">
            <button className="range-btn">24 giờ</button>
            <button className="range-btn active">30 ngày</button>
          </div> */}
        </div>
        <div
          className="overview-dashboard__chart"
          style={{ maxHeight: "450px", height: "450px" }}
        >
          <Line
            data={data}
            height={400}
            options={{
              ...options,
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      </div>
      <div className="overview-dashboard__detail">
        <div className="overview-dashboard__detail-title">Chi tiết</div>
        <div className="overview-dashboard__table-title">Vé đã bán</div>
        <div className="overview-dashboard__table">
          <div className="overview-dashboard__table-row header">
            <div>Loại vé</div>
            <div>Giá bán</div>
            <div>Đã bán</div>
            <div>Bị khoá</div>
            <div>Tỉ lệ bán</div>
          </div>
          {/* Dữ liệu mẫu, bạn có thể map từ props/data */}
          <div className="overview-dashboard__table-row">
            <div>Vé thường</div>
            <div>100.000đ</div>
            <div>0</div>
            <div>0</div>
            <div>0%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
