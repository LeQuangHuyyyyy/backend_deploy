import React from "react";
import { Form, Input, Button } from "antd";
import "./index.scss";
import api from "../../config/api";
import { showSuccessToast } from "../../config/configToast";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await api.post("auth/reset-password", values);
      if (response?.data) {
        showSuccessToast("Mật khẩu đã được đặt lại");
        navigate("/loginAndRegister");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="resetpw-wrapper">
      <div className="resetpw-card">
        <div className="resetpw-left">
          <div className="resetpw-title">Đặt lại mật khẩu</div>
          <div className="resetpw-desc">
            Vui lòng nhập mật khẩu mới cho tài khoản của bạn.
          </div>
          <Form
            className="resetpw-form"
            layout="vertical"
            form={form}
            onFinish={onSubmit}
          >
            <Form.Item
              name="token"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã đặt lại mật khẩu của bạn",
                },
              ]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input
                className="resetpw-input"
                placeholder="Mã đặt lại mật khẩu *"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input.Password
                className="resetpw-input"
                placeholder="Mật khẩu mới*"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
              style={{ width: "100%", maxWidth: 340 }}
            >
              <Input.Password
                className="resetpw-input"
                placeholder="Xác nhận mật khẩu*"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="resetpw-btn"
              block
            >
              Đặt lại mật khẩu
            </Button>
          </Form>
        </div>
        <div className="resetpw-divider"></div>
        <div className="resetpw-right">
          <img
            className="resetpw-img"
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
            alt="pottery"
          />
        </div>
      </div>
    </div>
  );
}
