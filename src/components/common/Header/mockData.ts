export const headerData = {
  logo: '/assets/images/logo.png',
  logoWhite: '/assets/images/emasi-logo-mark.png',
  // Thêm vào headerData trong mockData.ts
  languages: [
    { code: 'VI', name: 'Tiếng Việt', flag: '/assets/images/flag-vi.png', isCurrent: true },
    { code: 'EN', name: 'English', flag: '/assets/images/flag-us.png', isCurrent: false }
  ],
  topPanel: [
    {
      title: 'Tìm kiếm',
      icon: '/assets/images/icon-search.svg',
      link: '#',
      hasChild: true,
      showSearch: true
    },
    {
      title: 'Cơ sở',
      icon: '/assets/images/icon-location.svg',
      link: '/co-so',
      hasChild: false,
      showSearch: false
    }
  ],

  // Dữ liệu menu chi tiết như hình ảnh bạn cung cấp
  mainMenu: [
    {
      name: 'EMASI',
      url: '/emasi',
      childs: [
        { name: 'Hành trình EMASI', url: '/hanh-trinh' },
        { name: 'Tầm nhìn và Sứ mệnh', url: '/tam-nhin' },
        { name: 'Thông điệp từ Tổng Hiệu trưởng', url: '/thong-diep' },
        { name: 'Đội ngũ Lãnh đạo', url: '/doi-ngu-lanh-dao' },
        { name: 'Đội ngũ Sư phạm', url: '/doi-ngu-su-pham' },
        { name: 'Những điều học sinh EMASI đạt được', url: '/thanh-tuu' }
      ]
    },
    { name: 'Cơ sở', url: '/co-so', childs: [] },
    { name: 'Chương trình', url: '/chuong-trinh', childs: [] },
    { name: 'Học sinh', url: '/hoc-sinh', childs: [] },
    { name: 'Phụ huynh', url: '/phu-huynh', childs: [] },
    { name: 'Tuyển sinh', url: '/tuyen-sinh', childs: [] },
    { name: 'Liên hệ', url: '/lien-he', childs: [] }
  ],

  bottomPanel: [
    { title: 'Zalo', icon: '/assets/images/zalo.svg', link: '#' },
    { title: 'Facebook', icon: '/assets/images/facebook.svg', link: '#' }
  ]
};
// Thêm vào mockData.ts
export const leftPanelData = {
  topPanel: [
    {
      title: 'Tìm kiếm',
      icon: '/assets/images/icon-search-white.svg',
      iconHover: '/assets/images/icon-search-green.svg',
      link: '#',
      hasChild: true,
      showSearch: true,
      // Dữ liệu gợi ý tìm kiếm bên dưới ô input (từ PHP gốc)
      searchResults: [
        { text: 'Tuyển sinh 2026', url: '/tuyen-sinh' },
        { text: 'Học bổng Tài năng', url: '/hoc-bong' }
      ]
    },
    {
      title: 'Cơ sở',
      icon: '/assets/images/icon-location-white.svg',
      iconHover: '/assets/images/icon-location-green.svg',
      link: '/co-so',
      hasChild: false,
      showSearch: false
    }
  ],
  bottomPanel: [
    { title: 'Zalo', icon: '/assets/images/zalo.svg', iconHover: '/assets/images/zalo-hover.svg', link: '#' },
    { title: 'Facebook', icon: '/assets/images/facebook.svg', iconHover: '/assets/images/facebook-hover.svg', link: '#' }
  ]
};