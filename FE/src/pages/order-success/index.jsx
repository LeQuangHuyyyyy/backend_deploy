import React from "react";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";
import "./index.scss";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <CheckCircleTwoTone twoToneColor="#52c41a" className="success-icon" />
      <h1>Đặt hàng thành công!</h1>
      <p>
        Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được ghi nhận và sẽ được xử
        lý trong thời gian sớm nhất.
      </p>
      <Button
        type="primary"
        size="large"
        className="back-home-btn"
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#52c41a",
          borderColor: "#52c41a",
        }}
      >
        Về trang chủ
      </Button>
    </div>
  );
};

export default OrderSuccess;
