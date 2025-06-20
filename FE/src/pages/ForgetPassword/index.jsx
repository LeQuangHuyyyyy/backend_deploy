import React from "react";
import { Form, Input, Button } from "antd";
import "./index.scss";
import api from "../../config/api";
import { showSuccessToast } from "../../config/configToast";
import { useNavigate } from "react-router";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    try {
      console.log(values);
      const response = await api.post("auth/forgot-password", values, {
        timeout: 10000, // 10 giây
      });
      if (response?.data) {
        console.log(response?.data);
        showSuccessToast("Email đã được gửi đến email của bạn");
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [form] = Form.useForm();

  return (
    <div className="forgetpw-wrapper">
      <div className="forgetpw-card">
        <div className="forgetpw-left">
          <div className="forgetpw-title">Quên mật khẩu</div>
          <div className="forgetpw-desc">
            Vui lòng nhập email để nhận hướng dẫn đặt lại mật khẩu.
          </div>
          <Form
            className="forgetpw-form"
            layout="vertical"
            form={form}
            onFinish={onSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input className="forgetpw-input" placeholder="Email*" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="forgetpw-btn"
              block
            >
              Gửi yêu cầu
            </Button>
          </Form>
        </div>
        <div className="forgetpw-divider"></div>
        <div className="forgetpw-right">
          <img
            className="forgetpw-img"
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
            alt="pottery"
          />
        </div>
      </div>
    </div>
  );
}
