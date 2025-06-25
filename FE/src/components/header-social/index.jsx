import React from "react";
import "./index.scss";

export default function HeaderSocialGroup({
  coverUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  avatarUrl = "https://randomuser.me/api/portraits/men/32.jpg",
  name = "Hưng Group",
  onFollow,
  isFollowing = false,
}) {
  return (
    <div className="header-socialgroup">
      <div
        className="header-socialgroup__cover"
        style={{ backgroundImage: `url(${coverUrl})` }}
      />
      <div className="header-socialgroup__info">
        <img
          className="header-socialgroup__avatar"
          src={avatarUrl}
          alt="avatar"
        />
        <div className="header-socialgroup__name">{name}</div>
        <button className="header-socialgroup__follow-btn" onClick={onFollow}>
          {isFollowing ? "Đã theo dõi" : "Theo dõi"}
        </button>
      </div>
    </div>
  );
}
