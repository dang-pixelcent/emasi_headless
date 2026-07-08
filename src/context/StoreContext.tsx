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

    // 1. Kiểm tra link ngoài (External links)
    const isExternal = (u: string) => {
      return u.includes('zalo.me') ||
        u.includes('m.me') ||
        u.includes('facebook.com') ||
        u.includes('linkedin.com') ||
        u.startsWith('mailto:') ||
        u.startsWith('tel:') ||
        u.startsWith('http'); // Nếu URL bắt đầu bằng http nhưng KHÔNG phải domain của mình
    };

    // 2. Định nghĩa domain chính (Nên lấy từ env hoặc config)
    const siteDomain = 'emasi.pixelcent.com';

    // Nếu là link ngoài không thuộc domain của mình thì giữ nguyên
    if (isExternal(url) && !url.includes(siteDomain)) {
      return url;
    }

    // 3. XỬ LÝ TÁCH HOST:
    // Nếu url chứa domain, dùng URL object để tách lấy pathname
    if (url.includes(siteDomain) || url.startsWith('http')) {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.pathname; // Đây chính là phần path bạn cần (/tin-tuc/...)
      } catch (e) {
        return url;
      }
    }

    // 4. Nếu đã là path (/tin-tuc/...) thì trả về luôn
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