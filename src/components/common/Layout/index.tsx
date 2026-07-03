
import React, { ComponentProps, useEffect } from "react";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import Header from "../Header";
import Footer from "../Footer";
// import Banner from "@/components/pages/home/banner";

// Types & Utils
import { ScriptItem, ThemeOption } from "@/types/general";
import { extractScripts, injectHtml } from "@/utils/string";

// =============================
// STYLED CONTAINER
// =============================
const Container = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div
      className="flex flex-col min-h-screen h-screen w-full max-w-wrapper mx-auto"
      {...props}
    />
  );
};

// =============================
// INTERFACES
// =============================
interface LayoutProps {
  children: React.ReactNode;
  currentLang: string;             // Nhận "VIE" hoặc "ENG" từ WPPage
  switchUri?: string | null;       // Link của trang đối ứng
  themeOption?: ThemeOption | any; // Dữ liệu theme tổng từ context
}

// =============================
// HELPER: PROCESS THEME DATA
// =============================
// Xử lý đệ quy để tự động lấy đúng layout Vn/En tùy theo ngôn ngữ
export const processThemeData = (data: any, isVIE: boolean): any => {
  if (!data || typeof data !== 'object') return data;

  // Nếu là mảng, tìm khối chứa hậu tố ngôn ngữ tương ứng
  if (Array.isArray(data)) {
    const localized = data.find(item =>
      item?.__typename?.includes(isVIE ? "Vn" : "En")
    );
    if (localized) return processThemeData(localized, isVIE);
    return data.map(item => processThemeData(item, isVIE));
  }

  // Nếu là object, duyệt sâu vào các key
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = processThemeData(data[key], isVIE);
    return acc;
  }, {} as any);
};

// =============================
// MAIN COMPONENT
// =============================
const Layout = ({ children, currentLang, switchUri, themeOption }: LayoutProps) => {
  const isVIE = currentLang === "vi";

  // 1. Lọc toàn bộ Theme Option theo ngôn ngữ hiện tại
  const processedTheme = processThemeData(themeOption || {}, isVIE) || {};

  // 2. Destructure dữ liệu đã lọc để truyền xuống dưới
  const { header, footer, topMenu, leftPanel } = processedTheme;
  const [scripts, setScripts] = React.useState<ScriptItem[]>([]);

  useEffect(() => {
    // Khởi tạo hiệu ứng AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });

    // --- (TÙY CHỌN) LẤY SCRIPT TỪ WP THEME OPTIONS NẾU CÓ ---
    /*
    if (headerFooterTracking) {
      const { scripts: headScripts } = extractScripts(headerFooterTracking.header || "");
      const { noscripts: bodyNoscripts, scripts: bodyScripts } = extractScripts(headerFooterTracking.body || "");
      const { noscripts: footerNoscripts, scripts: footerScripts } = extractScripts(headerFooterTracking.footer || "");
      
      setScripts(headScripts);
      injectHtml("start", bodyScripts, bodyNoscripts);
      injectHtml("end", footerScripts, footerNoscripts);
    }
    */
  }, []); // headerFooterTracking có thể đưa vào dependency array nếu cần

  // Chặn render nếu không có themeOption để tránh sụp UI
  if (!themeOption) return null;
  console.log("=== LAYOUT RENDER ===");
  console.log("footer:" , footer);
  return (
    <>
      <Helmet>
        {scripts.map((s, i) =>
          s.src ? (
            <script key={i} src={s.src} async={s.async} />
          ) : (
            <script key={i}>{s.content}</script>
          ),
        )}
      </Helmet>

      <Container>

        {/* Truyền các props cần thiết xuống Header */}
        <Header
          currentLang={currentLang}
          switchUri={switchUri}
          headerData={header}
          topMenuData={topMenu}
          leftPanelData={leftPanel}
        />

        {/* <Banner/> */}
        <main className="mt-40 lg:mt-25 grow">
          {children}
        </main>

        {/* Truyền dữ liệu Footer tương ứng xuống */}
        <Footer footerData={footer} />
      </Container>
    </>
  );
};

export default Layout;
