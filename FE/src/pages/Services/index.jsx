import React from "react";
import { Button } from "antd";
import "./index.scss";
import { useNavigate } from "react-router";

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Standard Service",
      price: "39.000 đ",
      features: [
        "Đề xuất các dụng cụ workshop",
        "Tham gia các buổi workshop do HAG tổ chức",
        "Đề xuất các khóa học hoặc workshop phù hợp dựa trên sở thích của người dùng",
        "Tự tính toán ra hóa đơn áp dụng những mã khuyến mãi",
      ],
    },
    {
      title: "Premium Service",
      price: "599.000 đ",
      features: [
        "Đặc Quyền như gói thành viên",
        "Tặng 1 voucher giảm 300.000 VND",
        "Giảm 5% khi thanh toán ngay lập tức",
        "Thanh toán trước 70% và trải nghiệm",
        "AI chatbot",
      ],
    },
  ];

  return (
    <div className="services-container">
      <div className="services-wrapper">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-header">
              <h2>{service.title}</h2>
              <p className="price">Giá Từ {service.price}</p>
            </div>
            <div className="service-features">
              <ul>
                {service.features.map((feature, idx) => (
                  <li key={idx}>
                    <span className="bullet">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="register-button">Đăng kí ngay</Button>
          </div>
        ))}
      </div>
      <div
        className="pagination"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <button  className="next-button">Tiếp</button>
      </div>
    </div>
  );
};

export default Services;
