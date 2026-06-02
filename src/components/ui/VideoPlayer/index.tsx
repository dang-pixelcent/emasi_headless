import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactPlayer from "react-player";
import { cn } from "@/utils/clsx"; // Hàm nối class tiện ích
import IconPlayMinimal from "@/components/icon/IconPlayMinimal";
import IconPlayButton from "@/components/icon/IconPlayButton";
// Import Icons

interface Props {
  link_youtube?: string;
  video_file_url?: string;
  className?: string; // Thêm prop className để component cha tùy chỉnh
  aspectRatio?: string; // Tùy chọn tỉ lệ khung hình nếu cần
}

interface ProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
}

const VideoPlayer = ({
  link_youtube,
  video_file_url,
  className,
  aspectRatio = "aspect-video", // Mặc định 16:9
}: Props) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [isFullVideo, setIsFullVideo] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // 1. Logic chọn URL
  const finalUrl = useMemo(() => {
    return video_file_url || link_youtube;
  }, [link_youtube, video_file_url]);

  // 2. Logic kiểm tra nguồn video (Youtube vs File)
  const isMp4Source = useMemo(() => {
    return (
      !!video_file_url ||
      (finalUrl &&
        !finalUrl.includes("youtube") &&
        !finalUrl.includes("youtu.be"))
    );
  }, [video_file_url, finalUrl]);

  // Logic Auto-play khi scroll tới
  useEffect(() => {
    if (!finalUrl || !videoContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!isFullVideo) {
            setPlaying(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 },
    );
    observer.observe(videoContainerRef.current);
    return () => observer.disconnect();
  }, [finalUrl, isFullVideo]);

  // Logic Loop 12s cho preview
  const handleProgress = (state: ProgressState) => {
    if (!isFullVideo && state.playedSeconds >= 12) {
      playerRef.current?.seekTo(0, "seconds");
    }
  };

  const handleEnded = () => {
    if (!isFullVideo) {
      playerRef.current?.seekTo(0, "seconds");
      setPlaying(true);
    }
  };

  const handleClickVideo = () => {
    setIsFullVideo(true);
    setPlaying(true);
  };

  if (!finalUrl) return null;

  return (
    <div
      ref={videoContainerRef}
      className={cn(
        // Container Styles
        "relative w-full h-full overflow-hidden bg-black isolate",
        "flex justify-center items-center",
        // Bo góc có thể tùy chỉnh hoặc mặc định
        "rounded-2xl",
        className,
      )}
    >
      <div className="w-full h-full absolute inset-0">
        <ReactPlayer
          key={isFullVideo ? "full" : "preview"}
          ref={playerRef}
          url={finalUrl}
          width="100%"
          height="100%"
          playing={playing}
          muted={!isFullVideo}
          loop={false}
          controls={isFullVideo}
          onProgress={handleProgress}
          onEnded={handleEnded}
          playsinline={true}
          config={{
            youtube: {
              playerVars: {
                rel: 0,
                cc_lang_pref: "en",
                cc_load_policy: 1,
                color: "white",
                disablekb: 1,
                fs: isFullVideo ? 1 : 0,
                iv_load_policy: 3,
              },
            },
            file: {
              attributes: {
                controlsList: "nodownload",
                disablePictureInPicture: true,
                style: { objectFit: "cover", width: "100%", height: "100%" },
              },
            },
          }}
          onError={(e) => console.log("Video Error:", e)}
        />
      </div>

      {/* OVERLAY & BUTTON */}
      {!isFullVideo && (
        <div
          onClick={handleClickVideo}
          className={cn(
            // Position & Layout
            "absolute inset-0 z-20 flex items-center justify-center",
            // Style
            "bg-black/10 cursor-pointer group",
            // Animation hover vào overlay thì nút play scale lên
            "transition-colors duration-300 hover:bg-black/20",
          )}
        >
          {isMp4Source ? (
            <IconPlayMinimal
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-md",
                "transition-transform duration-300 ease-out",
                "group-hover:scale-110", // Hover vào cha, con phóng to
              )}
            />
          ) : (
            <IconPlayButton
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 drop-shadow-md",
                "transition-transform duration-300 ease-out",
                "group-hover:scale-110",
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
