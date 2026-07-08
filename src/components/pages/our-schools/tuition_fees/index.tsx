// import React from "react";
// import "./tuition_fees.css";

// export default function Fees() {
//   return (
//     <section
//       className="sc-fees"
//       style={{
//         background:
//           "no-repeat center/cover url('https://emasi.pixelcent.com/wp-content/uploads/2025/03/our-schools-banner.jpg')",
//       }}
//     >
//       <div className="inner-container">
//         <div className="sc-header">
//           <h2
//             data-aos="fade-down"
//             className="h2-title fw-light text-white text-center"
//           >
//             HỌC PHÍ <strong>&amp; ƯU ĐÃI</strong>
//           </h2>
//         </div>

//         <div
//           className="list"
//           data-aos="fade-up"
//         >
//           <img
//             src="/assets/images/demo/our-schools/tuition_fees/fee-img.jpg"
//             alt="Học phí"
//           />

//           <img
//             src="/assets/images/demo/our-schools/tuition_fees/hb.jpg"
//             alt="Học bổng"
//           />
//         </div>

//         <div
//           data-aos="fade-up"
//           className="sc-btn d-flex justify-content-center"
//         >
//           <a
//             href="https://emasi.pixelcent.com/hoc-phi/"
//             className="btn-bg bg-icon bg-white"
//             target="_self"
//           >
//             <span>Tư vấn Học phí</span>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./tuition_fees.css";
import { useStoreContext } from "@/context/StoreContext";
interface TuitionFeeProps {
  data?: {
    title?: string;
    backgoundImage?: {
      node?: {
        sourceUrl?: string;
      };
    };
    listImage?: Array<{
      image?: {
        node?: {
          sourceUrl?: string;
        };
      };
    }>;
    button?: {
      url?: string;
      target?: string;
      title?: string;
    };
  };
}

export default function Fees({ data }: TuitionFeeProps) {
  if (!data) return null;
  const { normalizePath } = useStoreContext();

  const bgUrl = data.backgoundImage?.node?.sourceUrl;
  const images = data.listImage || [];
  const btn = data.button;

  return (
    <section
      className="sc-fees"
      style={{
        background: bgUrl ? `no-repeat center/cover url('${bgUrl}')` : "#00364c",
      }}
    >
      <div className="inner-container">
        {/* HEADER */}
        <div className="sc-header">
          {data.title && (
            <h2
              data-aos="fade-down"
              className="h2-title fw-light text-white text-center"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          )}
        </div>

        {/* DANH SÁCH HÌNH ẢNH */}
        {images.length > 0 && (
          <div className="list" data-aos="fade-up">
            {images.map((item, index) => {
              const imgUrl = item.image?.node?.sourceUrl;
              return imgUrl ? (
                <img
                  key={index}
                  src={imgUrl}
                  alt={data.title ? data.title.replace(/<[^>]+>/g, '') : "Tuition Fee"}
                />
              ) : null;
            })}
          </div>
        )}

        {/* NÚT TƯ VẤN (Dùng dữ liệu từ GraphQL) */}
        {btn?.url && (
          <div data-aos="fade-up" className="sc-btn d-flex justify-content-center">
            <a
              href={normalizePath(btn.url)}
              className="btn-bg bg-icon bg-white"
              target={btn.target || "_self"}
            >
              <span>{btn.title || "Tư vấn Học phí"}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}