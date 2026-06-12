import React from "react";
import './sidebar.css';

const relatedNews = [
  {
    title: "Lịch năm học",
    image:
      "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG1179-2-scaled.jpg",
    link: "https://emasi.pixelcent.com/lich-nam-hoc/",
  },
  {
    title: "Tin tức và Sự kiện",
    image:
      "https://emasi.pixelcent.com/wp-content/uploads/2025/05/DSC00115-1-scaled.jpg",
    link: "https://emasi.pixelcent.com/tin-tuc-va-su-kien/",
  },
];

const menuItems = [
  {
    title: "Tổng quan Chương trình",
    link: "https://emasi.pixelcent.com/tong-quan-chuong-trinh/",
  },
  {
    title: "Phổ thông Cambridge",
    link: "https://emasi.pixelcent.com/chuong-trinh-cambridge/",
  },
  {
    title: "Kiểm định chất lượng giáo dục từ WASC",
    link: "https://emasi.pixelcent.com/kiem-dinh-quoc-te-wasc-toan-phan/",
  },
  {
    title: "Các Câu hỏi thường gặp",
    link: "https://emasi.pixelcent.com/cac-cau-hoi-thuong-gap/",
  },
  {
    title: "Năng lực đầu ra",
    link: "https://emasi.pixelcent.com/ket-qua-hoc-tap/",
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar-right">
      {/* Logo Desktop */}
      <div className="widget">
        <figure className="wp-block-image size-full is-resized logo-desktop">
          <img
            src="/assets/images/demo/sections/sidebar/EMASI-LOGO-vuong.png"
            alt="EMASI"
          />
        </figure>
      </div>

      {/* Logo Mobile */}
      <div className="widget">
        <figure className="wp-block-image size-full logo-mobile">
          <a href="/">
            <img
              src="/assets/images/demo/sections/sidebar/mobile_logo.png"
              alt="EMASI"
            />
          </a>
        </figure>
      </div>

      {/* Menu */}
      <div className="widget">
        <div className="menu-sidebar-menu-vi-container">
          <ul id="menu-sidebar-menu-vi" className="menu">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="menu-item menu-item-type-post_type menu-item-object-page"
              >
                <a href={item.link}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related News */}
      <div className="widget widget-related-news">
        {relatedNews.map((item, index) => (
          <div className="item" key={index}>
            <figure>
              <a href={item.link}>
                <img src={item.image} alt={item.title} />
              </a>
            </figure>

            <div className="content text-white">
              <h3 className="h3-title f-ibmplexsans fw-normal mb-0">
                <a
                  title={item.title}
                  className="line-clamp-2"
                  href={item.link}
                >
                  {item.title}
                </a>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}