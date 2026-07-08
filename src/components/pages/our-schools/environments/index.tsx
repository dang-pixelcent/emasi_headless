// import React from "react";
// import "./environments.css";

// const environmentItems = [
//   {
//     title: "Bảo chứng chất lượng",
//     color: "bed62f",
//     desc: "bởi Tổ chức Kiểm định giáo dục danh giá",
//     image:
//       "/assets/images/demo/our-schools/environments/wascLOGO_FullyAccredited_WHITE.png",
//     link: "https://emasi.pixelcent.com/kiem-dinh-quoc-te-wasc-toan-phan/",
//   },
//   {
//     title: "Trường Quốc tế Cambridge",
//     color: "ffffff",
//     desc: "Thành viên Tổ chức Giáo dục Quốc tế uy tín toàn cầu",
//     image:
//       "/assets/images/demo/our-schools/environments/logo-cambridge-1.png",
//     link: "https://emasi.pixelcent.com/chuong-trinh-cambridge/",
//   },
//   {
//     title: "Triết lý <br/> giáo dục",
//     color: "bed62f",
//     desc:
//       "phát triển toàn diện về phẩm chất – tri thức – thể chất và tinh thần – năng lực",
//   },
//   {
//     title: "Tích hợp <br/> Nghệ thuật <br/> vào Giáo dục",
//     color: "ffffff",
//     desc: "phối hợp độc quyền cùng Tổ chức Nguyen Art Foundation",
//     image:
//       "/assets/images/demo/our-schools/environments/NguyenArtFoundation_NewLogo_White-2-1-e1747124235542.png",
//     link: "http://nguyenartfoundation.com",
//   },
//   {
//     title: "Chương trình <br/> Song ngữ <br/> tích hợp",
//     color: "ffffff",
//     desc: "với hai lộ trình học tập",
//   },
//   {
//     title: "Đội ngũ <br/> Sư phạm",
//     color: "5bcbf5",
//     desc: "giàu chuyên môn, kinh nghiệm và tâm huyết",
//   },
//   {
//     title: "Cộng đồng trường",
//     color: "ffffff",
//     desc: "gắn kết sâu sắc và giàu lòng tự hào",
//   },
//   {
//     title: "Cơ sở <br/> Vật chất",
//     color: "5bcbf5",
//     desc: "ưu việt tạo <br/> trải nghiệm <br/> vượt trội",
//   },
// ];

// export default function Environments() {
//   return (
//     <section
//       className="sc-environments"
//       style={{ backgroundColor: "#00364c" }}
//     >
//       <div className="inner-container">
//         <div className="environments">
//           <div className="sub-title fw-300 text-uppercase text-center" data-aos="fade-down">
//             CHỌN EMASI
//           </div>

//           <h2 className="h2-title fw-bold text-white text-center" data-aos="fade-down">
//             CHỌN MÔI TRƯỜNG PHÁT TRIỂN TOÀN DIỆN CHO CON
//           </h2>

//           <div className="lists d-flex flex-wrap" data-aos="fade-down" data-aos-delay="150">
//             {environmentItems.map((item, index) => {
//               const Tag = item.link ? "a" : "div";

//               return (
//                 <Tag
//                   key={index}
//                   className="item"
//                   {...(item.link
//                     ? {
//                         href: item.link,
//                         target: "_self",
//                       }
//                     : {})}
//                 >
//                   <div className="bg-overlay" />

//                   <h3
//                     className={`h3-title fw-bold mb-0 color-${item.color}`}
//                     dangerouslySetInnerHTML={{
//                       __html: item.title,
//                     }}
//                   />

//                   <div className="desc fw-300 text-white">
//                     <p
//                       dangerouslySetInnerHTML={{
//                         __html: item.desc,
//                       }}
//                     />

//                     {item.image && (
//                       <img src={item.image} alt={item.title.replace(/<[^>]+>/g, "")} />
//                     )}
//                   </div>
//                 </Tag>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./environments.css";
import { useStoreContext } from "@/context/StoreContext";
// 1. Định nghĩa Interface khớp với GraphQL Schema của EnviromentLayout
interface EnvironmentsProps {
  data?: {
    subTitle?: string;
    title?: string;
    list?: Array<{
      title?: string;
      colorTitle?: string; // Khai báo field màu sắc (nhớ thêm field này vào GraphQL query nhé)
      desc?: string;
      image?: {
        node?: {
          sourceUrl?: string;
        };
      };
      link?: {
        url?: string;
      };
    }>;
  };
}
const colorPalette = ["ffffff", "bed62f", "5bcbf5"];
export default function Environments({ data }: EnvironmentsProps) {
  // Nếu không có dữ liệu thì không render gì cả
  if (!data) return null;
  const { normalizePath } = useStoreContext();
  const items = data.list || [];

  return (
    <section
      className="sc-environments"
      style={{ backgroundColor: "#00364c" }}
    >
      <div className="inner-container">
        <div className="environments">
          
          {/* SUB TITLE */}
          {data.subTitle && (
            <div className="sub-title fw-300 text-uppercase text-center" data-aos="fade-down">
              {data.subTitle}
            </div>
          )}

          {/* MAIN TITLE */}
          {data.title && (
            <h2 className="h2-title fw-bold text-white text-center" data-aos="fade-down">
              {data.title}
            </h2>
          )}

          {/* LIST ITEMS */}
          {items.length > 0 && (
            <div className="lists d-flex flex-wrap" data-aos="fade-down" data-aos-delay="150">
              {items.map((item, index) => {
                const itemLink = item.link?.url;
                const Tag = itemLink ? "a" : "div";
                const imgUrl = item.image?.node?.sourceUrl;

                // Xử lý class màu sắc: lấy màu từ ACF, nếu không có tự động fallback về màu trắng ffffff
                // (Hãy chắc chắn trong mục Choices của ACF Radio Button bạn điền "ffffff", "bed62f", "5bcbf5")
                const colorCode = item.colorTitle || colorPalette[index % colorPalette.length];
                return (
                  <Tag
                    key={index}
                    className="item"
                    {...(itemLink
                      ? {
                          href: normalizePath(itemLink),
                          target: "_self",
                        }
                      : {})}
                  >
                    <div className="bg-overlay" />

                    {/* TITLE CỦA ITEM */}
                    {item.title && (
                      <h3
                        className={`h3-title fw-bold mb-0 color-${colorCode}`}
                        dangerouslySetInnerHTML={{
                          __html: item.title,
                        }}
                      />
                    )}

                    {/* DESCRIPTION & IMAGE */}
                    <div className="desc fw-300 text-white">
                      {item.desc && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.desc,
                          }}
                        />
                      )}

                      {imgUrl && (
                        <img 
                          src={imgUrl} 
                          alt={item.title ? item.title.replace(/<[^>]+>/g, "") : "environment image"} 
                        />
                      )}
                    </div>
                  </Tag>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}