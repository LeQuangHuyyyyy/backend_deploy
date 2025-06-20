import React, { useEffect, useState } from "react";
import { Button, Input, Tooltip, Spin } from "antd";
import {
  YoutubeOutlined,
  GithubOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import "./index.scss";
// import { jwtDecode } from "jwt-decode";
import CarouselForYou from "../../components/SliderMain";
import BannerCarousel from "../../components/BannerCarousel";
import MainCarosel from "../../components/MainCarosel";
import api from "../../config/api";
import { useNavigate } from "react-router";

function Home() {
  // const decode = () => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJIQUdfV09SS1NIT1AiLCJzdWIiOiJKV1QgVG9rZW4iLCJpZCI6MSwicm9sZSI6IkFETUlOIiwiZmlyc3ROYW1lIjoic3RyaW5nIiwibGFzdE5hbWUiOiJzdHJpbmciLCJwaG9uZSI6IjA5NjIyNDEwMDkiLCJpYXQiOjE3NDg1MzQ5MDcsImV4cCI6MTc0ODU2MzcwN30.XPYEpHSSrl2zzdKpnWEF_FuOqrUHIYh0mRqU6wPLXq4";
  //   const decoded = jwtDecode(token);
  //   console.log(decoded);
  // };

  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [isDataUpcoming, setIsDataUpcoming] = useState([]);
  const navigate = useNavigate();
  // const dataUpcoming = async () => {
  //   const results = await api.get("/workshops/upcoming");
  //   setDataUpcoming(results.data);
  // };
  // useEffect(() => {
  //   dataUpcoming();
  // }, []);
  const suKienData = [
    { id: 1, image: "/img/youknowwho.png", title: "Sự kiện 1" },
    { id: 2, image: "/img/youknowwho.png", title: "Sự kiện 2" },
    { id: 3, image: "/img/youknowwho.png", title: "Sự kiện 3" },
    { id: 4, image: "/img/youknowwho.png", title: "Sự kiện 4" },
    { id: 5, image: "/img/youknowwho.png", title: "Sự kiện 5" },
    { id: 6, image: "/img/youknowwho.png", title: "Sự kiện 6" },
    // ...
  ];
  const suKienData1 = [
    {
      id: 1,
      link: "https://chat.openai.com/",
      image: "/img/aaaa.png",
      title: "Sự kiện 1",
      video:
        "https://ik.imagekit.io/hp1dcwmpu/AQPm_nd7UDY0MGGKIerRBlNYmJ9PdySQFeiPSZ_GZ32jKRhFxj8cbZmAp5K-j5djOjtpUq8o7RKgAU96lLhVrsPy.mp4?updatedAt=1749233089993",
    },
    {
      id: 2,
      image: "/img/aaaa.png",
      title: "Sự kiện 2",
      link: "https://chat.openai.com/",
      video:
        "../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4",
    },
    {
      id: 3,
      image: "/img/aaaa.png",
      title: "Sự kiện 3",
      video:
        "../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4",
    },
    {
      id: 4,
      image: "/img/aaaa.png",
      title: "Sự kiện 4",
      video:
        "../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4",
    },
    {
      id: 5,
      image: "/img/aaaa.png",
      title: "Sự kiện 5",
      video:
        "../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4",
    },
    {
      id: 6,
      image: "/img/aaaa.png",
      title: "Sự kiện 6",
      video:
        "../../../public/img/Administrator_ TimeRift - Scene1 - Windows, Mac, Linux - Unity 6 (6000.0.32f1) _DX11_ 2025-02-03 21-06-47.mp4",
    },
    // ...
  ];

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [upcomingResponse] = await Promise.all([
        api.get("/workshops/upcoming?page=0&size=10", {
          timeout: 10000, // 10s
        }),
      ]);

      setIsDataUpcoming(upcomingResponse.data?.content );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleNavigateWorkshopMore = () => {
    navigate("/workshop");
  };

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
    <div className="home-container">
      <div className="view">
        <div className="block">
          {" "}
          <MainCarosel data={suKienData1} />
        </div>
        <div className="block">
          {" "}
          <BannerCarousel title="Sự kiện đặc biệt" data={isDataUpcoming} />{" "}
        </div>
        <div className="block">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                color: "#a67c52",
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "18px",
                textAlign: "left",
                paddingLeft: "8px",
              }}
            >
              Dành cho bạn
            </span>
          </div>
          {Array.isArray(isDataUpcoming) && (
            <CarouselForYou data={isDataUpcoming} />
          )}
        </div>
        <div className="block">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                color: "#a67c52",
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "18px",
                textAlign: "left",
                paddingLeft: "8px",
              }}
            >
              Workshop
            </span>
            <Button
              type="link"
              style={{ color: "#b47b5c" }}
              onClick={() => {
                setVisibleCount(visibleCount + 4);
                handleNavigateWorkshopMore();
              }}
            >
              Xem thêm
            </Button>
          </div>
          {Array.isArray(isDataUpcoming) && (
            <CarouselForYou data={isDataUpcoming} />
          )}
        </div>
        <div className="block">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                color: "#b47b5c",
                fontSize: "1.2rem",
                fontWeight: 700,
                marginBottom: "18px",
                textAlign: "left",
                paddingLeft: "8px",
              }}
            >
              San khau & Nghe thuat
            </span>
            <Button
              type="link"
              style={{ color: "#b47b5c" }}
              onClick={() => {
                setVisibleCount(visibleCount + 4);
                handleNavigateWorkshopMore();
              }}
            >
              Xem thêm
            </Button>
          </div>
          {Array.isArray(isDataUpcoming) && (
            <CarouselForYou visibleCount={visibleCount} data={isDataUpcoming} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
