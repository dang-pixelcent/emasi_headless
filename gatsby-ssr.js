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
