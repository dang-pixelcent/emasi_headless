import React, { useEffect } from 'react';
import LeftPanel from './LeftPanel';
import TopHeader from './TopHeader';

// Định nghĩa props mới
interface HeaderProps {
  currentLang: string;
  switchUri?: string | null;
  headerData?: any;
  topMenuData?: any;
  leftPanelData?: any;
  children?: React.ReactNode;
}

const Header = ({
  currentLang,
  switchUri,
  headerData,
  topMenuData,
  leftPanelData,
  children
}: HeaderProps) => {

  useEffect(() => {
    // Logic UTM cũ của bạn...
    const hasUTMParams = (url: string) => /[?&]utm_/.test(url);
    const saveURLWithUTM = () => {
      const currentURL = window.location.href;
      if (hasUTMParams(currentURL)) {
        const encodedURL = encodeURIComponent(currentURL);
        const expires = new Date();
        expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = `utm_link=${encodedURL}; expires=${expires.toUTCString()}; path=/`;
      }
    };
    saveURLWithUTM();
  }, []);

  return (
    <div className="main-wrapper">
      {/* Truyền dữ liệu vào các component con nếu cần */}
      <LeftPanel leftData={leftPanelData} />

      <div className="main-panel">
        <TopHeader
          data={headerData}
          menu={topMenuData}
          currentLang={currentLang}
          switchUri={switchUri}
        />

        <main id="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Header;