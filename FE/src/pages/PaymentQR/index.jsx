import React from "react";
import "./index.scss";

export default function PaymentQR() {
  return (
    <div className="paymentqr-wrapper">
      <div className="paymentqr-card">
        <div className="paymentqr-left">
          <div className="paymentqr-title">Kích hoạt tài khoản để bán hàng</div>
          <div className="paymentqr-info-row">
            <img
              className="paymentqr-logo"
              src="https://i.imgur.com/8Km9tLL.png"
              alt="logo"
            />
            <div className="paymentqr-workshop">HAG WORKSHOP</div>
            <div className="paymentqr-price">1.200.000 VND</div>
          </div>
          <div className="paymentqr-qrbox">
            <img
              className="paymentqr-qr"
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://hagworkshop.vn"
              alt="QR code"
            />
            <div className="paymentqr-bank">Sacombank VietQR</div>
            <div className="paymentqr-note">
              QUÉT MÃ ĐỂ THANH TOÁN QUA QR
              <br />
              (Nhập số tiền nếu được nhắc)
            </div>
          </div>
          <div className="paymentqr-btn-row">
            <button className="paymentqr-btn paymentqr-btn-back">
              Quay Về
            </button>
            <button className="paymentqr-btn paymentqr-btn-register">
              Đăng Kí
            </button>
          </div>
        </div>
        <div className="paymentqr-divider"></div>
        <div className="paymentqr-right">
          <img
            className="paymentqr-img"
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80"
            alt="pottery"
          />
          
        </div>
      </div>
    </div>
  );
}
