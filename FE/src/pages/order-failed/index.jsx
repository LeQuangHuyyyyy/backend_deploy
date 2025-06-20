import React from "react";
import { CloseCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="order-failed-container">
      <CloseCircleTwoTone twoToneColor="#ff4d4f" className="failed-icon" />
      <h1>Thanh toán thất bại!</h1>
      <p>
        Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng kiểm tra lại thông
        tin hoặc thử lại sau.
      </p>
      <Button
        type="primary"
        size="large"
        className="back-home-btn"
        onClick={() => navigate("/cart")}
        style={{
          backgroundColor: "#ff4d4f",
          borderColor: "#ff4d4f",
        }}
      >
        Về trang chủ
      </Button>
    </div>
  );
};

export default OrderFailed;
