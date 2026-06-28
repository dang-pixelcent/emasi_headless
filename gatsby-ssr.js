import React from "react";
import { StoreProvider } from "./src/context/StoreContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const GlobalProvider = ({ children }) => {
  return <>{children}</>;
};

// 1. Giữ nguyên hàm wrapRootElement của bạn
export const wrapRootElement = ({ element }) => {
  console.log("wrapRootElement called", React.version);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StoreProvider>
        <GlobalProvider>{element}</GlobalProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};
// 2. THÊM ĐOẠN NÀY: Dùng onRenderBody để nhúng link Font vào thẻ <head>
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
