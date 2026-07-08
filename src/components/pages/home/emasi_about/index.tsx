// import React from "react";
// import "./emasi_about.css";
// import { useStoreContext } from "@/context/StoreContext";
// export default function EmasiAbout() {
//     const { normalizePath } = useStoreContext();
//     return (
//         <section className="sc-about-emasi pt-0 m-px">
//             <div className="inner-container">
//                 <div className="d-flex flex-wrap justify-content-between">
//                     <div
//                         className="col-left"
//                         data-aos="fade-right"
//                     >
//                         <img
//                             className="ab-img-left"
//                             data-aos="fade-down"
//                             src="/assets/images/demo/image-colors.png"
//                             alt="EMASI"
//                         />

//                         <h2 className="h2-title fs-72 color-004d6c fw-bold">
//                             EMASI
//                         </h2>

//                         <div className="sub-title fs-46 fw-bold color-004d6c">
//                             Khởi đầu của thế hệ
//                             <br />
//                             học sinh toàn diện
//                         </div>

//                         <div className="sep"></div>
//                     </div>

//                     <div
//                         className="col-right"
//                         data-aos="fade-left"
//                         data-aos-delay="150"
//                     >
//                         <img
//                             className="ab-img-right"
//                             data-aos="fade-down"
//                             data-aos-delay="150"
//                             src="/assets/images/demo/image-colors.png"
//                             alt="EMASI"
//                         />

//                         <div className="desc fw-300">
//                                 Trường Quốc tế Song ngữ EMASI tiên phong kiến tạo
//                                 môi trường giáo dục khai phóng, nơi học sinh được
//                                 trang bị nền tảng toàn diện về phẩm chất – tri thức
//                                 – thể lực và tinh thần – năng lực, mở ra tương lai
//                                 hạnh phúc và thành công.
//                                 <br />
//                                 Là thành viên của Tổ chức giáo dục Quốc tế Cambridge
//                                 đồng thời là một trong số ít trường song ngữ tại
//                                 Việt Nam đạt kiểm định quốc tế WASC toàn phần,
//                                 EMASI cam kết mang đến một nền giáo dục quốc tế
//                                 chuẩn mực: từ lộ trình học tập song ngữ tích hợp
//                                 chương trình Cambridge và chương trình quốc gia được
//                                 truyền tải bằng phương pháp giáo dục tối ưu trên thế
//                                 giới bởi đội ngũ các nhà giáo dục giỏi chuyên môn,
//                                 đến cộng đồng trường đa quốc tịch gắn kết và hệ
//                                 thống cơ sở vật chất chuẩn quốc tế.
//                         </div>

//                         <div className="sep">
//                             <a
//                                 href="/hanh-trinh-emasi"
//                                 target="_self"
//                             >
//                                 Tìm hiểu thêm
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
import React from "react";
import "./emasi_about.css";
import { useStoreContext } from "@/context/StoreContext";

interface EmasiAboutProps {
  data?: {
    title?: string;
    subTitle?: string;
    image?: {
      node?: {
        sourceUrl?: string;
      };
    };
    button?: {
      title?: string;
      url?: string;
      target?: string;
    };
  };
}

export default function EmasiAbout({ data }: EmasiAboutProps) {
  const { normalizePath } = useStoreContext();

  if (!data) return null;

  const imgUrl = data.image?.node?.sourceUrl || "/assets/images/demo/image-colors.png";
  const btn = data.button;

  return (
    <section className="sc-about-emasi pt-0 m-px">
      <div className="inner-container">
        <div className="d-flex flex-wrap justify-content-between">
          
          {/* CỘT TRÁI */}
          <div className="col-left" data-aos="fade-right">
            <img
              className="ab-img-left"
              data-aos="fade-down"
              src={imgUrl}
              alt={data.title || "EMASI"}
            />

            {data.title && (
              <h2 className="h2-title fs-72 color-004d6c fw-bold">
                {data.title}
              </h2>
            )}

            {data.subTitle && (
              <div 
                className="sub-title fs-46 fw-bold color-004d6c"
                dangerouslySetInnerHTML={{ __html: data.subTitle }}
              />
            )}

            <div className="sep"></div>
          </div>

          {/* CỘT PHẢI */}
          <div className="col-right" data-aos="fade-left" data-aos-delay="150">
            <img
              className="ab-img-right"
              data-aos="fade-down"
              data-aos-delay="150"
              src={imgUrl}
              alt="EMASI"
            />

            <div className="desc fw-300">
               {/* Nếu bạn muốn field mô tả này cũng là CMS, 
                   hãy thêm field vào ACF và thay nội dung tĩnh dưới đây bằng biến data */}
               Trường Quốc tế Song ngữ EMASI tiên phong kiến tạo môi trường giáo dục khai phóng...
            </div>

            {btn?.url && (
              <div className="sep">
                <a
                  href={normalizePath(btn.url)}
                  target={btn.target || "_self"}
                >
                  {btn.title || "Tìm hiểu thêm"}
                </a>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}