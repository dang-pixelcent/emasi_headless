// import React from "react";
// import { createContext,useContext, useState } from "react";
// interface StoreContext {
//   currentPage?: string | null;
//   setCurrentPage?: React.Dispatch<React.SetStateAction<string | null>>;
//   themeData: any;
//   normalizePath: (url: string | null | undefined) => string;
// }
// const StoreContext = createContext<StoreContext | undefined>(undefined);

// interface StoreProviderProps {
//   children: React.ReactNode;
//   themeData: any;
// }

// export const StoreProvider: React.FC<StoreProviderProps> = ({ children,themeData }) => {
//   const [currentPage, setCurrentPage] = React.useState<string | null>("Trang-Dang-Test");


//   const value = { currentPage, setCurrentPage, themeData, normalizePath: (url) => url || "" };

//   return (
//     <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
//   );
// };

// export const useStoreContext = () => {
//   const context = React.useContext(StoreContext);
//   if (context === undefined) {
//     throw new Error("useStoreContext must be used within a StoreProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState } from "react";

interface StoreContext {
  currentPage?: string | null;
  setCurrentPage?: React.Dispatch<React.SetStateAction<string | null>>;
  themeData: any;
  normalizePath: (url: string | null | undefined) => string;
}

const StoreContext = createContext<StoreContext | undefined>(undefined);

interface StoreProviderProps {
  children: React.ReactNode;
  themeData: any;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children, themeData }) => {
  const [currentPage, setCurrentPage] = useState<string | null>("Trang-Dang-Test");

  /**
   * Hàm chuẩn hóa đường dẫn cho Gatsby
   * - Nếu là link ngoài (Zalo, Messenger...): Giữ nguyên.
   * - Nếu là link nội bộ (chứa domain của site): Cắt lấy path.
   * - Nếu đã là path (/): Trả về nguyên bản.
   */
  const normalizePath = (url: string | null | undefined): string => {
    if (!url || typeof url !== 'string') return "#";

    // Danh sách các domain hoặc giao thức cần giữ nguyên (mở tab mới)
    const isExternal = (u: string) => {
      return u.includes('zalo.me') ||
        u.includes('m.me') ||
        u.includes('facebook.com') ||
        u.includes('linkedin.com') ||
        u.startsWith('mailto:') ||
        u.startsWith('tel:');
    };

    if (isExternal(url)) return url;

    // Lấy domain hiện tại từ biến môi trường (mặc định là localhost cho phát triển)
    const mainSiteUrl = process.env.GATSBY_MAIN_SITE_URL || 'http://localhost:8000';

    // Nếu URL bắt đầu bằng domain chính, cắt bỏ domain để lấy path
    if (url.startsWith(mainSiteUrl)) {
      return url.replace(mainSiteUrl, '');
    }

    // Nếu là URL tuyệt đối khác (trường hợp hiếm) hoặc path bình thường
    try {
      if (url.startsWith('http')) {
        return new URL(url).pathname;
      }
    } catch (e) {
      // Bỏ qua lỗi
    }

    // Đảm bảo path luôn có dấu / ở đầu
    return url.startsWith('/') ? url : `/${url}`;
  };

  const value = {
    currentPage,
    setCurrentPage,
    themeData,
    normalizePath
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};