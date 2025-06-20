import React from "react";
import "./index.scss";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/api";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
function YouknowWho() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = location.state || {};
  const handleNavigate = (path) => {
    navigate(path);
  };
  const handleSelectRole = async (role) => {
    try {
      // Sau khi cập nhật role xong, login lại
      const response = await api.post("/auth/login", { email, password });

      const user = response.data;
      localStorage.setItem("token", user.token);
      const token = localStorage.getItem("token");
      let decoded;
      if (typeof token === "string" && token) {
        decoded = jwtDecode(token);
        console.log("Thông tin người dùng:", decoded);
      } else {
        console.log("Không tìm thấy token hợp lệ");
        // có thể redirect về trang login tại đây
      }

      localStorage.setItem("role", decoded.role);
      dispatch(login(user));
      toast.success("Đăng nhập thành công!");
      // Gọi API để set vai trò
      await api.put("/admin/users/role", {
        email,
        role,
      });
      // Điều hướng dựa vào vai trò
      if (decoded.role === "INSTRUCTOR") {
        navigate("/activateWorkshopOwner");
      } else {
        navigate("/Services");
      }
    } catch (err) {
      console.log(err);
      toast.error("Có lỗi xảy ra khi xác nhận vai trò.");
    }
  };

  return (
    <div className="youknowwho-bg">
      <div className="youknowwho-card">
        <div className="youknowwho-left">
          <h2>Bạn Là Ai ????</h2>
          <div className="youknowwho-button-wrapper">
            <button
              className="youknowwho-button"
              onClick={() => handleSelectRole("USER")}
            >
              Người tham gia workshop
            </button>
            <button
              className="youknowwho-button"
              onClick={() => handleSelectRole("INSTRUCTOR")}
            >
              Người tổ chức workshop
            </button>
          </div>
          <div className="youknowwho-actions">
            <Button
              className="brown-btn"
              onClick={() =>
                handleNavigate("/loginAndRegister", { replace: true })
              }
            >
              Về trước
            </Button>
            <Button className="brown-btn">Tiếp</Button>
          </div>
        </div>
        <div className="youknowwho-divider"></div>
        <div className="youknowwho-right">
          <div className="img-wrapper">
            <img src="/img/youknowwho.png" alt="youknowwho" />
            <div className="img-overlay">
              <div className="overlay-title">HAND-MADE POTTERY EXPERIENCE</div>
              <div className="overlay-sub">Evenings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouknowWho;
