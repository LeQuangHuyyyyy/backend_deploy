import React from "react";
import "./index.scss";

function BannerChu({ title, breadcrumb }) {
  return (
    <div className="banner-chu">
      <div className="banner-chu__content">
        <h1 className="banner-chu__title">{title}</h1>
        <div className="banner-chu__breadcrumb">{breadcrumb}</div>
      </div>
    </div>
  );
}

export default BannerChu;
