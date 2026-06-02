import React, { useEffect } from "react";
import { navigate, type PageProps } from "gatsby";

const NotFoundPage: React.FC<PageProps> = () => {
  useEffect(() => {
    // Chuyển hướng về trang chủ ngay lập tức
    // replace: true giúp người dùng không bị kẹt khi bấm nút Back
    navigate("/", { replace: true });
  }, []);

  // Trả về null để màn hình trắng trơn trong tích tắc trước khi chuyển
  // Hoặc bạn có thể return một cái Loading Spinner nếu muốn
  return null;
};

export default NotFoundPage;

// Optional: Cấu hình Head cho trang 404 (để SEO không đánh lỗi)
export const Head = () => <title>Redirecting...</title>;
