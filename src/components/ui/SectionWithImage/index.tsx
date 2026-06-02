import React, { ComponentProps } from "react";
import { cn } from "@/utils/clsx";
import VideoPlayer from "../VideoPlayer";
import { Image } from "@/types/general";
import { generateSrcSet } from "@/utils/imageUtils";
import ItemOpacity from "@/components/common/ItemOpacity";

// --- FIX 1: Dùng HTMLAttributes để tránh xung đột Ref và Type giữa div/section ---
type SectionBaseProps = React.HTMLAttributes<HTMLElement>;

type ImgCustomType = {
  width?: string;
  height?: string;
  aspectRatio?: string;
  borderRadius?: string;
  objectFit?: React.CSSProperties["objectFit"];
};

interface SectionWithImageProps extends SectionBaseProps {
  children?: React.ReactNode;

  // Layout Logic
  isSection?: boolean;
  revert?: boolean;
  revertOnMobile?: boolean;
  useFlex?: boolean;
  classNameContent?: string;

  // Custom Grid Layout
  gridColumns?: string;
  gridGap?: string;

  // Background / Decoration
  bgColor?: string;
  backgroundNode?: React.ReactNode;
  backgroundBehindColor?: string;

  // Media
  image?: Image | string;
  mediaType?: "image" | "video" | "youtube";
  videoUrl?: string;
  youtubeUrl?: string;
  imgCustom?: ImgCustomType;
  oneCol?: boolean;
}

// ... (Giữ nguyên phần MediaRenderer không đổi) ...
const MediaRenderer: React.FC<{
  mediaType: "image" | "video" | "youtube";
  videoUrl?: string;
  youtubeUrl?: string;
  image?: Image | string;
  backgroundNode?: React.ReactNode;
  imgCustom: ImgCustomType;
}> = ({
  mediaType,
  videoUrl,
  youtubeUrl,
  image,
  backgroundNode,
  imgCustom,
}) => {
  // ... (Code cũ giữ nguyên)
  if (mediaType === "video" && videoUrl)
    return <VideoPlayer video_file_url={videoUrl} />;
  if (mediaType === "youtube" && youtubeUrl)
    return <VideoPlayer link_youtube={youtubeUrl} />;
  if (backgroundNode) return <>{backgroundNode}</>;

  if (image) {
    const isString = typeof image === "string";
    const imgSrc = isString ? image : image?.url || "";
    const imgAlt = isString ? "Section Image" : image?.alt || "Section Image";
    const imgWidth = isString ? 600 : image?.width || 600;
    const imgHeight = isString ? 731 : image?.height || 731;

    return (
      <img
        src={imgSrc}
        srcSet={isString ? undefined : generateSrcSet(image?.sizes)}
        sizes={`(max-width: 768px) 100vw, ${imgWidth}px`}
        alt={imgAlt}
        loading="lazy"
        width={imgWidth}
        height={imgHeight}
        className="w-full h-full block transition-transform duration-500"
        style={{
          aspectRatio: imgCustom.aspectRatio,
          objectFit: imgCustom.objectFit,
          borderRadius: imgCustom.borderRadius,
          width: imgCustom.width,
          height: imgCustom.height,
        }}
      />
    );
  }
  return null;
};

// --- Main Component ---
const SectionWithImage: React.FC<SectionWithImageProps> = ({
  // ... (Props mặc định giữ nguyên) ...
  isSection = true,
  revert = false,
  revertOnMobile = false,
  oneCol,

  mediaType = "image",
  useFlex = false,
  classNameContent,
  backgroundBehindColor,

  children,
  className,
  image,
  videoUrl,
  youtubeUrl,

  backgroundNode,
  bgColor,

  gridColumns,
  gridGap,

  imgCustom = {
    width: "100%",
    height: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "16px",
    objectFit: "cover",
  },

  ...rest
}) => {
  // --- FIX 2: Cast thành React.ElementType để TypeScript hiểu đây là thẻ React hợp lệ ---
  const WrapperTag = (isSection ? "section" : "div") as React.ElementType;

  const resolvedMediaType = mediaType || "image";

  const hasMedia =
    typeof oneCol !== "undefined"
      ? oneCol
      : Boolean(
          (resolvedMediaType === "image" && image) ||
          (resolvedMediaType === "video" && videoUrl) ||
          (resolvedMediaType === "youtube" && youtubeUrl) ||
          backgroundNode,
        );

  const containerClasses = cn(
    "relative w-full z-10",
    isSection &&
      "section-container max-w-body mx-auto py-20 relative overflow-clip",

    useFlex
      ? "flex flex-col md:flex-row items-center"
      : [
          "grid grid-cols-1", // Mobile: Luôn là 1 cột
          // Desktop: Mặc định là 2 cột.
          // Nhưng nếu có gridColumns (tức là có biến --custom-cols), ta sẽ override.
          gridColumns
            ? "md:grid-cols-[var(--custom-cols)]" // Dùng giá trị custom
            : "md:grid-cols-2", // Giá trị mặc định
        ],

    // Logic tương tự cho Gap
    gridGap ? "gap-[var(--custom-gap)]" : "gap-8 md:gap-16 lg:gap-20",
  );

  return (
    <WrapperTag
      className={cn("relative w-full overflow-hidden", className)}
      style={{ backgroundColor: bgColor }}
      {...rest}
    >
      <ItemOpacity
        isAnimation={true}
        className={containerClasses}
        style={
          {
            // 1. Truyền giá trị custom vào biến CSS (nếu có props)
            "--custom-cols": gridColumns && !useFlex ? gridColumns : undefined,
            "--custom-gap": gridGap ? gridGap : undefined,
          } as React.CSSProperties
        }
      >
        {/* ... (Phần nội dung bên trong giữ nguyên y hệt code trước) ... */}

        {/* Cột Media */}
        {hasMedia && (
          <div
            className={cn(
              "relative w-full h-full flex justify-center items-center",
              // "min-h-75",
              revert ? "md:order-2" : "md:order-1",
              revertOnMobile ? "order-2" : "order-1",
            )}
          >
            {backgroundBehindColor && (
              <div
                className="absolute inset-0 -z-10 transform translate-x-4 translate-y-4 opacity-0 md:opacity-100 transition-opacity"
                style={{
                  backgroundColor: backgroundBehindColor,
                  borderRadius: imgCustom.borderRadius,
                }}
              />
            )}

            <div className="w-full h-full">
              <MediaRenderer
                mediaType={resolvedMediaType}
                image={image}
                videoUrl={videoUrl}
                youtubeUrl={youtubeUrl}
                backgroundNode={backgroundNode}
                imgCustom={imgCustom}
              />
            </div>
          </div>
        )}

        {/* Cột Content */}
        <div
          className={cn(
            "flex flex-col items-start",
            revert ? "md:order-1" : "md:order-2",
            revertOnMobile ? "order-1" : "order-2",
            !hasMedia ? "col-span-full" : "",
            classNameContent,
          )}
        >
          {children}
        </div>
      </ItemOpacity>
    </WrapperTag>
  );
};

export default SectionWithImage;
