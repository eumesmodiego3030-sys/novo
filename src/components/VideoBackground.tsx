import { useRef, useEffect, useState, useCallback } from "react";
import heroImg from "@/assets/hero-clinic.jpg";
import botoxImg from "@/assets/treatment-botox.jpg";
import fillersImg from "@/assets/treatment-fillers.jpg";
import laserImg from "@/assets/treatment-laser.jpg";

const sectionImages = [heroImg, botoxImg, fillersImg, laserImg, heroImg];

const VideoBackground = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / Math.max(docHeight, 1), 1);
    setScrollProgress(progress);

    const sectionCount = sectionImages.length;
    const index = Math.min(
      Math.floor(progress * sectionCount),
      sectionCount - 1
    );
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Image layers with crossfade */}
      {sectionImages.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: activeIndex === i ? 1 : 0 }}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${1 + scrollProgress * 0.08})`,
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>
      ))}

      {/* Warm overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(30 30% 97% / ${0.55 + scrollProgress * 0.25}) 0%, 
            hsl(30 30% 97% / ${0.7 + scrollProgress * 0.2}) 50%,
            hsl(30 30% 97% / ${0.8 + scrollProgress * 0.15}) 100%)`,
        }}
      />

      {/* Video element - ready for real clinic tour video */}
      {/* Uncomment and add your video URL to enable scroll-driven video:
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/clinic-tour.mp4" type="video/mp4" />
      </video>
      */}
    </div>
  );
};

export default VideoBackground;
