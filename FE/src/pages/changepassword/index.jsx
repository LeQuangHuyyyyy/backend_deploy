import React from "react";
import { Form, Input, Button, Layout, Menu, Avatar, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  BellOutlined,
  DeleteOutlined,
  PictureOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./index.scss";

const { Content, Sider } = Layout;

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Updated Password:", values);
    message.success("Password updated successfully!");
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#fdf6ee", padding: 20 }}>
      {/* Sidebar */}
      {/* <Sider
        width={300}
        theme="light"
        style={{ padding: "20px", borderRadius: 10 }}
      >
        <div
          className="profile"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <Avatar size={100} src="https://via.placeholder.com/100" />
          <h2 style={{ marginTop: 10 }}>Sarah Miller</h2>
          <a href="#" style={{ color: "#1890ff" }}>
            View profile
          </a>
        </div>
        <Menu mode="vertical" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Account</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<LockOutlined />}
            style={{ fontWeight: "bold", color: "#1890ff" }}
          >
            <Link to="/change-password">Change Password</Link>
          </Menu.Item>
        </Menu>
        {/* <Menu mode="vertical" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>Account</Menu.Item>
          <Menu.Item key="2" icon={<LockOutlined />} style={{ fontWeight: "bold", color: "#1890ff" }}>
            Change Password
          </Menu.Item>
          <Menu.Item key="3" icon={<BellOutlined />}>Notifications</Menu.Item>
          <Menu.Item key="4" icon={<GlobalOutlined />}>Web Notifications</Menu.Item>
          <Menu.Item key="5" icon={<PictureOutlined />}>My Photos</Menu.Item>
          <Menu.Item key="6" icon={<DeleteOutlined />} style={{ color: "red" }}>Delete Account</Menu.Item>
        </Menu> * /}
      </Sider> */}

      {/* Nội dung chính */}
      <Content
        style={{
          padding: "40px",
          background: "#fdf6ee",
          borderRadius: 10,
          marginLeft: 20,
        }}
      >
        <h2 style={{ fontSize: 24, marginBottom: 20 }}>
          <LockOutlined /> Change Password
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter your current password" },
            ]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Please enter a new password" }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit" block className="btn-change-password">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ChangePassword;
