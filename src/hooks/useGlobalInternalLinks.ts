import { useEffect } from "react";
import { navigate } from "gatsby";

// --- PHẦN LOGIC URL GIỮ NGUYÊN (Tối ưu nhẹ) ---
const rawSiteUrls = [
  process.env.GATSBY_SITE_URL,
  process.env.GATSBY_SITE_URL_2,
  process.env.GATSBY_SITE_URL_3,
  process.env.GATSBY_SITE_URL_4,
].filter(Boolean) as string[];

const internalOrigins = rawSiteUrls.flatMap((url) => {
  try {
    const cleanUrl = url.replace(/\/$/, "");
    const urlObj = new URL(cleanUrl);
    // Lưu thẳng Origin (vd: https://example.com) để so sánh cho nhanh
    // thay vì lưu full URL.
    const origins = [urlObj.origin];

    // Tự động handle www
    if (urlObj.hostname.startsWith("www.")) {
      origins.push(cleanUrl.replace("://www.", "://"));
    } else {
      origins.push(cleanUrl.replace("://", "://www."));
    }
    return origins;
  } catch {
    return [];
  }
});

export const useGlobalInternalLinks = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 1. Tìm thẻ <a> (kể cả khi click vào span/img bên trong thẻ a)
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      // 2. Lấy thuộc tính href
      // 'href' property trả về full URL, 'getAttribute' trả về chuỗi thô
      const href = link.getAttribute("href");
      if (!href) return;

      // --- CÁC CHECK CƠ BẢN (Browser native behavior) ---

      // Nếu user nhấn giữ Ctrl/Cmd/Shift để mở tab mới -> Đừng chặn họ!
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const target = link.getAttribute("target");
      const download = link.getAttribute("download");

      if (target === "_blank" || download !== null) return;
      if (/^(mailto:|tel:|sms:|skype:)/.test(href)) return;
      if (href.startsWith("#")) return;
      if (
        /\.(pdf|zip|rar|7z|jpg|jpeg|png|gif|svg|mp4|mp3|docx|xlsx)$/i.test(href)
      )
        return;

      // --- CHECK DOMAIN ---
      let urlObj: URL;
      try {
        // new URL sẽ tự xử lý cả relative path (/about) và absolute path (https://...)
        urlObj = new URL(href, window.location.origin);
      } catch {
        return;
      }

      // Logic so sánh Origin
      const isInternal =
        urlObj.origin === window.location.origin ||
        internalOrigins.includes(urlObj.origin);

      if (isInternal) {
        // QUAN TRỌNG: Ngăn tải lại trang
        e.preventDefault();

        // Gatsby navigate xử lý path + search + hash
        const path = urlObj.pathname + urlObj.search + urlObj.hash;
        navigate(path);
      }
    };

    // Gắn vào window để bắt trọn mọi click
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
};
