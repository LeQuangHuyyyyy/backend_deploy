import React from "react";
import { Card, Row, Col, Statistic, Tooltip, Table, Empty } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import "./index.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

const summaryData = [
  { title: "Số lượt truy cập", value: 0 },
  { title: "Người dùng", value: 0 },
  { title: "Người mua", value: 0 },
  { title: "Tỉ lệ chuyển đổi", value: "NaN %" },
];

const columns = [
  { title: "Nguồn truy cập", dataIndex: "source", key: "source" },
  { title: "Tổng lượt truy cập", dataIndex: "total", key: "total" },
];

const dataSource = []; // Không có data

const lineChartData = {
  labels: [0],
  datasets: [
    {
      label: "Lượt truy cập",
      data: [],
      fill: false,
      borderColor: "#1890ff",
      backgroundColor: "#1890ff",
      tension: 0.4,
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: { title: { display: false } },
    y: { title: { display: false } },
  },
};

export default function MarketingDashboard() {
  return (
    <div className="marketing-dashboard">
      {/* Tổng quan */}
      <Row gutter={16} className="dashboard-summary">
        {summaryData.map((item) => (
          <Col span={6} key={item.title}>
            <Card>
              <Statistic
                title={
                  <span>
                    {item.title}{" "}
                    <Tooltip title={`Thông tin về ${item.title}`}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </span>
                }
                value={item.value}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Biểu đồ và kênh truy cập */}
      <Row gutter={16} className="dashboard-charts">
        <Col span={18}>
          <Card style={{ minHeight: 400 }}>
            <div className="dashboard-section-title">
              Lượt truy cập theo thời gian
            </div>
            <div style={{ height: 350, width: "100%" }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ minHeight: 400 }}>
            <div
              className="dashboard-section-title"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Số lượt truy cập theo kênh</span>
              <Tooltip title="Các số liệu được hiển thị có thể không khớp với số liệu thực tế và chỉ mang tính chất tham khảo do giới hạn của các công cụ theo dõi web.">
                <InfoCircleOutlined />
              </Tooltip>
            </div>
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <Empty description="No data" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Bảng nguồn truy cập */}
      <Card className="dashboard-table" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          locale={{ emptyText: <Empty description="No data" /> }}
          pagination={false}
        />
      </Card>
    </div>
  );
}
