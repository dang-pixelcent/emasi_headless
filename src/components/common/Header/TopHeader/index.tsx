
import React, { useState, useEffect, useRef } from 'react';
import { Link, navigate } from 'gatsby';
import './TopHeader.css';
import { useStoreContext } from '@context/StoreContext'; // Import hàm chuẩn hóa

interface TopHeaderProps {
  currentLang: string;
  switchUri?: string | null;
  data?: any;
  menu?: any;
}

const TopHeader: React.FC<TopHeaderProps> = ({ currentLang, switchUri, data, menu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Thêm state quản lý đóng/mở menu con trên mobile
  const [activeDropdowns, setActiveDropdowns] = useState<number[]>([]);

  const [logoSrc, setLogoSrc] = useState('/assets/images/EMASI-LOGO-GRADIENT.png');
  const [mobileLogoSrc, setMobileLogoSrc] = useState('/assets/images/logo-footer.svg');
  const [headerMobileData, setHeaderMobileData] = useState<any>(null);
  const [topMenuData, setTopMenuData] = useState<any>(null);

  // Ref để nhận biết vùng click của bộ ngôn ngữ
  const langRef = useRef<HTMLDivElement>(null);

  // Lấy hàm chuẩn hóa đường dẫn
  const { normalizePath } = useStoreContext();
  // Hàm xử lý khi bấm tìm kiếm trên Mobile/Menu
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('s') as HTMLInputElement;
    if (input && input.value.trim()) {
      setIsMobileMenuOpen(false); // Đóng menu mobile nếu đang mở
      setIsMobileSearchOpen(false); // Đóng khung search mobile
      navigate(`/search?s=${encodeURIComponent(input.value.trim())}`);
    }
  };
  useEffect(() => {
    if (data) {
      const logo = data.logo?.node?.sourceUrl;
      if (logo) setLogoSrc(logo);

      const mobileLogo = data.logomobile?.node?.sourceUrl;
      if (mobileLogo) setMobileLogoSrc(mobileLogo);

      const mobileData = data?.headermobile?.list;
      setHeaderMobileData(mobileData);
    }

    if (menu) {
      const topMenu = menu?.topVi?.topPanel;
      setTopMenuData(topMenu);
    }
  }, [data, menu]);

  const LANGUAGES = [
    { code: 'vi', label: 'VI', flag: '/assets/images/flag-vi.png' },
    { code: 'en', label: 'EN', flag: '/assets/images/flag-us.png' },
  ];
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // LOGIC MỚI: Tự động đóng menu ngôn ngữ khi click chuột ra bên ngoài vùng langRef
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hàm toggle mở/đóng menu con trên mobile
  const toggleSubMenu = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdowns(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (!data || !menu || !headerMobileData || !topMenuData || !logoSrc || !mobileLogoSrc) {
    return null;
  }

  // Helper để Render link trên Mobile (phân loại Action, External, Internal)
  const RenderMobileItem = ({ item, onClick }: { item: any, onClick?: (e: React.MouseEvent) => void }) => {
    const url = item.link?.url;
    const isSearch = item.title?.toLowerCase().includes("tìm kiếm");
    const isAction = !url || url === '#' || isSearch;

    const content = (
      <>
        {item.icon?.node?.sourceUrl && (
          <img src={item.icon.node.sourceUrl} alt={item.title || "Icon"} />
        )}
        <span>{item.title}</span>
      </>
    );

    // Nếu là nút Chức năng (Tìm kiếm)
    if (isAction) {
      return (
        <a
          className="d-flex align-items-center"
          style={{ gap: '0.6vw', cursor: 'pointer' }}
          onClick={(e) => {
            e.preventDefault();
            if (isSearch) setIsMobileSearchOpen(!isMobileSearchOpen);
            if (onClick) onClick(e);
          }}
        >
          {content}
        </a>
      );
    }

    // Nếu là đường dẫn
    const href = normalizePath(url);
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className="d-flex align-items-center" style={{ gap: '0.6vw' }}>
          {content}
        </a>
      );
    }

    return (
      <Link to={href} target={item.link?.target || "_self"} className="d-flex align-items-center" style={{ gap: '0.6vw' }}>
        {content}
      </Link>
    );
  };

  return (
    <header id="header" className={`sticky-header d-flex align-items-center ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="inner-container">
        <div className="primary-header-inner d-flex align-items-center justify-content-between">

          {/* KHỐI LOGO */}
          <div className="logo">
            <Link to="/">
              <img className="only-desktop" src={logoSrc} alt="EMASI" />
              <img className="only-mobile" src={mobileLogoSrc} alt="EMASI" />
            </Link>
          </div>

          {/* KHỐI MENU VÀ NGÔN NGỮ */}
          <div className="header-nav d-flex flex-column align-items-end">

            {/* Bộ chuyển đổi ngôn ngữ: Đã gỡ bỏ onMouseLeave, gắn ref={langRef} */}
            <div className="language" ref={langRef}>
              <div className="current-lang" onClick={() => setIsLangOpen(!isLangOpen)}>
                <a className="lang-text d-flex align-items-center" style={{ gap: '3px', cursor: 'pointer' }}>
                  <img src={currentLangObj.flag} alt={currentLangObj.label} style={{ width: '16px' }} />
                  {currentLangObj.label}
                  <span className="lang-icon"></span>
                </a>
              </div>
              <div className={`lang-lists ${isLangOpen ? 'active' : ''}`}>
                {LANGUAGES.filter(lang => lang.code !== currentLangObj.code).map((lang) => (
                  <a
                    key={lang.code}
                    href={switchUri || (lang.code === 'vi' ? '/' : '/en/')}
                    className="d-flex align-items-center"
                    style={{ gap: '5px', cursor: 'pointer', padding: '5px' }}
                    onClick={() => setIsLangOpen(false)}
                  >
                    <img src={lang.flag} alt={lang.label} style={{ width: '16px' }} />
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Navbar Chính (Desktop & Mobile) */}
            <nav id="navbar" className={`navbar ${isMobileMenuOpen ? 'navbar-mobile' : ''}`}>
              <div className="navbar-inner">

                <div className="m-logo position-relative">
                  <img className="m-nav-logo" src="/assets/images/mobile_logo.png" alt="EMASI" />
                  <div
                    className={`mobile-nav-toggle ${isMobileMenuOpen ? 'menu-close' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  ></div>
                </div>

                <div className="m-search">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="r-item">
                      <input type="text" name="s" placeholder="Tìm kiếm" />
                      <button type="submit" className="btn-search"></button>
                    </div>
                  </form>
                </div>

                <ul className="nav">
                  {topMenuData && topMenuData.map((item: any, index: number) => {
                    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
                    const isSubOpen = activeDropdowns.includes(index);

                    return (
                      <li
                        key={index}
                        className={`${hasSubMenu ? "dropdown" : ""} ${isSubOpen ? "dropdown-active active open" : ""}`}
                      >
                        <Link to={normalizePath(item.linkPage?.url)} className="nav-link">
                          <span>{item.title}</span>
                          {hasSubMenu && <span className="arrow-down"></span>}
                        </Link>

                        {/* Mũi tên bấm để xổ sub-menu trên Mobile */}
                        {hasSubMenu && (
                          <span
                            className={`m-arrow-down ${isSubOpen ? 'active' : ''}`}
                            onClick={(e) => toggleSubMenu(index, e)}
                            style={{ cursor: 'pointer' }}
                          ></span>
                        )}

                        {/* Menu con: Ép hiển thị display: block khi ở mobile và được bấm mở */}
                        {hasSubMenu && (
                          <ul
                            className={`sub-menu ${isSubOpen ? 'show active' : ''}`}
                            style={isMobileMenuOpen && isSubOpen ? { display: 'block' } : undefined}
                          >
                            {item.subMenu.map((sub: any, subIndex: number) => (
                              <li key={subIndex}>
                                <Link
                                  to={normalizePath(sub.linkPage?.url)}
                                  target={sub.linkPage?.target || "_self"}
                                  className="nav-link"
                                  onClick={() => setIsMobileMenuOpen(false)} // Bấm vào link con thì tự đóng menu mobile
                                >
                                  {sub.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* KHỐI NÚT CHỨC NĂNG CHỈ CÓ TRÊN MOBILE */}
        <div className="only-mobile">
          <hr className="hr-custom" />
          <div className="bellow-header-inner d-flex align-items-center justify-content-between gap-2">

            {/* Render danh sách linh hoạt từ WP */}
            {headerMobileData && headerMobileData.map((item: any, index: number) => {
              const isSearch = item.title?.toLowerCase().includes("tìm kiếm");

              return (
                <div key={index} className={`icon-item ${isSearch ? 'btn-search-bw' : ''}`}>
                  <RenderMobileItem item={item} />
                </div>
              );
            })}

          </div>

          <div className={`m-search-bw ${isMobileSearchOpen ? 'active' : ''}`}>
            <form onSubmit={handleSearchSubmit}>
              <div className="r-item">
                <input type="text" name="s" placeholder="Tìm kiếm" />
                <button type="submit" className="btn-search"></button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </header>
  );
};

export default TopHeader;