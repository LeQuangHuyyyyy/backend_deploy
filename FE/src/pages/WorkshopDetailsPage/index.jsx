import BannerChu from "../../components/bannerChu";
import WorkshopSidebar from "../../components/WorkshopSidebar";
import WorkshopMainContent from "../../components/WorkshopMainContent";
import { Row, Col } from "antd";
import "./index.scss";
import ReviewForm from "../../components/ReviewForm";
import WorkshopSuggestion from "../../components/WorkshopSuggestion";

function WorkshopDetailsPage() {
  return (
    <>
      <BannerChu title="CHI TIẾT WORKSHOP" breadcrumb="TRANG CHỦ / WORKSHOP" />
      <div className="workshop-page-content">
        <Row gutter={32} justify="center">
          <Col xs={24} md={16}>
            <WorkshopMainContent />
          </Col>
          <Col xs={24} md={8}>
            <WorkshopSidebar />
          </Col>
        </Row>
      </div>
      <div className="workshop-page-content-page">
        <ReviewForm />
      </div>
      <div className="workshop-page-content-page" style={{ marginBottom: 50 }}>
        <WorkshopSuggestion />
      </div>
    </>
  );
}

export default WorkshopDetailsPage;
