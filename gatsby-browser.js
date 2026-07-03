import React from "react";
import { useGlobalInternalLinks } from "./src/hooks/useGlobalInternalLinks";
import { StoreProvider } from "./src/context/StoreContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticQuery, graphql } from "gatsby";
import { GlobalThemeProvider } from "./src/context/GlobalThemeProvider";
// --- CHẶN LỖI RUNTIME TỪ FILE SCRIPT WP CŨ ĐỂ KHÔNG BỊ SẬP APP ---
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    if (e.filename && (e.filename.includes("emasi.js") || e.filename.includes("main.js"))) {
      console.warn("Đã chặn lỗi Runtime từ file cũ để tránh sập app:", e.message);
      e.preventDefault(); 
    }
  });
}

// --- TIÊM CSS VÀ JS TĨNH TỪ THƯ MỤC STATIC (PHÍA CLIENT) ---
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

  const insertJS = (id, src) => {
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = false; 
      document.body.appendChild(script);
      return script;
    }
    return null;
  };

  // 1. Tiêm CSS theo thứ tự chuẩn
  insertCSS("bootstrap-css", "/assets/css/bootstrap.min.css");
  insertCSS("bootstrap-icons", "/assets/css/bootstrap-icons.css");
  insertCSS("font-awesome", "/assets/css/font-awesome.min.css");
  insertCSS("aos-css", "/assets/css/aos.css");
  insertCSS("slick-css", "/assets/css/slick.css");
  insertCSS("select2-css", "/assets/css/select2.min.css");
  insertCSS("wp-style", "/assets/css/style.css");
  insertCSS("wp-custom-style", "/assets/css/custom-style.css");
  insertCSS("css-plus-main", "/assets/css/css_plus_main.css");

  // 2. Tiêm JS sau khi DOM load hoàn tất
  window.addEventListener("DOMContentLoaded", () => {
    insertJS("jq", "/assets/js/jquery.min.js");
    insertJS("bs-bundle", "/assets/js/bootstrap.bundle.min.js");
    const aosScript = insertJS("aos-js", "/assets/js/aos.js");
    if (aosScript) {
      aosScript.onload = () => {
        if (window.AOS) {
          window.AOS.init({ once: true });
        }
      };
    }
    insertJS("slick-js", "/assets/js/slick.min.js");
    insertJS("select2-js", "/assets/js/select2.min.js");
    insertJS("emasi-main", "/assets/js/main.js");
  });
}

// --- COMPONENT BỔ TRỢ HỆ THỐNG ---
const GlobalProvider = ({ children }) => {
  useGlobalInternalLinks(); // Kích hoạt hook lắng nghe click toàn cục
  return <>{children}</>;
};
// --- HÀM BAO BỌC PHÍA GATSBY CLIENT ---
export const wrapRootElement = ({ element }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <StoreProvider>
        <GlobalProvider>{element}</GlobalProvider>
      </StoreProvider>
    </LocalizationProvider>
  );
};