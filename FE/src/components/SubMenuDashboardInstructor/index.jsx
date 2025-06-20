import React, { useEffect, useState } from "react";
import "./index.scss";
import { Select, Pagination } from "antd";
import OverviewDashboard from "../OverviewDashboard";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import MarketingDashboard from "../MarketingDashboard";

const workshops = [
  {
    img: "/img/photo1.jpg",
    title: "hello world!!!!!",
    author: "Sarah Lee",
    desc: "Tham gia hội thảo này để tìm hiểu những kiến thức cơ bản về nhiếp ảnh và nâng cao kỹ năng của bạn.",
    tags: ["Nhiếp ảnh", "Người mới bắt đầu"],
  },
  {
    img: "/img/photo2.jpg",
    title: "hello world!!!!!",
    author: "Sarah Lee",
    desc: "Tham gia hội thảo này để tìm hiểu những kiến thức cơ bản về nhiếp ảnh và nâng cao kỹ năng của bạn.",
    tags: ["Nhiếp ảnh", "Người mới bắt đầu"],
  },
  {
    img: "/img/photo2.jpg",
    title: "hello world!!!!!",
    author: "Sarah Lee",
    desc: "Tham gia hội thảo này để tìm hiểu những kiến thức cơ bản về nhiếp ảnh và nâng cao kỹ năng của bạn.",
    tags: ["Nhiếp ảnh", "Người mới bắt đầu"],
  },
];
const participants = [
  {
    name: "Nguyễn Văn B",
    group: "Nhóm 1",
    phone: "0909090999",
    product: "Ví da",
    progress: "70%",
    rating: "8/10",
    status: "Đang tham gia",
    statusColor: "#2ecc40",
  },
  {
    name: "Nguyễn Văn A",
    group: "Nhóm 2",
    phone: "0962251991",
    product: "Ví da",
    progress: "100%",
    rating: "9/10",
    status: "Đã hoàn thành",
    statusColor: "#2ecc40",
  },
  {
    name: "Nguyễn Văn C",
    group: "Chưa phân nhóm",
    phone: "0962259921",
    product: "Chưa có",
    progress: "0%",
    rating: "Chưa đánh giá",
    status: "Đã đăng ký",
    statusColor: "#2ecc40",
  },
];
const tabs = ["Overview", "Workshops", "Người tham gia", "Phân tích"];

function SubMenuDashboardInstructor() {
  const [activeTab, setActiveTab] = useState(0);
  const [workshops, setWorkshops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const dataWorkshop = async () => {
    const token = localStorage.getItem("token");
    let decode;
    if (typeof token === "string" && token) {
      decode = jwtDecode(token);
      console.log("Thông tin người dùng:", decode);
    } else {
      console.log("Không tìm thấy token hợp lệ");
      // có thể redirect về trang login tại đây
    }

    const id = decode?.id;
    const res = await api.get(`/workshops/instructor/${id}`);
    setWorkshops(res.data.content);
    return res.data;
  };
  useEffect(() => {
    dataWorkshop();
  }, []);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return workshops.slice(start, end);
  };

  return (
    <div className="submenu-instructor-wrapper">
      <div className="submenu-tabs">
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            className={`submenu-tab${activeTab === idx ? " active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="submenu-content">
        {activeTab === 0 && (
          <div className="overview-dashboard-wrapper">
            <OverviewDashboard />
          </div>
        )}
        {activeTab === 1 && (
          <div className="workshop-list">
            {Array.isArray(workshops) &&
              workshops
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((ws, idx) => (
                  <div className="workshop-card" key={ws.id || idx}>
                    <img
                      className="workshop-img"
                      src={ws.description}
                      alt={ws.title}
                    />
                    <div className="workshop-info">
                      <div className="workshop-title">{ws.workshopTitle}</div>
                      <div className="workshop-author">Bởi {ws.createBy}</div>
                      <div className="workshop-desc">{ws.description}</div>
                      {/* <div className="workshop-tags">
                      {ws.tags.map((tag, i) => (
                        <span className="workshop-tag" key={i}>
                          {tag}
                        </span>
                      ))}
                    </div> */}
                      <div className="workshop-owner">
                        <span className="owner-dot"></span>
                        <span className="owner-name">{ws.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={workshops.length}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showSizeChanger
                showTotal={(total) => `Tổng số ${total} workshop`}
              />
            </div>
          </div>
        )}
        {activeTab === 2 && (
          <div className="participants-table-wrapper">
            <div className="participants-table-title">
              {/* Dropdown chọn discount */}
              <Select
                style={{ width: "100%", marginTop: 10 }}
                placeholder="Chọn mã giảm giá"
                onChange={(value, option) => {
                  setSeletectedDiscount(value);
                  setSelectedDiscountPercentage(option?.data_percentage || 0);
                }}
              >
                <Option value={null}>KHÔNG ÁP DỤNG MÃ</Option>
                {/* {listDiscount.map((discount) => (
                  <Option 
                    key={discount.id}
                    value={discount.id}
                    data_percentage={discount.percentage}
                  >
                    {`${discount.code} - Giảm ${discount.percentage}%`}
                  </Option>
                ))} */}
              </Select>
            </div>
            <table className="participants-table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Nhóm</th>
                  <th>Số Điện Thoại</th>
                  <th>Sản phẩm</th>
                  <th>Tiến độ</th>
                  <th>Đánh giá</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.name}</td>
                    <td>{p.group}</td>
                    <td>{p.phone}</td>
                    <td>{p.product}</td>
                    <td>{p.progress}</td>
                    <td>{p.rating}</td>
                    <td style={{ color: p.statusColor, fontWeight: 500 }}>
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 3 && <MarketingDashboard />}
      </div>
    </div>
  );
}

export default SubMenuDashboardInstructor;
