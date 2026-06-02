// src/components/ui/icon/IconPlayMinimal.tsx
import React from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const IconPlayMinimal = ({ className, style, onClick }: Props) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      onClick={onClick}
    >
      {/* Vòng tròn mờ nền sau */}
      <circle cx="40" cy="40" r="40" fill="black" fillOpacity="0.3" />
      {/* Vòng tròn viền trắng */}
      <circle cx="40" cy="40" r="38.5" stroke="white" strokeWidth="3" />
      {/* Hình tam giác Play */}
      <path
        d="M52 40L32 52L32 28L52 40Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconPlayMinimal;
