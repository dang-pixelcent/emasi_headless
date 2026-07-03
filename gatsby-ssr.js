import React from "react";
import { StoreProvider } from "./src/context/StoreContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { StaticQuery, graphql } from "gatsby"; // Bổ sung import
import { GlobalThemeProvider } from "./src/context/GlobalThemeProvider";
const GlobalProvider = ({ children }) => {
  return <>{children}</>;
};

// 1. Cập nhật wrapRootElement để bọc ThemeWrapper thay vì StoreProvider trống
export const wrapRootElement = ({ element }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StoreProvider>
        <GlobalProvider>{element}</GlobalProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};
// export const wrapRootElement = ({ element }) => {
//   return (
//     <GlobalThemeProvider>
//       {/* StoreProvider cũ của bạn không cần gánh data theme nữa */}
//       <StoreProvider>
//          {/* Các wrapper khác của bạn */}
//          {element}
//       </StoreProvider>
//     </GlobalThemeProvider>
//   );
// };

// 2. Giữ nguyên onRenderBody để nhúng link Font vào thẻ <head>
export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="preconnect-google"
      rel="preconnect"
      href="https://fonts.googleapis.com"
    />,
    <link
      key="preconnect-gstatic"
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      key="open-sans-font"
      href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />,
  ]);
};