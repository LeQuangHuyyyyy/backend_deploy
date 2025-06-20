import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";
import "./index.scss";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", content: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit ở đây
    alert("Đánh giá của bạn đã được gửi!");
    setForm({ name: "", email: "", content: "" });
    setRating(0);
    setHover(0);
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Thêm Đánh Giá</h3>
      <div className="review-form-rating">
        <span>Rate This Course</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarFilled
            key={star}
            className={`star ${star <= (hover || rating) ? "on" : ""}`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>
      <div className="review-form-fields">
        <input
          type="text"
          name="name"
          placeholder="Tên"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <textarea
        name="content"
        placeholder="Bài đánh giá"
        value={form.content}
        onChange={handleChange}
        required
        rows={5}
      />
      <button type="submit" className="review-form-btn">
        Đánh giá bài viết <span style={{ fontSize: 18, marginLeft: 4 }}>→</span>
      </button>
    </form>
  );
}
