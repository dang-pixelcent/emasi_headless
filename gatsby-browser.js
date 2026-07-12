
// import React from "react";
// import { useGlobalInternalLinks } from "./src/hooks/useGlobalInternalLinks";
// import { StoreProvider } from "./src/context/StoreContext";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { GlobalThemeProvider } from "./src/context/GlobalThemeProvider";

// // --- CHẶN LỖI RUNTIME TỪ FILE SCRIPT WP CŨ ---
// if (typeof window !== "undefined") {
//   window.addEventListener("error", (e) => {
//     if (e.filename && (e.filename.includes("emasi.js") || e.filename.includes("main.js"))) {
//       console.warn("Đã chặn lỗi Runtime từ file cũ:", e.message);
//       e.preventDefault(); 
//     }
//   });
// }

// // --- TIÊM CSS VÀ JS TĨNH THEO CHUỖI TUẦN TỰ AN TOÀN ---
// if (typeof window !== "undefined") {
//   const insertCSS = (id, href) => {
//     if (!document.getElementById(id)) {
//       const link = document.createElement("link");
//       link.id = id;
//       link.rel = "stylesheet";
//       link.href = href;
//       document.head.appendChild(link);
//     }
//   };

//   const loadScript = (id, src) => {
//     return new Promise((resolve, reject) => {
//       if (document.getElementById(id)) {
//         resolve(true);
//         return;
//       }
//       const script = document.createElement("script");
//       script.id = id;
//       script.src = src;
//       script.async = false;
//       script.onload = () => resolve(true);
//       script.onerror = () => reject(new Error(`Lỗi tải script: ${src}`));
//       document.body.appendChild(script);
//     });
//   };

//   // 1. Tiêm CSS ngay lập tức
//   insertCSS("bootstrap-css", "/assets/css/bootstrap.min.css");
//   insertCSS("bootstrap-icons", "/assets/css/bootstrap-icons.css");
//   insertCSS("font-awesome", "/assets/css/font-awesome.min.css");
//   insertCSS("aos-css", "/assets/css/aos.css");
//   insertCSS("slick-css", "/assets/css/slick.css");
//   insertCSS("select2-css", "/assets/css/select2.min.css");
//   insertCSS("wp-style", "/assets/css/style.css");
//   insertCSS("wp-custom-style", "/assets/css/custom-style.css");
//   insertCSS("css-plus-main", "/assets/css/css_plus_main.css");

//   // 2. Tiêm JS tuần tự tuyệt đối (jQuery trước -> Slick sau -> AOS sau cùng)
//   const initScripts = async () => {
//     try {
//       await loadScript("jq", "/assets/js/jquery.min.js");
//       await loadScript("bs-bundle", "/assets/js/bootstrap.bundle.min.js");
//       await loadScript("slick-js", "/assets/js/slick.min.js");
//       await loadScript("select2-js", "/assets/js/select2.min.js");
//       await loadScript("emasi-main", "/assets/js/main.js");
      
//       await loadScript("aos-js", "/assets/js/aos.js");
//       if (window.AOS) {
//         // QUAN TRỌNG: Tắt AOS trên mobile để tránh kẹt opacity: 0 làm trắng hình!
//         window.AOS.init({ 
//           once: true,
//           disable: 'mobile', 
//           duration: 600 
//         });
//       }
//     } catch (err) {
//       console.error("Lỗi khi tải chuỗi script hệ thống:", err);
//     }
//   };

//   // Khởi chạy ngay lập tức mà không phụ thuộc vào DOMContentLoaded bị lỡ nhịp
//   if (document.readyState === "complete" || document.readyState === "interactive") {
//     initScripts();
//   } else {
//     window.addEventListener("DOMContentLoaded", initScripts);
//   }
// }

// // --- COMPONENT BỔ TRỢ HỆ THỐNG ---
// const GlobalProvider = ({ children }) => {
//   useGlobalInternalLinks();
//   return <>{children}</>;
// };

// export const wrapRootElement = ({ element }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterMoment}>
//       <StoreProvider>
//         <GlobalProvider>{element}</GlobalProvider>
//       </StoreProvider>
//     </LocalizationProvider>
//   );
// };
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