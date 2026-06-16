import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import './TopHeader.css';

const TopHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Danh sách các ngôn ngữ có trong web
  const LANGUAGES = [
    { code: 'vi', label: 'VI', flag: '/assets/images/flag-vi.png' }, // Đã đổi lại tên file cờ theo list bạn gửi
    { code: 'en', label: 'EN', flag: '/assets/images/flag-us.png' },
  ];

  // Mặc định ngôn ngữ ban đầu là tiếng Việt
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);

  // Hàm xử lý khi người dùng click chọn ngôn ngữ
  const handleSelectLang = (lang: any, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentLang(lang);
    setIsLangOpen(false);
  };

  // Bắt sự kiện cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id="header" className={`sticky-header d-flex align-items-center ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="inner-container">
        <div className="primary-header-inner d-flex align-items-center justify-content-between">
          
          {/* KHỐI LOGO */}
          <div className="logo">
            <Link to="/">
              <img className="only-desktop" src="/assets/images/EMASI-LOGO-GRADIENT.png" alt="EMASI" />
              <img className="only-mobile" src="/assets/images/logo-footer.svg" alt="EMASI" />
            </Link>
          </div>

          {/* KHỐI MENU VÀ NGÔN NGỮ */}
          <div className="header-nav d-flex flex-column align-items-end">
            
            {/* Bộ chuyển đổi ngôn ngữ */}
            <div className="language" onMouseLeave={() => setIsLangOpen(false)}>
              
              <div className="current-lang" onClick={() => setIsLangOpen(!isLangOpen)}>
                <a className="lang-text d-flex align-items-center" style={{ gap: '3px', cursor: 'pointer' }}>
                  <img src={currentLang.flag} alt={currentLang.label} style={{ width: '16px' }} />
                  {currentLang.label}
                  <img
                    src="/assets/images/arrow-down.svg"
                    alt="arrow"
                    className="lang-icon"
                    style={{
                      width: '15px',
                      marginLeft: '2px',
                      transition: 'transform 0.3s',
                      transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  />
                </a>
              </div>

              <div className={`lang-lists ${isLangOpen ? 'active' : ''}`}>
                {LANGUAGES.filter(lang => lang.code !== currentLang.code).map((lang) => (
                  <a
                    key={lang.code}
                    href="#"
                    onClick={(e) => handleSelectLang(lang, e)}
                    className="d-flex align-items-center"
                    style={{ gap: '5px', cursor: 'pointer', padding: '5px' }}
                  >
                    <img src={lang.flag} alt={lang.label} style={{ width: '16px' }} />
                    {lang.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Navbar Chính */}
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
                  <form action="/">
                    <div className="r-item">
                      <input type="text" name="s" placeholder="Tìm kiếm" />
                      <button type="submit" className="btn-search"></button>
                    </div>
                  </form>
                </div>

                <ul className="nav">
                  <li><Link to="/emasi" className="nav-link"><span>EMASI</span></Link></li>
                  <li><Link to="/co-so" className="nav-link"><span>Cơ sở</span></Link></li>
                  <li><Link to="/chuong-trinh" className="nav-link"><span>Chương trình</span></Link></li>
                  <li><Link to="/hoc-sinh" className="nav-link"><span>Học sinh</span></Link></li>
                  <li><Link to="/phu-huynh" className="nav-link"><span>Phụ huynh</span></Link></li>
                  <li><Link to="/tuyen-sinh" className="nav-link"><span>Tuyển sinh</span></Link></li>
                  <li><Link to="/lien-he" className="nav-link"><span>Liên hệ</span></Link></li>
                </ul>

              </div>
            </nav>
          </div>
        </div>

        {/* KHỐI NÚT CHỨC NĂNG CHỈ CÓ TRÊN MOBILE */}
        <div className="only-mobile">
          <hr className="hr-custom" />
          <div className="bellow-header-inner d-flex align-items-center justify-content-between gap-2">
            
            <div className="icon-item btn-search-bw" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
              <img src="/assets/images/icon-s.svg" alt="Search" />
              <span>TÌM KIẾM</span>
            </div>

            <div className="icon-item">
              <a href="/co-so" className="d-flex align-items-center" style={{ gap: '0.6vw' }}>
                <img src="/assets/images/icon-location.svg" alt="Cơ sở" />
                <span>CƠ SỞ</span>
              </a>
            </div>

            <div className="icon-item">
              <a href="https://zalo.me" target="_blank" rel="noreferrer" className="d-flex align-items-center" style={{ gap: '0.6vw' }}>
                <img src="/assets/images/icon-zl.svg" alt="Zalo" />
                <span>ZALO</span>
              </a>
            </div>

            <div className="icon-item">
              <a href="https://m.me" target="_blank" rel="noreferrer" className="d-flex align-items-center" style={{ gap: '0.6vw' }}>
                <img src="/assets/images/icon-messenger.svg" alt="Messenger" />
                <span>MESSENGER</span>
              </a>
            </div>

            <div className="icon-item">
              <a href="/tham-quan" className="d-flex align-items-center" style={{ gap: '0.6vw' }}>
                <img src="/assets/images/icon-thamquan.svg" alt="Tham quan" />
                <span>THAM QUAN</span>
              </a>
            </div>

          </div>

          <div className={`m-search-bw ${isMobileSearchOpen ? 'active' : ''}`}>
            <form action="/">
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