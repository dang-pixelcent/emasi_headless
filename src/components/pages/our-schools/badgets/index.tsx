// import React from "react";
// import "./badgets.css";

// const items = [
//   {
//     title: "Sổ tay và Quy trình",
//     icon: "/assets/images/demo/our-schools/badgets/b-icon-1.svg",
//     link: "https://emasi.pixelcent.com/so-tay-quy-trinh/",
//   },
//   {
//     title: "Lịch năm học",
//     icon: "/assets/images/demo/our-schools/badgets/b-icon-2.svg",
//     link: "https://emasi.pixelcent.com/lich-nam-hoc/",
//   },
//   {
//     title: "Dịch vụ Học sinh",
//     icon: "/assets/images/demo/our-schools/badgets/b-icon-3.svg",
//     link: "https://emasi.pixelcent.com/dich-vu-hoc-sinh/",
//   },
//   {
//     title: "Cựu Học sinh",
//     icon: "/assets/images/demo/our-schools/badgets/b-icon-5.svg",
//     link: "https://emasi.pixelcent.com/cuu-hoc-sinh-emasi/",
//   },
//   {
//     title: "Đội ngũ Sư phạm",
//     icon: "/assets/images/demo/our-schools/badgets/b-icon-6.svg",
//     link: "https://emasi.pixelcent.com/doi-ngu-su-pham/",
//   },
// ];

// export default function Badgets() {
//   const total = items.length;

//   const cls = total > 6 ? "box8" : "flex-wrap";

//   return (
//     <section className="sc-badgets">
//       <div className="container-fluid pe-0 ps-90">
//         <div
//           className={`boxies d-flex ${cls} justify-content-center`}
//         >
//           {items.map((item, index) => {
//             const count = index + 1;

//             return (
//               <div
//                 key={count}
//                 className={`box box-${count}`}
//                 data-aos="fade-up"
//                 data-aos-delay={count * 150}
//               >
//                 <a
//                   href={item.link}
//                   className="d-flex flex-column h-100 justify-content-center align-items-center text-center"
//                 >
//                   {item.icon && (
//                     <img src={item.icon} alt={item.title} />
//                   )}
//                   <div className="title fw-light text-white">
//                     {item.title}
//                   </div>
//                 </a>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./badgets.css";

interface BadgetProps {
  data: {
    listItem: Array<{
      icon?: {
        node?: {
          sourceUrl?: string;
          altText?: string;
        };
      };
      title?: string;
      link?: {
        url?: string;
      };
    }>;
  };
}

export default function Badgets({ data }: BadgetProps) {
  // Nếu không có dữ liệu thì không render gì cả
  if (!data?.listItem || data.listItem.length === 0) return null;

  const items = data.listItem;
  const total = items.length;
  const cls = total > 6 ? "box8" : "flex-wrap";

  return (
    <section className="sc-badgets">
      <div className="container-fluid pe-0 ps-90">
        <div className={`boxies d-flex ${cls} justify-content-center`}>
          {items.map((item, index) => {
            const count = index + 1;
            // Lấy URL và Icon từ cấu trúc GraphQL
            const iconUrl = item.icon?.node?.sourceUrl;
            const linkUrl = item.link?.url || "#";
            const title = item.title || "Untitled";

            return (
              <div
                key={count}
                className={`box box-${count}`}
                data-aos="fade-up"
                data-aos-delay={count * 150}
              >
                <a
                  href={linkUrl}
                  className="d-flex flex-column h-100 justify-content-center align-items-center text-center"
                >
                  {iconUrl && (
                    <img src={iconUrl} alt={item.icon?.node?.altText || title} />
                  )}
                  <div className="title fw-light text-white">
                    {title}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}