
import React from "react";
import { useGlobalInternalLinks } from "./src/hooks/useGlobalInternalLinks";
import { StoreProvider } from "./src/context/StoreContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { GlobalThemeProvider } from "./src/context/GlobalThemeProvider";

// --- CHẶN LỖI RUNTIME TỪ FILE SCRIPT WP CŨ ---
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    if (e.filename && (e.filename.includes("emasi.js") || e.filename.includes("main.js"))) {
      console.warn("Đã chặn lỗi Runtime từ file cũ:", e.message);
      e.preventDefault(); 
    }
  });
}

// --- CHỈ TIÊM JS TUẦN TỰ (CSS ĐÃ CHUYỂN SANG SSR) ---
if (typeof window !== "undefined") {
  const loadScript = (id, src) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = false;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Lỗi tải script: ${src}`));
      document.body.appendChild(script);
    });
  };

  const initScripts = async () => {
    try {
      await loadScript("jq", "/assets/js/jquery.min.js");
      await loadScript("bs-bundle", "/assets/js/bootstrap.bundle.min.js");
      await loadScript("slick-js", "/assets/js/slick.min.js");
      await loadScript("select2-js", "/assets/js/select2.min.js");
      await loadScript("emasi-main", "/assets/js/main.js");
      
      await loadScript("aos-js", "/assets/js/aos.js");
      if (window.AOS) {
        window.AOS.init({ 
          once: true,
          disable: 'mobile', 
          duration: 600 
        });
      }
    } catch (err) {
      console.error("Lỗi khi tải chuỗi script hệ thống:", err);
    }
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initScripts();
  } else {
    window.addEventListener("DOMContentLoaded", initScripts);
  }
}

const GlobalProvider = ({ children }) => {
  useGlobalInternalLinks();
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