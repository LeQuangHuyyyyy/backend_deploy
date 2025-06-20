import React from "react";
import { Form, Input, Button } from "antd";
import "./index.scss";

export default function BankAccountRegister() {
  return (
    <div className="bankacc-wrapper">
      <div className="bankacc-card">
        <div className="bankacc-left">
          <div className="bankacc-title">
            Kích hoạt tài khoản để tiếp tục sử dụng
          </div>
          <Form className="bankacc-form" layout="vertical">
            <Form.Item
              name="Name"
              rules={[{ required: true, message: "Chủ tài khoản" }]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input className="bankacc-input" placeholder="Chủ tài khoản*" />
            </Form.Item>
            <Form.Item
              name="bankAccount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tài khoản ngân hàng",
                },
              ]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input
                className="bankacc-input"
                placeholder="Tài Khoản Ngân Hàng*"
              />
            </Form.Item>
            <Form.Item
              name="BankName"
              rules={[{ required: true, message: "Tên ngân hàng" }]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input className="bankacc-input" placeholder="Tên ngân hàng*" />
            </Form.Item>
          </Form>
          <div className="bankacc-btn-row">
            <Button className="bankacc-btn bankacc-btn-back">Quay Về</Button>
            <Button type="primary" className="bankacc-btn bankacc-btn-register">
              Đăng Kí
            </Button>
          </div>
        </div>
        <div className="bankacc-divider"></div>
        <div className="bankacc-right">
          <img
            className="bankacc-img"
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
            alt="pottery"
          />
        </div>
      </div>
    </div>
  );
}
