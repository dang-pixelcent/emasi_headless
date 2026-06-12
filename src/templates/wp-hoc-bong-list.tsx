import React, { useEffect } from 'react';

// 1. Import Layout và các component Section
import Layout from '../components/common/Layout';
import BannerPlus from '../components/pages/sections/banner_plus';
// Giả định bạn đã tạo component MainContentPlus và DiscoverMore
import MainContentPlus from '../components/pages/sections/main_content_plus'; 
import DiscoverMore from '../components/pages/sections/discover_more';

const HocBongTaiNangTemplate: React.FC = () => {

  // 2. Chuyển đổi đoạn <script> của WP thành useEffect của React
  useEffect(() => {
    // Tìm element chứa menu
    const widgetNav = document.querySelector('.widget .menu');
    if (!widgetNav) return; // Nếu không có thì thoát luôn, tránh lỗi

    const menuItems = widgetNav.querySelectorAll('li.menu-item-has-children');

    // Hàm xử lý sự kiện click
    const handleToggle = (e: Event) => {
      // Dùng currentTarget để lấy chính thẻ <li> được gắn sự kiện
      const currentElement = e.currentTarget as HTMLElement;
      currentElement.classList.toggle('active');
    };

    menuItems.forEach((element) => {
      const ulSub = element.querySelector('.sub-menu');

      // Quan trọng: Kiểm tra xem icon đã tồn tại chưa để tránh bị thêm trùng (duplicate) 
      // khi React re-render (đặc biệt trong chế độ StrictMode)
      if (!element.querySelector('.icon-toggle')) {
        const elToggleIcon = document.createElement("span");
        elToggleIcon.classList.add('icon-toggle');
        
        if (ulSub) {
          element.insertBefore(elToggleIcon, ulSub);
        } else {
          element.appendChild(elToggleIcon);
        }
      }

      // Gắn sự kiện
      element.addEventListener('click', handleToggle);
    });

    // Clean-up function: Gỡ bỏ event listener khi chuyển sang trang khác
    // Đây là bước bắt buộc trong React để tránh rò rỉ bộ nhớ (memory leak)
    return () => {
      menuItems.forEach((element) => {
        element.removeEventListener('click', handleToggle);
      });
    };
  }, []); // Mảng rỗng [] giúp script chỉ chạy 1 lần duy nhất sau khi mount

  return (
    <>
      {/* Tương đương: get_template_part('.../banner-plus') */}
      <BannerPlus />
      
      {/* Tương đương: get_template_part('.../main-content-plus') */}
      <MainContentPlus />
      
      {/* Tương đương: get_template_part('.../discover_more') */}
      <DiscoverMore />
    </>
  );
};

export default HocBongTaiNangTemplate;