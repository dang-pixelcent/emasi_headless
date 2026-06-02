import { cn } from "@/utils/clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";
import VideoWistia from "../VideoWistia";

const VideoSource = React.forwardRef<HTMLVideoElement, {
  video_url: string;
  play?: boolean;
}>(({ video_url, play }, ref) => {
  return (
    <video
      ref={ref}
      className="w-full h-full object-cover"
      controls
      autoPlay={play}
      playsInline
    >
      <source src={video_url} type="video/mp4" />
    </video>
  );
});

VideoSource.displayName = "VideoSource";

const YoutubeVideo = ({ youtube_link }: { youtube_link: string }) => {
  return (
    <div
      className="w-full relative iframe-wrapper aspect-video youtubeLink lg:aspect-auto lg:h-full"
      dangerouslySetInnerHTML={{ __html: youtube_link }}
    ></div>
  );
};

interface Props {
  type?: string;
  video_code?: string;
  youtube_link?: string;
  image?: string;
  video_url?: string;
}
const ContentVideo = (props: Props) => {
  const { type, video_code, youtube_link, image, video_url } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestedPlayRef = useRef<boolean>(false);

  useEffect(() => {
    if (isOpen && requestedPlayRef.current && videoRef.current) {
      videoRef.current.play().catch(() => {

      });
      requestedPlayRef.current = false;
    }
  }, [isOpen]);

  const renderVideo = useMemo(() => {
    switch (type) {
      case "filemp4":
        return (
          <VideoSource
            ref={videoRef}
            video_url={video_url ?? ""}
            play={isOpen}
          />
        );
      case "youtube":
        return <YoutubeVideo youtube_link={youtube_link ?? ""} />;
      case "video":
        return <VideoWistia videoCode={video_code ?? ""} />;
      default:
        return;
    }
  }, [type, video_code, youtube_link, video_url, isOpen]);

  return (
    <div className="w-full lg:h-full  relative">
      {image && (
        <div
          className={cn("w-full h-full", {
            hidden: isOpen,
          })}
          onClick={() => {
            requestedPlayRef.current = true;
            setIsOpen(true);
          }}
        >
          <img
            src={image}
            className="w-full h-full object-center"
            width={600}
            height={400}
            alt="video thumbnail"
          />
        </div>
      )}
      <div
        className={cn("hidden w-full lg:h-full relative", {
          block: isOpen || !image,
        })}
      >
        {renderVideo}
      </div>
    </div>
  );
};

export default ContentVideo;
