import React from "react";
import { Input, Button, Form } from "antd";
import "./index.scss";

const ActivateWorkshopOwner = () => {
  return (
    <div className="activate-bg">
      <div className="activate-card">
        <div className="activate-left">
          <h2>Thông tin thanh toán </h2>
          <Form layout="vertical" className="activate-form">
            <Form.Item name="shopName">
              <Input placeholder="Tên Chủ Tài Khoản*" />
            </Form.Item>
            <Form.Item name="bankAccount">
              <Input placeholder="Tài Khoản Ngân Hàng*" />
            </Form.Item>
            <Form.Item name="address">
              <Input placeholder="Địa Chỉ*" />
            </Form.Item>
            
            <div className="activate-actions">
              <Button className="brown-btn">Quay Về</Button>
              <Button className="brown-btn" type="primary">Tiếp theo </Button>
            </div>
          </Form>
        </div>
        <div className="activate-divider"></div>
        <div className="activate-right">
          <div className="img-wrapper">
            <img src="/img/youknowwho.png" alt="workshop" />
            <div className="img-overlay">
              <div className="overlay-title">HAND-MADE POTTERY EXPERIENCE</div>
              <div className="overlay-sub">Evenings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateWorkshopOwner;