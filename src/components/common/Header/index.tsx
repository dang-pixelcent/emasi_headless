// src/components/common/Header/index.tsx
import React, { useEffect } from 'react';
import LeftPanel from './LeftPanel';
import TopHeader from './TopHeader';

const Header = ({ children }: { children: React.ReactNode }) => {
  
  // Logic Vanilla JS Cookie UTM chuyển đổi thành React useEffect
  useEffect(() => {
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
      <LeftPanel />
      <div className="main-panel">
        <TopHeader />
        
        <main id="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Header;