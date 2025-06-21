import React from 'react';
import './index.scss';
import { FaUsers, FaEye, FaCalendarAlt } from 'react-icons/fa';

const AboutGroup = () => {
  return (
    <div className="about-group-container">
      <div className="about-section">
        <h3 className="section-title">Giới thiệu</h3>
        <p className="section-content">
          Chào mừng đến với Hung Group! Đây là nơi chúng ta cùng nhau chia sẻ niềm đam mê, học hỏi và phát triển.
          Hãy cùng nhau xây dựng một cộng đồng vững mạnh và tích cực!
        </p>
      </div>
      <div className="info-section">
        <div className="info-item">
          <FaEye className="info-icon" />
          <div className="info-text">
            <span className="info-title">Công khai</span>
            <span className="info-subtitle">Bất kỳ ai cũng có thể thấy mọi người trong nhóm và những gì họ đăng.</span>
          </div>
        </div>
        <div className="info-item">
          <FaUsers className="info-icon" />
          <div className="info-text">
            <span className="info-title">1,234 thành viên</span>
          </div>
        </div>
        <div className="info-item">
          <FaCalendarAlt className="info-icon" />
          <div className="info-text">
            <span className="info-title">Ngày tạo: 01/01/2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGroup; 