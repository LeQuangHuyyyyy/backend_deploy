import React, { useState, useRef } from "react";
import "./index.scss"; // nhớ thêm CSS ở dưới
import { VolumeX, Volume2 } from 'lucide-react';
export default function VideoCard({ src, link }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={src}
        className="main-carousel-video"
        autoPlay
        loop
        muted={muted}
      />
      <button onClick={toggleMute} className="mute-button" style={{bottom: "100px"}}>
      {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      <div className="main-carousel-content">
        {link && <a href={link} className="main-carousel-btn">Xem chi tiết</a>}
      </div>
    </div>
  );
}
