import React from "react";
import "./index.scss";

const suggestions = [
  {
    id: 1,
    image:
      "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/12/avatar-2-jake-neytiri.jpg",
    desc: "Đây là workshop rất hay, waa bạn nên thử nó. ahhhhhhhhhhhihia hihi",
    price: "Chỉ từ 399.000 đ",
    date: "20/20/2025",
  },
  {
    id: 2,
    image:
      "https://cdn.tgdd.vn/Files/2021/11/10/1395477/10-mon-do-dung-can-thiet-cho-xuong-lam-do-handmade-202111101553579858.jpg",
    desc: "Đây là workshop rất hay, waa bạn nên thử nó. ahhhhhhhhhhhihia hihi",
    price: "Chỉ từ 399.000 đ",
    date: "20/20/2025",
  },
  {
    id: 3,
    image: "https://bizweb.dktcdn.net/100/438/408/files/lam-do-handmade-1.jpg",
    desc: "Đây là workshop rất hay, waa bạn nên thử nó. ahhhhhhhhhhhihia hihi",
    price: "Chỉ từ 399.000 đ",
    date: "20/20/2025",
  },
];

export default function WorkshopSuggestion() {
  return (
    <div className="workshop-suggestion-wrapper">
      <h2 className="suggestion-title">CÓ THỂ BẠN CŨNG THÍCH</h2>
      <div className="suggestion-list">
        {suggestions.map((item) => (
          <div className="suggestion-card" key={item.id}>
            <img src={item.image} alt="suggestion" className="suggestion-img" />
            <div className="suggestion-desc">{item.desc}</div>
            <div className="suggestion-price">{item.price}</div>
            <div className="suggestion-date">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
