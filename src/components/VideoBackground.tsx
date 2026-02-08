import { useRef, useEffect, useCallback } from "react";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / Math.max(docHeight, 1), 1);

      video.currentTime = progress * video.duration;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      >
        <source src="/clinic-tour.mp4" type="video/mp4" />
      </video>

      {/* Warm overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(30 30% 97% / 0.45) 0%, 
            hsl(30 30% 97% / 0.55) 50%,
            hsl(30 30% 97% / 0.65) 100%)`,
        }}
      />
    </div>
  );
};

export default VideoBackground;
