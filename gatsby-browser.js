import React from "react";
import { useGlobalInternalLinks } from "./src/hooks/useGlobalInternalLinks";
import { StoreProvider } from "./src/context/StoreContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

// --- MẸO LOAD BOOTSTRAP VÀ CSS TĨNH TỪ THƯ MỤC STATIC PHÍA CLIENT ---
if (typeof window !== "undefined") {
  const insertCSS = (id, href) => {
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  };

  // Đảm bảo đống file này nằm trong thư mục static/assets/css/ nhé!
  insertCSS("aos-css", "/assets/css/aos.css");
  insertCSS("bootstrap-css", "/assets/css/bootstrap.min.css");
  insertCSS("bootstrap-icons-css", "/assets/css/bootstrap-icons.css");
  insertCSS("style-css", "/assets/css/style.css");
  insertCSS("custom-style-css", "/assets/css/custom-style.css");
  insertCSS("font-awesome-css", "/assets/css/font-awesome.min.css");
  insertCSS("select2-css", "/assets/css/select2.min.css");
  insertCSS("slick-css", "/assets/css/slick.css");
  
}
// ------------------------------------------------------------------

// Tách component ra để code rõ ràng
const GlobalProvider = ({ children }) => {
  // Kích hoạt hook lắng nghe click toàn cục
  useGlobalInternalLinks();

  return <>{children}</>;
};

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