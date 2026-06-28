// import React from "react";
// import Sidebar from "../sidebar";
// import ListHocBong from "../list_hoc_bong";
// import ListTaiNang from "../list_tai_nang";
// import Careers from "../careers";
// import "./main_content_plus.css";

// const pageData = {
//   title: "Học bổng",
//   breadcrumb: {
//     title: "Học bổng",
//     slug: "/hoc-bong/",
//   },
//   // content: (),
// };

// export default function MainContentPlus() {
//   return (
//     <section className="sc-main-content">
//       <div className="inner-container">
//         <div className="page-content d-flex flex-wrap">
//           <div className="header-content">
//             <div className="breadcrumb text-uppercase">
//               <a href="/" target="_self">
//                 Trang chủ
//               </a>

//               <span>-</span>

//               <a href={pageData.breadcrumb.slug} target="_self">
//                 {pageData.breadcrumb.title}
//               </a>
//             </div>
//           </div>

//           <div className="main-content">
//             <h1
//               style={{
//                 fontWeight: 700,
//                 color: "#003e58",
//               }}
//             >
//               {pageData.title}
//             </h1>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


import React from "react";
// import Sidebar from "../sidebar"; // (Mở lại nếu bạn cần)
// import ListHocBong from "../list_hoc_bong";
// import ListTaiNang from "../list_tai_nang";
// import Careers from "../careers";
import "./main_content_plus.css";

// Khai báo kiểu dữ liệu cho props
interface MainContentPlusProps {
  data: {
    title: string;
    uri: string;
  };
  children?: React.ReactNode;
}

export default function MainContentPlus({ data, children }: MainContentPlusProps) {
  return (
    <section className="sc-main-content">
      <div className="inner-container">
        <div className="page-content d-flex flex-wrap">
          
          <div className="header-content">
            <div className="breadcrumb text-uppercase">
              <a href="/" target="_self">
                Trang chủ
              </a>
              <span>-</span>
              <a href={data.uri} target="_self">
                {data.title}
              </a>
            </div>
          </div>

          <div className="main-content">
            {/* Giữ lại thẻ h1 làm tiêu đề trang */}
            <h1 style={{ fontWeight: 700, color: "#003e58"}}>
              {data.title}
            </h1>
            
            {/* TRÚT TRỰC TIẾP HTML TỪ WORDPRESS VÀO ĐÂY */}
            {/* Vì CSS của bạn viết là .main-content p, .main-content blockquote...
                nên bất cứ thẻ nào WP sinh ra nằm trong đây đều sẽ nhận đúng CSS */}
            <div className="wp-editor-content">
              {children}
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}