
// import React from "react";
// import './sidebar.css';

// // 1. Dữ liệu Menu tĩnh (Cố định)
// const menuItems = [
//   { title: "Tổng quan Chương trình", link: "/tong-quan-chuong-trinh/" },
//   { title: "Phổ thông Cambridge", link: "/chuong-trinh-cambridge/" },
//   { title: "Kiểm định chất lượng giáo dục từ WASC", link: "/kiem-dinh-quoc-te-wasc-toan-phan/" },
//   { title: "Các Câu hỏi thường gặp", link: "/cac-cau-hoi-thuong-gap/" },
//   { title: "Năng lực đầu ra", link: "/ket-qua-hoc-tap/" },
// ];

// // 2. Định nghĩa Interface
// export interface SidebarItem {
//   image?: { node: { sourceUrl: string; altText?: string } } | null;
//   title?: string;
//   desc?: string;
//   link?: { url: string; title?: string; target?: string } | null;
// }

// export interface SidebarProps {
//   data?: {
//     __typename?: string;
//     list?: SidebarItem[]; 
//   };
// }

// export default function Sidebar({ data }: SidebarProps) {
//   const sidebarList = data?.list || [];

//   return (
//     <aside className="sidebar-right h-100">
//       {/* Logo Desktop & Mobile (Giữ nguyên) */}
//       <div className="widget">
//         <figure className="wp-block-image size-full is-resized logo-desktop">
//           <img src="/assets/images/demo/sections/sidebar/EMASI-LOGO-vuong.png" alt="EMASI" />
//         </figure>
//       </div>
      
//       <div className="widget">
//         <figure className="wp-block-image size-full logo-mobile">
//           <a href="/"><img src="/assets/images/demo/sections/sidebar/mobile_logo.png" alt="EMASI" /></a>
//         </figure>
//       </div>

//       {/* --- MENU CỐ ĐỊNH (Map từ menuItems) --- */}
//       <div className="widget">
//         <div className="menu-sidebar-menu-vi-container">
//           <ul id="menu-sidebar-menu-vi" className="menu">
//             {menuItems.map((item, index) => (
//               <li key={index} className="menu-item menu-item-type-post_type menu-item-object-page">
//                 <a href={item.link}>{item.title}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* --- DỮ LIỆU ĐỘNG TỪ WORDPRESS (Related News) --- */}
//       {sidebarList.length > 0 && (
//         <div className="widget widget-related-news">
//           {sidebarList.map((item, index) => {
//             const imageUrl = item.image?.node?.sourceUrl;
//             const linkUrl = item.link?.url || "#";
//             const title = item.title || "";

//             return (
//               <div className="item" key={index}>
//                 {imageUrl && (
//                   <figure>
//                     <a href={linkUrl}>
//                       <img src={imageUrl} alt={item.image?.node?.altText || title} />
//                     </a>
//                   </figure>
//                 )}

//                 <div className="content text-white">
//                   <h3 className="h3-title f-ibmplexsans fw-normal mb-0">
//                     <a title={title} className="line-clamp-2" href={linkUrl}>
//                       {title}
//                     </a>
//                   </h3>
//                   {item.desc && (
//                     <div className="desc f-ibmplexsans fw-normal mt-2 text-sm text-gray-300">
//                       {item.desc}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </aside>
//   );
// }
import React from "react";
import './sidebar.css';
import { useStoreContext } from "@/context/StoreContext";
// 1. Dữ liệu Menu tĩnh (Phân tách Đa ngôn ngữ)
const staticMenus = {
  vi: [
    { title: "Tổng quan Chương trình", link: "/tong-quan-chuong-trinh/" },
    { title: "Phổ thông Cambridge", link: "/chuong-trinh-cambridge/" },
    { title: "Kiểm định chất lượng giáo dục từ WASC", link: "/kiem-dinh-quoc-te-wasc-toan-phan/" },
    { title: "Các Câu hỏi thường gặp", link: "/cac-cau-hoi-thuong-gap/" },
    { title: "Năng lực đầu ra", link: "/ket-qua-hoc-tap/" },
  ],
  en: [
    // Tự động thêm /en/ vào link và đổi tiêu đề tiếng Anh
    { title: "Program Overview", link: "/en/tong-quan-chuong-trinh/" },
    { title: "Cambridge Curriculum", link: "/en/chuong-trinh-cambridge/" },
    { title: "WASC Accreditation", link: "/en/kiem-dinh-quoc-te-wasc-toan-phan/" },
    { title: "Frequently Asked Questions", link: "/en/cac-cau-hoi-thuong-gap/" },
    { title: "Learning Outcomes", link: "/en/ket-qua-hoc-tap/" },
  ]
};

// 2. Định nghĩa Interface
export interface SidebarItem {
  image?: { node: { sourceUrl: string; altText?: string } } | null;
  title?: string;
  desc?: string;
  link?: { url: string; title?: string; target?: string } | null;
}

export interface SidebarProps {
  data?: {
    __typename?: string;
    list?: SidebarItem[]; 
  };
  lang?: string; // Nhận thêm biến lang từ WPPage
}

export default function Sidebar({ data, lang = 'vi' }: SidebarProps) {
  const { normalizePath } = useStoreContext();
  const sidebarList = data?.list || [];
  
  // Xác định lấy mảng menu nào dựa vào lang
  const currentMenu = lang === 'en' ? staticMenus.en : staticMenus.vi;

  return (
    <aside className="sidebar-right h-100">
      {/* Logo Desktop & Mobile */}
      <div className="widget">
        <figure className="wp-block-image size-full is-resized logo-desktop">
          <img src="/assets/images/demo/sections/sidebar/EMASI-LOGO-vuong.png" alt="EMASI" />
        </figure>
      </div>
      
      <div className="widget">
        <figure className="wp-block-image size-full logo-mobile">
          <a href="/"><img src="/assets/images/demo/sections/sidebar/mobile_logo.png" alt="EMASI" /></a>
        </figure>
      </div>

      {/* --- MENU CỐ ĐỊNH (Đã tự động lấy đúng ngôn ngữ) --- */}
      <div className="widget">
        <div className="menu-sidebar-menu-vi-container">
          <ul id="menu-sidebar-menu-vi" className="menu">
            {currentMenu.map((item, index) => (
              <li key={index} className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href={normalizePath(item.link)}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- DỮ LIỆU ĐỘNG TỪ WORDPRESS (Related News) --- */}
      {sidebarList.length > 0 && (
        <div className="widget widget-related-news">
          {sidebarList.map((item, index) => {
            const imageUrl = item.image?.node?.sourceUrl;
            const linkUrl = item.link?.url || "#";
            const title = item.title || "";

            return (
              <div className="item" key={index}>
                {imageUrl && (
                  <figure>
                    <a href={normalizePath(linkUrl)}>
                      <img src={imageUrl} alt={item.image?.node?.altText || title} />
                    </a>
                  </figure>
                )}

                <div className="content text-white">
                  <h3 className="h3-title f-ibmplexsans fw-normal mb-0">
                    <a title={title} className="line-clamp-2" href={normalizePath(linkUrl)}>
                      {title}
                    </a>
                  </h3>
                  {item.desc && (
                    <div className="desc f-ibmplexsans fw-normal mt-2 text-sm text-gray-300">
                      {item.desc}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
}