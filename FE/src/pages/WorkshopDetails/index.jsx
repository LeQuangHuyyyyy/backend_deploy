import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import CarouselForYou from "../../components/SliderMain";
import { Typography, Spin } from "antd";
import { formatMoneyToVND, formatTimeRange } from "../../currency/currency";
import api from "../../config/api";
import { useParams } from "react-router";

const WorkshopDetails = () => {
  const { Text } = Typography;
  const [data1, setData1] = useState([]);
  const [isDataUpcoming, setIsDataUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const ticketInfoRef = useRef(null);
  const { id } = useParams();

  const organizerData = {
    logo: "https://imgur.com/gallery/awoo-ufCuXWC",
    name: "Công Ty TNHH Sân Khấu - Nghệ Thuật Thái Dương",
    description: "Nhà Hát Thanh Niên",
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [workshopResponse, upcomingResponse] = await Promise.all([
        api.get(`/workshops/${id}`),
        api.get("/workshops/upcoming?page=0&size=10"),
      ]);

      setData1(workshopResponse.data);
      setIsDataUpcoming(upcomingResponse.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="workshop-page">
      {/* Banner vé */}
      <section className="ticket-banner">
        <div className="ticket-banner__info">
          <h2>{data1.workshopTitle} </h2>
          <div className="ticket-banner__meta">
            <div>
              <i className="fa-regular fa-calendar"></i>
              {data1.schedules && data1.schedules.length > 0
                ? formatTimeRange(data1.schedules[0].startTime)
                : "Đang cập nhật"}
            </div>
            {data1.schedules && data1.schedules.length > 0 && (
              <div
                className="ticket-banner__more-date"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  ticketInfoRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                + {data1.schedules.length} ngày khác
              </div>
            )}

            <div>
              <i className="fa-solid fa-location-dot"></i>
              {data1.address}
            </div>
          </div>
          <div className="ticket-banner__price">
            Giá từ <span>{formatMoneyToVND(data1.price)}</span>
          </div>
          <button
            className="btn-main"
            onClick={() => {
              ticketInfoRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Chọn lịch diễn
          </button>
        </div>
        <div className="ticket-banner__img">
          <img src={data1.urlImage} alt={data1.workshopTitle} />
        </div>
      </section>

      {/* Nội dung chi tiết */}
      <section className="workshop-details">
        {/* Giới thiệu */}
        <div className="workshop-card intro">
          <h3>Giới thiệu</h3>
          <div className="intro-content">
            <h2>{data1.workshopTitle}</h2>
            <div className="intro-content__description">
              <Text style={{ whiteSpace: "pre-line" }}>
                {data1.description?.replace(/\\n/g, "\n")}
              </Text>
            </div>
          </div>
        </div>

        {/* Thông tin vé */}
        <div className="workshop-card ticket-info" ref={ticketInfoRef}>
          <div className="ticket-info__header">Thông tin vé</div>

          {data1.schedules &&
            data1.schedules.length > 0 &&
            data1.schedules.map((item, idx) => (
              <div className="ticket-info__body" key={item.startTime || idx}>
                <span>
                  <i className="fa-regular fa-angle-right"></i>
                  <b>{formatTimeRange(item.startTime)}</b>
                </span>
                <button className="btn-main">Mua vé ngay</button>
              </div>
            ))}
        </div>

        {/* Ban tổ chức */}
        <div className="workshop-card organizer">
          <h4>Ban tổ chức</h4>
          <div className="organizer__info">
            <div className="organizer__center">
              <img
                src={organizerData.logo}
                alt="Logo"
                className="organizer__logo"
              />
              <div className="organizer__name">
                <b>{organizerData.name}</b>
                <div className="organizer__desc">
                  {organizerData.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gợi ý */}
      <section className="workshop-footer">
        <div className="workshop-footer__title">Có thể bạn cũng thích</div>
        <CarouselForYou data={isDataUpcoming} />
      </section>
    </div>
  );
};

export default WorkshopDetails;
