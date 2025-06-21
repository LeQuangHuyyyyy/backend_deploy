import React from "react";
import "./index.scss";

const followers = [
  {
    id: 1,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 2,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 3,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 4,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 5,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 6,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 7,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 8,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 9,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 10,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 11,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 12,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 13,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 14,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 15,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
  {
    id: 16,
    name: "Hung Nguyen",
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~",
  },
];

const FollowersList = () => {
  return (
    <div className="followers-list-container">
      <h2 className="followers-list-title">Người theo dõi</h2>
      <div className="followers-grid">
        {followers.map((follower) => (
          <div className="follower-item" key={follower.id}>
            <img
              src={follower.avatar}
              alt={follower.name}
              className="follower-avatar"
            />
            <span className="follower-name">{follower.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersList;
