// import React, { useState } from "react";
// import "./values.css";

// export default function Values() {
//     const [activeValue, setActiveValue] = useState(2);

//     const values = [
//         {
//             title: "Đức độ",
//             desc: [
//                 "Yêu thương và Đồng cảm – Quan tâm và Phục vụ – Bình đẳng và Công bằng",
//                 "Giáo dục tại EMASI không chỉ dừng lại ở việc trang bị kiến thức mà còn chú trọng truyền tải mọi thể thức của tình <strong>Yêu thương và Đồng cảm, Quan tâm và Phục vụ, Bình đẳng và Công bằng.</strong>"
//             ]
//         },
//         {
//             title: "Thái độ",
//             desc: [
//                 "Tích cực (Tự tạo động lực) – Dấn thân (Tự đề ra thử thách) – Cầu tiến (Luôn phấn đấu để hoàn thiện)",
//                 "Tinh thần <strong>Tích cực – Dấn thân – Cầu tiến</strong> không chỉ trong học tập mà còn trong nếp sống, cách yêu thương và gắn kết với cộng đồng."
//             ],
//         },
//         {
//             title: "Trình độ",
//             desc: [
//                 "Tư duy phản biện – Giao tiếp tinh tế – Thể chất cường tráng",
//                 "<strong>Tư duy phản biện, Giao tiếp tinh tế</strong> và <strong>Thể chất cường tráng</strong> phản ánh sự phát triển toàn diện trí tuệ, kỹ năng, ngôn ngữ, thể chất và tinh thần."
//             ],
//         },
//     ];

//     const environments = [
//         {
//             title: "Bảo chứng chất lượng",
//             color: "color-bed62f",
//             link: "https://emasi.pixelcent.com/kiem-dinh-quoc-te-wasc-toan-phan/",
//             desc: "bởi Tổ chức Kiểm định giáo dục danh giá",
//             image:
//                 "/assets/images/demo/our-schools/environments/wascLOGO_FullyAccredited_WHITE.png",
//         },
//         {
//             title: "Trường Quốc tế Cambridge",
//             color: "color-ffffff",
//             link: "https://emasi.pixelcent.com/chuong-trinh-cambridge/",
//             desc: "Thành viên Tổ chức Giáo dục Quốc tế uy tín toàn cầu",
//             image:
//                 "/assets/images/demo/our-schools/environments/logo-cambridge-1.png",
//         },
//         {
//             title: "Triết lý giáo dục",
//             color: "color-bed62f",
//             desc: "phát triển toàn diện về phẩm chất – tri thức – thể chất và tinh thần – năng lực",
//         },
//         {
//             title: "Tích hợp Nghệ thuật vào Giáo dục",
//             color: "color-ffffff",
//             link: "http://nguyenartfoundation.com",
//             desc: "phối hợp độc quyền cùng Nguyen Art Foundation",
//             image:
//                 "/assets/images/demo/our-schools/environments/NguyenArtFoundation_NewLogo_White-2-1-e1747124235542.png",
//         },
//         {
//             title: "Chương trình Song ngữ tích hợp",
//             color: "color-ffffff",
//             desc: "với hai lộ trình học tập",
//         },
//         {
//             title: "Đội ngũ Sư phạm",
//             color: "color-5bcbf5",
//             desc: "giàu chuyên môn, kinh nghiệm và tâm huyết",
//         },
//         {
//             title: "Cộng đồng trường",
//             color: "color-ffffff",
//             desc: "gắn kết sâu sắc và giàu lòng tự hào",
//         },
//         {
//             title: "Cơ sở Vật chất",
//             color: "color-5bcbf5",
//             desc: "ưu việt tạo trải nghiệm vượt trội",
//         },
//     ];

//     return (
//         <section className="sc-values" style={{ backgroundColor: "#00364c" }}>
//             <div className="inner-container">
//                 <div className="important-values d-flex flex-wrap">

//                     <div className="col-content text-white">
//                         <div className="sc-header">
//                             <div className="sub-title" data-aos="fade-down">
//                                 CÁC GIÁ TRỊ CỐT LÕI
//                             </div>

//                             <h2
//                                 className="h2-title fw-bold color-bfd730 mb-0"
//                                 data-aos="fade-down"
//                                 data-aos-delay="100"
//                             >
//                                 làm nên nền giáo dục EMASI
//                             </h2>
//                         </div>

//                         <div className="content-value" data-aos="fade-down-right">

//                             <div className="desc fw-300 text-white">
//                                 Với mỗi thành viên trong cộng đồng trường EMASI, mỗi ngày là một cơ hội để lan tỏa triết lý giáo dục và giá trị cốt lõi.
//                             </div>

//                             <div className="cus-bg-gradient text-center text-white">
//                                 <h3 className="fw-bold">Triết lý</h3>
//                                 <div className="desc">
//                                     Nhân văn – Ái quốc – Khai phóng
//                                 </div>
//                             </div>

//                             {/* VALUE SWITCH */}
//                             <div className="value-detail text-center">
//                                 <h3 className="fw-bold color-bfd730">
//                                     Giá trị Cốt lõi
//                                 </h3>

//                                 <div className="sub-title-slider sub-title text-white">
//                                     {values.map((v, i) => (
//                                         <React.Fragment key={i}>
//                                             {i > 0 && <span>-</span>}
//                                             <span
//                                                 className={`value ${
//                                                     activeValue === i ? "vactive" : ""
//                                                 }`}
//                                                 onMouseEnter={() => setActiveValue(i)}
//                                                 onClick={() => setActiveValue(i)}
//                                             >
//                                                 {v.title}
//                                             </span>
//                                         </React.Fragment>
//                                     ))}
//                                 </div>

