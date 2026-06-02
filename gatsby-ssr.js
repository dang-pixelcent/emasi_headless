import React from "react";
import "./src/assets/css/global.css";
import { StoreProvider } from "./src/context/StoreContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// GlobalProvider wrapper để match với gatsby-browser.js
// useEffect bên trong sẽ không chạy trong SSR
const GlobalProvider = ({ children }) => {
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
