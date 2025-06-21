import React from "react";
import "./index.scss";
import { GoSearch } from "react-icons/go";

const contacts = [
  {
    name: "Hùng Nguyễn",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    name: "Hùng Nguyễn",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
];

const groups = [
  {
    name: "Hùng Group",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    name: "Hùng Group",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    name: "Hùng Group",
    avatar:
      "https://s3-alpha-sig.figma.com/img/6759/a8f2/87ac8e637a7f6aef353c23e8003f9011?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gP1p8k3x8~t6~y5~v4~z7~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    name: "Hùng Group",
    avatar: "", // For the black square
  },
];

export default function ListFriendandGroup() {
  return (
    <div className="list-container">
      <div className="search-bar">
        <GoSearch className="search-icon" />
        <input type="text" placeholder="Search" />
      </div>

      <div className="section">
        <h2 className="section-title">Liên Hệ</h2>
        <ul className="item-list">
          {contacts.map((contact, index) => (
            <li key={index} className="list-item">
              <img src={contact.avatar} alt={contact.name} className="avatar" />
              <span className="item-name">{contact.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">Nhóm Của Bạn</h2>
        <ul className="item-list">
          {groups.map((group, index) => (
            <li key={index} className="list-item">
              {group.avatar ? (
                <img src={group.avatar} alt={group.name} className="avatar" />
              ) : (
                <div className="avatar black-avatar"></div>
              )}
              <span className="item-name">{group.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
