// import React from "react";
// import './sidebar.css';

// const relatedNews = [
//   {
//     title: "Lịch năm học",
//     image:
//       "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG1179-2-scaled.jpg",
//     link: "https://emasi.pixelcent.com/lich-nam-hoc/",
//   },
//   {
//     title: "Tin tức và Sự kiện",
//     image:
//       "https://emasi.pixelcent.com/wp-content/uploads/2025/05/DSC00115-1-scaled.jpg",
//     link: "https://emasi.pixelcent.com/tin-tuc-va-su-kien/",
//   },
// ];

// const menuItems = [
//   {
//     title: "Tổng quan Chương trình",
//     link: "https://emasi.pixelcent.com/tong-quan-chuong-trinh/",
//   },
//   {
//     title: "Phổ thông Cambridge",
//     link: "https://emasi.pixelcent.com/chuong-trinh-cambridge/",
//   },
//   {
//     title: "Kiểm định chất lượng giáo dục từ WASC",
//     link: "https://emasi.pixelcent.com/kiem-dinh-quoc-te-wasc-toan-phan/",
//   },
//   {
//     title: "Các Câu hỏi thường gặp",
//     link: "https://emasi.pixelcent.com/cac-cau-hoi-thuong-gap/",
//   },
//   {
//     title: "Năng lực đầu ra",
//     link: "https://emasi.pixelcent.com/ket-qua-hoc-tap/",
//   },
// ];

// export default function Sidebar() {
//   return (
//     <aside className="sidebar-right">
//       {/* Logo Desktop */}
//       <div className="widget">
//         <figure className="wp-block-image size-full is-resized logo-desktop">
//           <img
//             src="/assets/images/demo/sections/sidebar/EMASI-LOGO-vuong.png"
//             alt="EMASI"
//           />
//         </figure>
//       </div>

//       {/* Logo Mobile */}
//       <div className="widget">
//         <figure className="wp-block-image size-full logo-mobile">
//           <a href="/">
//             <img
//               src="/assets/images/demo/sections/sidebar/mobile_logo.png"
//               alt="EMASI"
//             />
//           </a>
//         </figure>
//       </div>

//       {/* Menu */}
//       <div className="widget">
//         <div className="menu-sidebar-menu-vi-container">
//           <ul id="menu-sidebar-menu-vi" className="menu">
//             {menuItems.map((item, index) => (
//               <li
//                 key={index}
//                 className="menu-item menu-item-type-post_type menu-item-object-page"
//               >
//                 <a href={item.link}>{item.title}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Related News */}
//       <div className="widget widget-related-news">
//         {relatedNews.map((item, index) => (
//           <div className="item" key={index}>
//             <figure>
//               <a href={item.link}>
//                 <img src={item.image} alt={item.title} />
//               </a>
//             </figure>

//             <div className="content text-white">
//               <h3 className="h3-title f-ibmplexsans fw-normal mb-0">
//                 <a
//                   title={item.title}
//                   className="line-clamp-2"
//                   href={item.link}
//                 >
//                   {item.title}
//                 </a>
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// // }
// import React from "react";
// import './sidebar.css';

// // 1. Định nghĩa Interface (giống với cấu trúc dữ liệu GraphQL trả về)
// export interface SidebarItem {
//   image?: { node: { sourceUrl: string; altText?: string } } | null;
//   title?: string;
//   desc?: string;
//   link?: { url: string; title?: string; target?: string } | null;
// }

// export interface SidebarProps {
//   data?: {
//     __typename?: string;
//     list?: SidebarItem[]; // 'list' là tên field trong GraphQL
//   };
// }

// export default function Sidebar({ data }: SidebarProps) {
//   // Lấy danh sách từ dữ liệu, nếu không có thì để mảng rỗng
//   const sidebarList = data?.list || [];

//   return (
//     <aside className="sidebar-right h-100">
//       {/* --- Phần Logo và Menu tĩnh (giữ nguyên) --- */}
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

//       <div className="widget">
//         <div className="menu-sidebar-menu-vi-container">
//           <ul id="menu-sidebar-menu-vi" className="menu">
//             {/* Bạn có thể map menuItems tương tự nếu cần */}
//           </ul>
//         </div>
//       </div>

//       {/* --- PHẦN DỮ LIỆU ĐỘNG (Related News) --- */}
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
//                   {/* Nếu có Desc thì hiển thị thêm ở đây */}
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

// 1. Dữ liệu Menu tĩnh (Cố định)
const menuItems = [
  { title: "Tổng quan Chương trình", link: "/tong-quan-chuong-trinh/" },
  { title: "Phổ thông Cambridge", link: "/chuong-trinh-cambridge/" },
  { title: "Kiểm định chất lượng giáo dục từ WASC", link: "/kiem-dinh-quoc-te-wasc-toan-phan/" },
  { title: "Các Câu hỏi thường gặp", link: "/cac-cau-hoi-thuong-gap/" },
  { title: "Năng lực đầu ra", link: "/ket-qua-hoc-tap/" },
];

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
}

export default function Sidebar({ data }: SidebarProps) {
  const sidebarList = data?.list || [];

  return (
    <aside className="sidebar-right h-100">
      {/* Logo Desktop & Mobile (Giữ nguyên) */}
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

      {/* --- MENU CỐ ĐỊNH (Map từ menuItems) --- */}
      <div className="widget">
        <div className="menu-sidebar-menu-vi-container">
          <ul id="menu-sidebar-menu-vi" className="menu">
            {menuItems.map((item, index) => (
              <li key={index} className="menu-item menu-item-type-post_type menu-item-object-page">
                <a href={item.link}>{item.title}</a>
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
                    <a href={linkUrl}>
                      <img src={imageUrl} alt={item.image?.node?.altText || title} />
                    </a>
                  </figure>
                )}

                <div className="content text-white">
                  <h3 className="h3-title f-ibmplexsans fw-normal mb-0">
                    <a title={title} className="line-clamp-2" href={linkUrl}>
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