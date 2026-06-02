import { useEffect, useRef, useMemo } from "react";
import { navigate } from "gatsby";

// Lấy URL từ biến môi trường - tất cả các domain
const rawSiteUrls = [
  process.env.GATSBY_SITE_URL,
  process.env.GATSBY_SITE_URL_2,
  process.env.GATSBY_SITE_URL_3,
  process.env.GATSBY_SITE_URL_4,
].filter(Boolean) as string[];

// Tự động thêm cả phiên bản www và non-www
const siteUrls = rawSiteUrls.flatMap((url) => {
  const cleanUrl = url.replace(/\/$/, "");
  try {
    const urlObj = new URL(cleanUrl);
    const host = urlObj.hostname;

    if (host.startsWith("www.")) {
      // Nếu có www -> thêm phiên bản không có www
      const nonWww = cleanUrl.replace("://www.", "://");
      return [cleanUrl, nonWww];
    } else {
      // Nếu không có www -> thêm phiên bản có www
      const withWww = cleanUrl.replace("://", "://www.");
      return [cleanUrl, withWww];
    }
  } catch {
    return [cleanUrl];
  }
});

export const useInternalNavigate = (rawHtml: string) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Xử lý chuỗi HTML: Thay thế domain CHỈ trong href, không đụng vào src
  const processedHtml = useMemo(() => {
    if (!rawHtml) return "";

    let result = rawHtml;

    // Thay thế domain CHỈ trong href="..." (không ảnh hưởng đến src của img, video, etc.)
    siteUrls.forEach((url) => {
      const cleanBaseUrl = url.replace(/\/$/, "");
      // Regex: Chỉ match href="domain..." và thay domain thành rỗng
      const hrefRegex = new RegExp(
        `(href=["'])${cleanBaseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`,
        "g",
      );
      result = result.replace(hrefRegex, "$1");
    });

    return result;
  }, [rawHtml]);

  // 2. Logic xử lý sự kiện Click (Đã nâng cấp)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      // Tìm thẻ <a> gần nhất
      const link = (e.target as HTMLElement).closest("a");

      // Nếu không phải link hoặc không có href -> Bỏ qua
      if (!link || !link.getAttribute("href")) return;

      const href = link.getAttribute("href") || "";
      const target = link.getAttribute("target");
      const download = link.getAttribute("download");

      // --- CÁC TRƯỜNG HỢP BỎ QUA (Browser tự xử lý) ---

      // 1. Link mở tab mới (_blank) hoặc link tải xuống (download attribute)
      if (target === "_blank" || download !== null) return;

      // 2. Các giao thức đặc biệt (mailto, tel, sms...)
      if (/^(mailto:|tel:|sms:|skype:)/.test(href)) return;

      // 3. Neo trong cùng trang (Hash links)
      if (href.startsWith("#")) return;

      // 4. Các tệp tin tài liệu/media (pdf, zip, ảnh...) -> Để trình duyệt tải/mở
      if (
        /\.(pdf|zip|rar|7z|jpg|jpeg|png|gif|svg|mp4|mp3|docx|xlsx)$/i.test(href)
      )
        return;

      // 5. Kiểm tra tên miền (Domain Check)
      let urlObj: URL;
      try {
        urlObj = new URL(href, window.location.origin);
      } catch {
        return;
      }

      // Kiểm tra xem có thuộc bất kỳ domain nội bộ nào không (bao gồm cả www)
      const isInternalDomain =
        urlObj.origin === window.location.origin ||
        siteUrls.some((url) => {
          try {
            const siteOrigin = new URL(url).origin;
            return urlObj.origin === siteOrigin;
          } catch {
            return false;
          }
        });

      // Nếu không thuộc domain nội bộ nào -> Là link ngoài -> Bỏ qua
      if (!isInternalDomain) return;

      // --- XỬ LÝ LINK NỘI BỘ ---
      e.preventDefault();
      navigate(urlObj.pathname + urlObj.search + urlObj.hash);
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, []);

  return { processedHtml, containerRef };
};
