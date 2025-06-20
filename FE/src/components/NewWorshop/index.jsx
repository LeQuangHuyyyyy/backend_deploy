import React, { useState } from "react";
import "./index.scss";
import WorkshopPost from "../WorkshopPost";

function NewWorkshop() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="newworkshop-wrapper">
      <div className="newworkshop-card">
        <img
          className="newworkshop-img"
          src="/img/workshop-demo.jpg"
          alt="Workshop"
        />
        <div className="newworkshop-content">
          <h2 className="newworkshop-title">Workshop mới nhất</h2>
          <div className="newworkshop-desc">
            Explore and join the latest workshops available
          </div>
          <div className="newworkshop-actions">
            <button
              className="btn btn-outline"
              onClick={() => setShowForm(true)}
            >
              Create Workshop
            </button>
            <button className="btn btn-black">View All</button>
          </div>
        </div>
      </div>
      <div className="newworkshop-stats">
        <div className="stat-box">
          <div className="stat-label">Tổng số người tham gia</div>
          <div className="stat-value">1240</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Followers</div>
          <div className="stat-value">856</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Total Workshops</div>
          <div className="stat-value">12</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Đánh giá trung bình</div>
          <div className="stat-value">4.8/5.0</div>
        </div>
      </div>
      {showForm && (
        <div className="workshoppost-modal" onClick={() => setShowForm(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <WorkshopPost onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewWorkshop;
