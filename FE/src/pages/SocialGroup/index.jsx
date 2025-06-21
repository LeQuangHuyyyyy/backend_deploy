import React, { useState } from "react";
import FormSocial from "../../components/formsocial";
import YourFeeling from "../../components/YourFeeling";
import PostDetailModal from "../../components/PostDetailModal";
import FollowersList from "../../components/FollowersList";
import PhotoGrid from "../../components/PhotoGrid";
import AboutGroup from "../../components/AboutGroup";
import "./index.scss";

// Dummy data based on the image
const posts = [
  {
    id: 1,
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~", // Placeholder
    name: "08/08/2024", // Date as subtitle
    group: "Hùng Nguyễn", // Author name as main name
    content: "content of the post",
    images: [
      "https://s3-alpha-sig.figma.com/img/d854/a65d/55a29c9be4dfd0b8332158b87965215c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J13rY~uG-2s2U7I6Y09xQ8V~vC06g9i~TjU7d7o-9e9A-3o6Q6B8j8q9~t8w5k6J2X9~G6a5f4c3b2a1~C4D6F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9~",
    ],
    isLiked: true,
  },
  {
    id: 2,
    avatar:
      "https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~", // Placeholder
    name: "07/08/2024",
    group: "Hùng Nguyễn",
    content: `KHAI TRƯƠNG SỰ KIỆN - GÓP GẠCH XÂY TRƯỜNG TẠI PHIÊNG HÀO
Sáng bừng 1 tia nắng - "Trao yêu thương nhận lại nụ cười" đã được thắp lên với mong muốn mang đến những giá trị, những món quà tinh thần cho các em nhỏ vùng cao, lan tỏa sự tích cực qua những điều tốt đẹp trong cuộc sống.
Trong thời gian qua, chính video "bật mí"....`,
    images: [
      "https://s3-alpha-sig.figma.com/img/d854/a65d/55a29c9be4dfd0b8332158b87965215c?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J13rY~uG-2s2U7I6Y09xQ8V~vC06g9i~TjU7d7o-9e9A-3o6Q6B8j8q9~t8w5k6J2X9~G6a5f4c3b2a1~C4D6F8G9H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9~",
    ],
    isLiked: false,
  },
];

const navTabs = ["Bài Đăng", "Giới Thiệu", "Người theo dõi", "Ảnh"];

const SocialGroup = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleCommentClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="posts-feed">
            <YourFeeling />
            {posts.map((post) => (
              <FormSocial
                key={post.id}
                {...post}
                onCommentClick={() => handleCommentClick(post)}
              />
            ))}
          </div>
        );
      case 1:
        return <AboutGroup />;
      case 2:
        return <FollowersList />;
      case 3:
        return <PhotoGrid />;
      default:
        return null;
    }
  };

  return (
    <div className="social-group-page">
      <div className="social-group-header">
        <div className="cover-photo">
          <img
            src="https://s3-alpha-sig.figma.com/img/d5a9/a739/218a5e55722f281273945789dba171b3?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kE0o7C1e0i8r5e5c2b0a1a0~k9L8M7N6O5P4Q3R2S1T0U~V9W8X7Y6Z5A4B3C2D1E0F~G9H8I7J6K5L4M3N2O1P0Q~R9S8T7U6V5W4X3Y2Z1~a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-u-v-w-x-y-z"
            alt="cover"
          />
        </div>
        <div className="group-info-container">
          <div className="group-info">
            <img
              className="group-avatar"
              src="https://s3-alpha-sig.figma.com/img/21f5/50e5/1f405c9e0d16c52a4176f74a625f5432?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=U1u~9VpS9oN9-q-fO~LqSgWvK1rN-0Lw5yQ-5fC54gB~EwOa5o9m5H4M3a4k9J3G~iV6x7s8o7q5~G5g5h4l3n8f3~z8F1x3A6w2~v5~E3a8x6Y5~l4~w2~k4~z8~t5~C3a8x6Y5~l4~w2~k4~z8~t5~"
              alt="group avatar"
            />
            <h1 className="group-name">Hung Group</h1>
          </div>
          <hr className="divider" />
          <div className="social-group-nav">
            {navTabs.map((tab, index) => (
              <button
                key={tab}
                className={`nav-button ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
            <button className="nav-button more-options">...</button>
          </div>
        </div>
      </div>
      <div className="social-group-content">{renderContent()}</div>

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          open={!!selectedPost}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default SocialGroup;
