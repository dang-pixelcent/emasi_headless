import React from "react";
import { useGlobalInternalLinks } from "./src/hooks/useGlobalInternalLinks";
import { StoreProvider } from "./src/context/StoreContext";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

// Thêm đoạn này vào đầu file gatsby-browser.js để chặn lỗi sập trang
if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    // Nếu lỗi xuất hiện từ các file script cũ của WP (như emasi.js hay main.js)
    if (e.filename && (e.filename.includes("emasi.js") || e.filename.includes("main.js"))) {
      console.warn("Đã chặn lỗi Runtime từ file cũ để tránh sập app:", e.message);
      e.preventDefault(); // Ngăn React hiển thị màn hình báo lỗi đỏ (Error Overlay)
    }
  });
}
// --- MẸO LOAD BOOTSTRAP VÀ CSS TĨNH TỪ THƯ MỤC STATIC PHÍA CLIENT ---
if (typeof window !== "undefined") {
  // Hàm tiêm CSS
  const insertCSS = (id, href) => {
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  };

  // Hàm tiêm JS bổ trợ (Đồ án dùng rất nhiều jQuery và Slick slide)
  const insertJS = (id, src) => {
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = false; // Chạy tuần tự để tránh lỗi jQuery undefined
      document.body.appendChild(script);
      return script;
    }
    return null;
  };

  // 1. Tiêm toàn bộ file CSS (Thứ tự chuẩn từ core đến custom)
  insertCSS("bootstrap-css", "/assets/css/bootstrap.min.css");
  insertCSS("bootstrap-icons", "/assets/css/bootstrap-icons.css");
  insertCSS("font-awesome", "/assets/css/font-awesome.min.css");
  insertCSS("aos-css", "/assets/css/aos.css");
  insertCSS("slick-css", "/assets/css/slick.css");
  insertCSS("select2-css", "/assets/css/select2.min.css");
  insertCSS("wp-style", "/assets/css/style.css");
  insertCSS("wp-custom-style", "/assets/css/custom-style.css");

  // 2. Tiêm toàn bộ file hiệu ứng JS (Chờ DOM load xong sẽ kích hoạt)
  window.addEventListener("DOMContentLoaded", () => {
    insertJS("jq", "/assets/js/jquery.min.js");
    insertJS("bs-bundle", "/assets/js/bootstrap.bundle.min.js");
    const aosScript = insertJS("aos-js", "/assets/js/aos.js");
    if (aosScript) aosScript.onload = () => { window.AOS && window.AOS.init(); };
    insertJS("slick-js", "/assets/js/slick.min.js");
    insertJS("select2-js", "/assets/js/select2.min.js");
    insertJS("emasi-main", "/assets/js/main.js");
    insertJS("emasi-core", "/assets/js/emasi.js");
  });
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