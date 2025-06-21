import React, { useState } from "react";
import YourFeeling from "../../components/YourFeeling";
import FormSocial from "../../components/formsocial";
import PostDetailModal from "../../components/PostDetailModal";

function SocialPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  const posts = [
    {
      id: 1,
      imageurl: "avatar_url",
      title: "Tên",
      content:
        "Nội dungCÚ SỐK SINH VIÊN NĂM 3 SAU KHI RA TRƯỜNG 🙂" +
        "Chuyện là mình mới trải qua cú sốc nhẹ trong lần đi làm đầu tiên sau khi ra trường. Lúc pv thì mọi thứ nghe khá ổn: công việc đúng chuyên ngành, môi trường trẻ, lương khởi điểm không cao nhưng mình nghĩ thôi làm lấy kinh nghiệm trước đã. Vấn đề là… cái mô tả cv lúc deal công việc và những gì mình đang làm bây giờ là HAI THẾ GIỚI khác nhau 🙂Mình apply vị trí Content Executive, mô tả ghi rõ viết bài, lên ý tưởng, hỗ trợ vài task nhẹ ádasddddddddddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddd",
      images: [
        "https://res.cloudinary.com/dur2ihrqo/image/upload/v1750273324/d7qlxoxrppb3pzxpvjej.jpg",
      ],
      name: "Tên",
      group: "Nhóm",
    },
    {
      id: 2,
      imageurl: "avatar_url",
      title: "Tên",
      content:
        "Nội dungCÚ SỐK SINH VIÊN NĂM 3 SAU KHI RA TRƯỜNG 🙂" +
        "Chuyện là mình mới trải qua cú sốc nhẹ trong lần đi làm đầu tiên sau khi ra trường. Lúc pv thì mọi thứ nghe khá ổn: công việc đúng chuyên ngành, môi trường trẻ, lương khởi điểm không cao nhưng mình nghĩ thôi làm lấy kinh nghiệm trước đã. Vấn đề là… cái mô tả cv lúc deal công việc và những gì mình đang làm bây giờ là HAI THẾ GIỚI khác nhau 🙂Mình apply vị trí Content Executive, mô tả ghi rõ viết bài, lên ý tưởng, hỗ trợ vài task nhẹ ádasddddddddddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddd",
      images: [
        "https://res.cloudinary.com/dur2ihrqo/image/upload/v1750273324/d7qlxoxrppb3pzxpvjej.jpg",
      ],
      name: "Tên",
      group: "Nhóm",
    },
  ];

  const fakeComments = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Nguyễn Văn A",
      content: "Bài viết hay quá!",
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Trần Thị B",
      content: "Đồng cảm với bạn!",
    },
    {
      id: 3,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Lê Văn C",
      content: "Cảm ơn bạn đã chia sẻ!",
    },
  ];

  return (
    <div className="social-page">
      <YourFeeling />

      {posts.map((post) => (
        <FormSocial
          key={post.id}
          {...post}
          onCommentClick={() => {
            setSelectedPost(post);
            setCommentsData(post.comments || []);
            setIsOpen(true);
          }}
        />
      ))}

      <PostDetailModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        post={selectedPost}
        comments={fakeComments}
        currentUser={{ name: "Hung Nguyen", avatar: "avatar_url" }}
      />
    </div>
  );
}

export default SocialPage;