//                                 <div className="sep-gradient"></div>

//                                 <div className="desc_slider">
//                                     {values.map((v, i) => (
//                                         <div
//                                             key={i}
//                                             className={`desc-item ${
//                                                 activeValue === i ? "active" : ""
//                                             }`}
//                                         >
//                                             <div className="desc fw-600 text-white">
//                                                 {v.desc.map((p, i) => (
//                                                     <p
//                                                         key={i}
//                                                         dangerouslySetInnerHTML={{ __html: p }}
//                                                     />
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT POLYGON */}
//                     <div className="values-slider position-relative" data-aos="zoom-in-left">
//                         {values.map((v, i) => (
//                             <div
//                                 key={i}
//                                 data-item={i + 1}
//                                 className={`item position-absolute d-flex align-items-center justify-content-center ${
//                                     activeValue === i ? "active" : ""
//                                 }`}
//                                 onMouseEnter={() => setActiveValue(i)}
//                             >
//                                 <div className="bg-polygon"></div>
//                                 <div className="bg-polygon-2"></div>
//                                 <div className="title">{v.title}</div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="environments">

//                     <div
//                         className="sub-title fw-300 text-uppercase text-center"
//                         data-aos="fade-down"
//                     >
//                         Chọn EMASI
//                     </div>

//                     <h2
//                         className="h2-title fw-bold text-white text-center m-mw-64"
//                         data-aos="fade-down"
//                         data-aos-delay="150"
//                     >
//                         Chọn môi trường phát triển toàn diện cho con
//                     </h2>

//                     <div
//                         className="lists d-flex flex-wrap"
//                         data-aos="fade-up"
//                         data-aos-delay="150"
//                     >
//                         {environments.map((item, i) => {
//                             const Tag = item.link ? "a" : "div";

//                             return (
//                                 <Tag
//                                     key={i}
//                                     className="item"
//                                     href={item.link}
//                                     target={item.link ? "_blank" : undefined}
//                                 >
//                                     <div className="bg-overlay"></div>

//                                     <h3
//                                         className={`h3-title fw-bold mb-0 ${item.color}`}
//                                     >
//                                         {item.title}
//                                     </h3>

//                                     <div className="desc fw-300 text-white">
//                                         {item.desc && <p>{item.desc}</p>}
//                                         {item.image && (
//                                             <img
//                                                 src={item.image}
//                                                 alt={item.title}
//                                             />
//                                         )}
//                                     </div>
//                                 </Tag>
//                             );
//                         })}
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }
import React, { useState } from "react";
import "./values.css";

interface ValuesProps {
  data?: {
    title?: string;
    subTitle?: string;
    desc?: string;
    title2?: string;
    desc2?: string;
    title3?: string;
    listValues?: Array<{
      title?: string;
      desc?: string;
    }>;
  };
}

export default function Values({ data }: ValuesProps) {
  const [activeValue, setActiveValue] = useState(0);

  if (!data) return null;

  const values = data.listValues || [];

  // Danh sách environments hiện tại chưa có trong dữ liệu GraphQL bạn cung cấp
  const environments = [
    /* ... giữ nguyên mảng tĩnh cũ của bạn ở đây ... */
  ];

  return (
    <section className="sc-values" style={{ backgroundColor: "#00364c" }}>
      <div className="inner-container">
        <div className="important-values d-flex flex-wrap">
          <div className="col-content text-white">
            <div className="sc-header">
              {data.subTitle && (
                <div className="sub-title" data-aos="fade-down">
                  {data.subTitle}
                </div>
              )}

              <h2
                className="h2-title fw-bold color-bfd730 mb-0"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                {data.title}
              </h2>
            </div>

            <div className="content-value" data-aos="fade-down-right">
              {data.desc && (
                <div className="desc fw-300 text-white">{data.desc}</div>
              )}

              <div className="cus-bg-gradient text-center text-white">
                <h3 className="fw-bold">{data.title2}</h3>
                <div className="desc">{data.desc2}</div>
              </div>

              {/* VALUE SWITCH */}
              <div className="value-detail text-center">
                <h3 className="fw-bold color-bfd730">{data.title3}</h3>

                <div className="sub-title-slider sub-title text-white">
                  {values.map((v, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span>-</span>}
                      <span
                        className={`value ${activeValue === i ? "vactive" : ""}`}
                        onMouseEnter={() => setActiveValue(i)}
                        onClick={() => setActiveValue(i)}
                      >
                        {v.title}
                      </span>
                    </React.Fragment>
                  ))}
                </div>

                <div className="sep-gradient"></div>

                <div className="desc_slider">
                  {values.map((v, i) => (
                    <div
                      key={i}
                      className={`desc-item ${activeValue === i ? "active" : ""}`}
                    >
                      <div className="desc fw-600 text-white">
                        <div dangerouslySetInnerHTML={{ __html: v.desc || "" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT POLYGON */}
          <div className="values-slider position-relative" data-aos="zoom-in-left">
            {values.map((v, i) => (
              <div
                key={i}
                data-item={i + 1}
                className={`item position-absolute d-flex align-items-center justify-content-center ${
                  activeValue === i ? "active" : ""
                }`}
                onMouseEnter={() => setActiveValue(i)}
              >
                <div className="bg-polygon"></div>
                <div className="bg-polygon-2"></div>
                <div className="title">{v.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PHẦN ENVIRONMENTS GIỮ NGUYÊN */}
        <div className="environments">
          {/* ... render các item của environments ... */}
        </div>
      </div>
    </section>
  );
}