import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import "./index.scss";
import api from "../../config/api";
import { useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { login } from "../../redux/features/userSlice";
import { showSuccessToast } from "./../../config/configToast";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const LoginAndRegister = () => {
  const navigate = useNavigate();
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const dispatch = useDispatch();
  const [form] = useForm();
  const onFinishLogin = async (values) => {
    try {
      console.log("Login values:", values);
      const response = await api.post("auth/login", values);
      if (response?.data) {
        const user = response.data;
        dispatch(login(user));
        localStorage.setItem("token", user.token);
        const decoded = jwtDecode(user.token);
        const userRole = decoded.role;
        console.log(decoded);
        localStorage.setItem("role", decoded.role);
        showSuccessToast("Login success");
        console.log(user);
        switch (userRole) {
          case "INSTRUCTOR":
            navigate("/dashboardInstructor");
            break;
          case "Manager":
            navigate("/manager");
            break;
          case "ADMIN":
            navigate("/dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      console.log(err);
      toast.error(navigator.onLine ? "Login failed" : "No internet connection");
      form.resetFields();
    }
  };

  const onFinishRegister = async (values) => {
    console.log(values);
    try {
      const registerData = {
        password: values.password,
        email: values.email,
        phone: values.phone,
        firstName: values.ten,
        lastName: values.ho,
      };
      console.log(registerData);
      await api.post("/auth/register", registerData);
      toast.success("Đăng ký thành công!");
      // const loginData = {
      //   email: values.email,
      //   password: values.password,
      // };
      // setTimeout(() => {
      //   onFinishLogin(loginData);
      // }, 500); // đợi 500ms rồi mới gọi login
      navigate("/Banlaai", {
        state: {
          email: values.email,
          password: values.password,
        },
      });
    } catch (error) {
      console.log("Lỗi đăng ký:", error.response?.data);

      const serverMessage = error.response?.data?.message;

      if (serverMessage?.includes("Email")) {
        toast.error("Email đã được sử dụng, vui lòng chọn email khác.");
      } else {
        toast.error("Đăng ký thất bại!");
      }

      registerForm.resetFields();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-content">
          {/* Login Form */}
          <div className="auth-section login">
            <h2>Đăng nhập</h2>
            <Form
              form={loginForm}
              name="login-form"
              onFinish={onFinishLogin}
              layout="vertical"
              className="auth-form"
              autoComplete="off"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  //{ min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                ]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <div className="login-options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>
                <a href="/forget-password" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* Register Form */}
          <div className="auth-section register">
            <h2>Đăng kí</h2>
            <Form
              form={registerForm}
              name="register-form"
              onFinish={onFinishRegister}
              layout="vertical"
              className="auth-form"
            >
              <div className="name-group">
                <Form.Item
                  name="ho"
                  label="Họ"
                  rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
                >
                  <Input placeholder="Họ" />
                </Form.Item>

                <Form.Item
                  name="ten"
                  label="Tên"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input placeholder="Tên" />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^\d{10}$/,
                    message: "Số điện thoại phải có 10 chữ số!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Nhập lại mật khẩu" />
              </Form.Item>

              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error("Vui lòng đồng ý với điều khoản!")
                          ),
                  },
                ]}
              >
                <Checkbox>
                  Tôi chấp nhận với <a href="#">điều khoản</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                >
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
