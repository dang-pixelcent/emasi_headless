import React, { useMemo } from "react";
import { cn } from "@/utils/clsx";

interface Props {
  name: string;
  className?: string;
}

// 1. Hàm lấy 2 chữ cái đầu (VD: "Giulia Gallo" -> "GG")
const getInitials = (name: string) => {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/); // Tách tên bằng khoảng trắng
  if (parts.length === 1) {
    // Nếu chỉ có 1 tên (VD: "Giulia") -> Lấy 2 chữ đầu "GI"
    return parts[0].slice(0, 2).toUpperCase();
  }
  // Nếu có họ tên -> Lấy chữ đầu của Họ và Tên
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// 2. Hàm tạo màu nền dựa trên tên (Tên giống nhau -> Màu giống nhau)

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Tạo màu Hex
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    // Làm cho màu tối hơn một chút để chữ trắng luôn nổi bật
    // Bằng cách giới hạn value (ví dụ không quá 200)
    const darkValue = Math.floor(value * 0.8);
    color += ("00" + darkValue.toString(16)).substr(-2);
  }
  return color;
};

const AvatarFromName = ({ name, className }: Props) => {
  const initials = useMemo(() => getInitials(name), [name]);
  const bgColor = useMemo(() => stringToColor(name), [name]);

  return (
    <div
      className={cn(
        `flex items-center justify-center 
        rounded-full text-white font-bold 
        select-none shrink-0`,
        className,
      )}
      style={{
        backgroundColor: bgColor,
      }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default AvatarFromName;
