import React from "react";
import "./src/assets/css/global.css";
import { useGlobalInternalLinks } from "./src/hooks/useGlobalInternalLinks";
import { StoreProvider } from "./src/context/StoreContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
// Tách component ra để code rõ ràng
const GlobalProvider = ({ children }) => {
  // Kích hoạt hook lắng nghe click toàn cục
  useGlobalInternalLinks();

  return <>{children}</>;
};

export const wrapRootElement = ({ element }) => {
  console.log("wrapRootElement called",React.version);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StoreProvider>
        <GlobalProvider>{element}</GlobalProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};
