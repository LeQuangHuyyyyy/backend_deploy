import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss";
import { useNavigate } from "react-router";

// Nhận props: title, data (array)
export default function BannerCarousel({ title, data }) {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/workshop/${id}`);
  };
  return (
    <div className="banner-carousel">
      <div className="banner-carousel-title">{title}</div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={5}
        navigation
        autoplay={true}
        // pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1200: { slidesPerView: 5 },
          900: { slidesPerView: 4 },
          600: { slidesPerView: 3 },
          0: { slidesPerView: 2 },
        }}
        style={{
          overflow: "visible",
        }}
      >
        {data.map((item, idx) => (
          <SwiperSlide
            key={item.workshopId}
            style={{
              position: "relative",
              marginLeft: idx === 0 ? 40 : undefined,
            }}
          >
            <span className="banner-rank">{idx + 1}</span>
            <div className={`banner-card${idx === 0 ? " highlight" : ""}`}>
              <img
                src={item.urlImage}
                alt={item.title}
                className="banner-img"
                onClick={() => handleNavigate(item.workshopId)}
              />
              <div className="banner-title-main">{item.title}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
