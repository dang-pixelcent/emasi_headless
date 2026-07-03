// src/context/GlobalThemeProvider.tsx
import React, { createContext, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";

// 1. Tạo Context
const ThemeContext = createContext<any>(null);

// 2. Tạo Provider
export const GlobalThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tự động query theme 1 lần duy nhất lúc khởi tạo
  const data = useStaticQuery(graphql`
    query GlobalThemeQuery {
      allWpThemeOptions {
        nodes {
          siteId
          header
          footer
          topMenu
          leftPanel
        }
      }
    }
  `);

  const themeData = data?.allWpThemeOptions?.nodes?.[0] || null;

  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Hook để xài ở bất cứ đâu
export const useGlobalTheme = () => useContext(ThemeContext);