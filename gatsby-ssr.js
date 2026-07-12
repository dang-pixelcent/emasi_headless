// import React from "react";
// import { StoreProvider } from "./src/context/StoreContext";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { StaticQuery, graphql } from "gatsby"; // Bổ sung import
// import { GlobalThemeProvider } from "./src/context/GlobalThemeProvider";
// const GlobalProvider = ({ children }) => {
//   return <>{children}</>;
// };

// // 1. Cập nhật wrapRootElement để bọc ThemeWrapper thay vì StoreProvider trống
// export const wrapRootElement = ({ element }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterMoment}>
//       <StoreProvider>
//         <GlobalProvider>{element}</GlobalProvider>
//       </StoreProvider>
//     </LocalizationProvider>
//   );
// };
// // export const wrapRootElement = ({ element }) => {
// //   return (
// //     <GlobalThemeProvider>
// //       {/* StoreProvider cũ của bạn không cần gánh data theme nữa */}
// //       <StoreProvider>
// //          {/* Các wrapper khác của bạn */}
// //          {element}
// //       </StoreProvider>
// //     </GlobalThemeProvider>
// //   );
// // };

// // 2. Giữ nguyên onRenderBody để nhúng link Font vào thẻ <head>
// export const onRenderBody = ({ setHeadComponents }) => {
//   setHeadComponents([
//     <link
//       key="preconnect-google"
//       rel="preconnect"
//       href="https://fonts.googleapis.com"
//     />,
//     <link
//       key="preconnect-gstatic"
//       rel="preconnect"
//       href="https://fonts.gstatic.com"
//       crossOrigin="anonymous"
//     />,
//     <link
//       key="open-sans-font"
//       href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
//       rel="stylesheet"
//     />,
//   ]);
// };
import React from "react";
import { StoreProvider } from "./src/context/StoreContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { GlobalThemeProvider } from "./src/context/GlobalThemeProvider";

const GlobalProvider = ({ children }) => {
  return <>{children}</>;
};

export const wrapRootElement = ({ element }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StoreProvider>
        <GlobalProvider>{element}</GlobalProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};

// QUAN TRỌNG: Đưa toàn bộ CSS từ browser sang SSR để HTML tải về là có sẵn CSS ngay!
export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  // Thêm lang cho SEO đạt 100 điểm
  setHtmlAttributes({ lang: "vi-VN" });

  setHeadComponents([
    // 1. Google Fonts
    <link key="preconnect-google" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link key="open-sans-font" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />,

    // 2. Toàn bộ CSS hệ thống (Được nạp sẵn vào HTML tĩnh)
    <link key="bs-css" rel="stylesheet" href="/assets/css/bootstrap.min.css" />,
    <link key="bi-css" rel="stylesheet" href="/assets/css/bootstrap-icons.css" />,
    <link key="fa-css" rel="stylesheet" href="/assets/css/font-awesome.min.css" />,
    <link key="aos-css" rel="stylesheet" href="/assets/css/aos.css" />,
    <link key="slick-css" rel="stylesheet" href="/assets/css/slick.css" />,
    <link key="select2-css" rel="stylesheet" href="/assets/css/select2.min.css" />,
    <link key="wp-style" rel="stylesheet" href="/assets/css/style.css" />,
    <link key="wp-custom" rel="stylesheet" href="/assets/css/custom-style.css" />,
    <link key="css-plus" rel="stylesheet" href="/assets/css/css_plus_main.css" />,

    // 3. CHỐT KHÓA ANTI-FOUC: Cấm tất cả SVG và Icon phình to trước khi bất kỳ thứ gì tải xong!
    <style key="anti-fouc-guard" dangerouslySetInnerHTML={{ __html: `
      svg, i[class*="bi-"], i[class*="fa-"], .bg-icon:before, [class*="icon"] {
        max-width: 100% !important;
        max-height: 80px !important;
        display: inline-block;
      }
      /* Ngăn Slick Slider xếp chồng ảnh làm lệch layout trước khi JS chạy */
      .campus-slider:not(.slick-initialized) .slick-slide:not(:first-child) {
        display: none !important;
      }
    `}} />
  ]);
};