import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { headerData } from './mockData';
import './TopHeader.css';

const TopHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Bật/tắt Menu Mobile
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false); // Bật/tắt thanh tìm kiếm Mobile
  const langRef = useRef<HTMLDivElement>(null);

  // Xử lý sự kiện cuộn
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Xử lý click ra ngoài đóng ngôn ngữ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = headerData.languages.find(l => l.isCurrent) || headerData.languages[0];

  return (
    <>
      {scrolled && <div className="header-placeholder" style={{ height: '126px', width: '100%' }}></div>}

      <header id="header" className={`top-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="inner-container w-100">
          
          {/* --- MAIN HEADER (Dùng chung Desktop & Mobile) --- */}
          <div className="primary-header-inner d-flex align-items-center justify-content-between">
            
            {/* LOGO */}
            <div className="logo">
              <Link to="/">
                <img className="only-desktop" src={headerData.logo} alt="EMASI" />
                {/* <img className="only-mobile" src={headerData.logoWhite} alt="EMASI" /> */}
              </Link>
            </div>
            
            <div className="header-nav d-flex flex-column align-items-end">
              
              {/* NGÔN NGỮ (Ẩn trên Mobile tùy theo CSS của bạn) */}
              <div className={`lang-wrapper ${langOpen ? 'active' : ''}`} ref={langRef}>
                <div className="lang-current" onClick={() => setLangOpen(!langOpen)}>
                  <img src={currentLang.flag} alt={currentLang.code} style={{ width: '16px' }} />
                  <span>{currentLang.code}</span>
                  <span className="arrow-down-black"></span>
                </div>
                <div className="lang-dropdown">
                  {headerData.languages.map((lang, idx) => (
                    <Link to="#" key={idx} className="lang-dropdown-item" onClick={() => setLangOpen(false)}>
                      <img src={lang.flag} alt={lang.code} style={{ width: '16px' }} />
                      <span>{lang.code}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* NAVBAR (Menu chính & Menu Mobile) */}
              <nav id="navbar" className={`navbar ${mobileMenuOpen ? 'navbar-mobile' : ''}`}>
                <div className="navbar-inner">
                  
                  {/* Các phần tử dành riêng cho Menu Mobile */}
                  <div className="m-logo position-relative only-mobile">
                    <Link to="/"><img className="m-nav-logo" src={headerData.logo} alt="EMASI" /></Link>
                    {/* Nút đóng menu Mobile */}
                    <div className="mobile-nav-toggle menu-close" onClick={() => setMobileMenuOpen(false)}></div>
                  </div>

                  <div className="m-search only-mobile">
                    <form action="/search">
                      <div className="r-item">
                        <input type="text" name="s" placeholder="Tìm kiếm" />
                        <button type="submit" className="btn-search"></button>
                      </div>
                    </form>
                  </div>

                  {/* Danh sách Menu */}
                  <ul className="nav">
                    {headerData.mainMenu.map((menu, i) => (
                      <li key={i} className={menu.childs.length > 0 ? "dropdown" : ""}>
                        <Link to={menu.url} className="nav-link" onClick={() => {
                          if (mobileMenuOpen && menu.childs.length === 0) setMobileMenuOpen(false);
                        }}>
                          <span>{menu.name}</span>
                          {menu.childs.length > 0 && <span className="arrow-down"></span>}
                        </Link>
                        {menu.childs.length > 0 && (
                          <ul className="sub-menu">
                            {menu.childs.map((child, j) => (
                              <li key={j}>
                                <Link to={child.url} className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>

                </div>
              </nav>

              {/* Nút mở Hamburger Menu trên Mobile */}
              <div 
                className="mobile-nav-toggle only-mobile" 
                onClick={() => setMobileMenuOpen(true)}
              ></div>

            </div>
          </div>

        </div>
      </header>
    </>
  );
};

export default TopHeader;
// import React, { useState } from 'react';
// import { Link } from 'gatsby';
// import { headerData } from './mockData'; // Giả định bạn đã có dữ liệu này
// import './TopHeader.css'; 

// const TopHeader = () => {
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <header id="header" className="fixed-top d-flex align-items-center">
//       <div className="inner-container">
//         <div className="primary-header-inner d-flex align-items-center justify-content-between">
          
//           {/* Logo */}
//           <div className="logo">
//             <Link to="/">
//               <img className="only-desktop" src={headerData.logo} alt="Logo" />
//               <img className="only-mobile" src={headerData.logoWhite} alt="Logo" />
//             </Link>
//           </div>

//           {/* Navigation */}
//           <div className="header-nav d-flex flex-column align-items-end">
//             <nav id="navbar" className={`navbar ${isMobileMenuOpen ? 'navbar-mobile' : ''}`}>
//               <div className="navbar-inner">
//                 {/* Menu chính */}
//                 <ul className="nav">
//                   {headerData.mainMenu.map((menu, i) => (
//                     <li key={i} className={menu.childs.length > 0 ? 'dropdown' : ''}>
//                       <Link to={menu.url} className="nav-link">
//                         <span>{menu.name}</span>
//                         {menu.childs.length > 0 && <span className="arrow-down"></span>}
//                       </Link>
//                       {menu.childs.length > 0 && (
//                         <ul className="sub-menu">
//                           {menu.childs.map((child, j) => (
//                             <li key={j}><Link to={child.url} className="nav-link">{child.name}</Link></li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </nav>
//           </div>
//         </div>

//         {/* Khối only-mobile (Khớp hoàn toàn với header.php) */}
//         <div className="only-mobile">
//           <hr className="hr-custom" />
//           <div className="bellow-header-inner d-flex align-items-center justify-content-between gap-2">
//             <div className="icon-item btn-search-bw" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
//               <img src="/assets/images/icon-s.svg" alt="Search" />
//               <span>Search</span>
//             </div>
//           </div>
//           <div className={`m-search-bw ${isMobileSearchOpen ? 'active' : ''}`}>
//             <form action="/search">
//               <div className="r-item">
//                 <input type="text" name="s" placeholder="Search" />
//                 <button type="submit" className="btn-search"></button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopHeader;