import React from "react";
import { cn } from "@/utils/clsx";

interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Nội dung HTML raw từ CMS (ưu tiên dùng cái này) */
  html?: string;
  /** Hoặc nội dung JSX con */
  children?: React.ReactNode;
  /** Custom icon cho thẻ ul li */
  iconBullet?: string;
}

export const RichTextInter = ({
  html,
  children,
  className,
  iconBullet,
  style,
  ...props
}: RichTextProps) => {
  return (
    <div
      className={cn(
        // Class gốc của plugin typography
        "prose max-w-none",

        // Cấu hình style mặc định (Map với Design System của bạn)
        // Dùng biến --font-body, --color-gray, --color-dark bạn đã setup
        "prose-headings:font-heading prose-headings:font-semibold prose-headings:text-dark",
        "prose-p:font-interface prose-p:text-t16 md:prose-p:text-t20 prose-p:text-gray prose-p:leading-relaxed",
        "prose-li:text-gray prose-li:leading-relaxed",
        "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
        "prose-strong:font-bold prose-strong:text-dark",
        "prose-img:rounded-card", // Bo góc ảnh

        // --- LOGIC CUSTOM BULLET ---
        iconBullet && [
          "prose-ul:list-none prose-ul:pl-0", // Tắt list style default
          // 👇 CẬP NHẬT: Dùng Flexbox thay vì Absolute
          "prose-li:flex prose-li:items-start prose-li:gap-2.5 prose-li:pl-0",
          "prose-li:before:content-['']",
          "prose-li:before:shrink-0",
          "prose-li:before:w-6 prose-li:before:h-6", // Kích thước 24px
          "prose-li:before:mt-0", // Căn giữa với dòng đầu tiên (line-height ~28px)

          "prose-li:before:bg-contain prose-li:before:bg-no-repeat prose-li:before:bg-center",
          "prose-li:before:bg-[image:var(--bullet-icon)]",
        ],

        // Cho phép override bằng className bên ngoài
        className,
      )}
      style={{
        ...style,
        ...((iconBullet
          ? { "--bullet-icon": `url(${iconBullet})` }
          : {}) as React.CSSProperties),
      }}
      {...props}
    >
      {/* Nếu có chuỗi HTML (từ CMS) thì render bằng dangerouslySetInnerHTML */}
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        /* Nếu không thì render children */
        children
      )}
    </div>
  );
};

export const RichTextRaleway = ({
  html,
  children,
  className,
  iconBullet,
  style,
  ...props
}: RichTextProps) => {
  return (
    <div
      className={cn(
        // Class gốc của plugin typography
        "prose max-w-none",

        // Cấu hình style mặc định (Map với Design System của bạn)
        // Dùng biến --font-body, --color-gray, --color-dark bạn đã setup
        "prose-headings:font-heading prose-headings:font-semibold prose-headings:text-dark",
        "prose-p:font-body prose-p:text-t16 md:prose-p:text-t18 prose-p:text-gray prose-p:leading-relaxed",
        "prose-li:text-gray prose-li:leading-relaxed",
        "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
        "prose-strong:font-bold prose-strong:text-dark",
        "prose-img:rounded-card", // Bo góc ảnh

        // --- LOGIC CUSTOM BULLET ---
        iconBullet && [
          "prose-ul:list-none prose-ul:pl-0", // Tắt list style default
          // 👇 CẬP NHẬT: Dùng Flexbox thay vì Absolute
          "prose-li:flex prose-li:items-start prose-li:gap-2.5 prose-li:pl-0",
          "prose-li:before:content-['']",
          "prose-li:before:shrink-0",
          "prose-li:before:w-6 prose-li:before:h-6", // Kích thước 24px
          "prose-li:before:mt-0", // Căn giữa với dòng đầu tiên (line-height ~28px)

          "prose-li:before:bg-contain prose-li:before:bg-no-repeat prose-li:before:bg-center",
          "prose-li:before:bg-[image:var(--bullet-icon)]",
        ],

        // Cho phép override bằng className bên ngoài
        className,
      )}
      style={{
        ...style,
        ...((iconBullet
          ? { "--bullet-icon": `url(${iconBullet})` }
          : {}) as React.CSSProperties),
      }}
      {...props}
    >
      {/* Nếu có chuỗi HTML (từ CMS) thì render bằng dangerouslySetInnerHTML */}
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        /* Nếu không thì render children */
        children
      )}
    </div>
  );
};
