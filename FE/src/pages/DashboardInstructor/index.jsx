import React from "react";
import "./index.scss";
import InstructorInfo from "../../components/InstructorInfo";
import NewWorkshop from "../../components/NewWorshop";
import SubMenuDashboardInstructor from "../../components/SubMenuDashboardInstructor";
import { Image, ImageKitProvider, Video } from "@imagekit/react";
function DashboardInstructor() {
  return (
    <div className="dashboard-instructor-wrapper">
      <InstructorInfo />
      <NewWorkshop />
      <SubMenuDashboardInstructor />
      {/* <div className="workshop-cta-wrapper">
        <div className="workshop-cta-title">
          Bạn đã sẵn sàng tạo buổi hội thảo tiếp theo chưa?
        </div>
        <div className="workshop-cta-desc">
          Chia sẻ kiến thức và chuyên môn của bạn với những người học nhiệt tình
          trên toàn thế giới
        </div>
        <button className="workshop-cta-btn">Bắt đầu tạo</button>
      </div> */}
    </div>
  );
}

export default DashboardInstructor;
