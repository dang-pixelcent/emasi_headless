// import React, { useState } from "react";
// import "./education_route.css";

// export default function EducationRoute() {
//     const [active, setActive] = useState(0);

//     const partners = [
//         "/assets/images/demo/partners/logo-department.png",
//         "/assets/images/demo/partners/logo-cambridge.png",
//         "/assets/images/demo/partners/logo-IGCSE-cover.png",
//         "/assets/images/demo/partners/logo-alevels.png",
//         "/assets/images/demo/partners/logo-ielts.png",
//     ];

//     const classes = [
//         {
//             title: "Mẫu giáo",
//             image: "/assets/images/demo/mau-giao.jpg",
//             items: [
//                 "Chương trình Giáo dục Mầm non của Anh quốc (EYFS)",
//                 "Phương pháp Montessori",
//             ],
//             logos: ["/assets/images/demo/partners/logo-department-w.png"],
//             link: "https://emasi.pixelcent.com/chuong-trinh-mau-giao/",
//             aos: "fade-right",
//         },
//         {
//             title: "Tiểu học",
//             image: "/assets/images/demo/tieu_hoc2.jpg",
//             items: [
//                 "Chương trình Bộ GD&ĐT Việt Nam",
//                 "Chương trình Cambridge Tiểu học",
//                 "Starters – Movers – Flyers",
//                 "Cambridge Checkpoint",
//             ],
//             logos: ["/assets/images/demo/partners/logo-cambridge.png"],
//             link: "https://emasi.pixelcent.com/chuong-trinh-tieu-hoc/",
//             aos: "fade-right",
//         },
//         {
//             title: "Trung học Cơ sở",
//             image: "/assets/images/demo/thcs2.jpg",
//             items: [
//                 "Chương trình Bộ GD&ĐT Việt Nam",
//                 "Tiền IGCSE Cambridge",
//                 "Chương trình IGCSE",
//                 "Chứng chỉ KET, PET",
//             ],
//             logos: [
//                 "/assets/images/demo/partners/logo-cambridge.png",
//                 "/assets/images/demo/partners/logo-IGCSE-cover.png",
//             ],
//             link: "https://emasi.pixelcent.com/chuong-trinh-trung-hoc-co-so/",
//             aos: "fade-right",
//         },
//         {
//             title: "Trung học Phổ thông",
//             image: "/assets/images/demo/thpt2.jpg",
//             items: [
//                 "Chương trình Bộ GD&ĐT Việt Nam",
//                 "Chương trình IGCSE",
//                 "Cambridge A-Level",
//                 "Bằng EMASI (WASC)",
//             ],
//             logos: [
//                 "/assets/images/demo/partners/logo-IGCSE-cover.png",
//                 "/assets/images/demo/partners/logo-alevels.png",
//             ],
//             link: "https://emasi.pixelcent.com/chuong-trinh-trung-hoc-pho-thong/",
//             aos: "fade-right",
//         },
//     ];

//     const handleActive = (i: number) => {
//         setActive(i);
//     };

//     return (
//         <section className="sc-route">

//             <div className="inner-container">

//                 {/* HEADER */}
//                 <div className="sc-header d-flex flex-wrap">
//                     <div
//                         className="col-title"
//                         data-aos="fade-right"
//                     >
//                         <div className="sub-title fw-300 fs-48">
//                             Lộ trình
//                         </div>
//                         <h2 className="h2-title fw-bold">
//                             giáo dục song ngữ xuyên suốt
//                         </h2>
//                     </div>

//                     <div
//                         className="col-content"
//                         data-aos="fade-down"
//                         data-aos-delay="150"
//                     >
//                         <div className="desc fw-300">
//                             EMASI mang đến lộ trình giáo dục song ngữ liền mạch từ những năm Mẫu giáo đầu đời của học sinh đến hết Trung học Phổ thông. Trải nghiệm với chương trình đào tạo tích hợp xuyên suốt kết hợp cùng phương pháp sư phạm đổi mới, học sinh được tạo điều kiện để phát triển toàn diện, phát huy tối đa tiềm năng và tự tin nắm bắt thành công trong học tập và tương lai.
//                         </div>
//                     </div>
//                 </div>

//                 {/* PARTNERS */}
//                 <div
//                     className="partners d-flex flex-wrap"
//                     data-aos="fade-up"
//                 >
//                     {partners.map((img, i) => (
//                         <div key={i} className="logo-partner">
//                             <img src={img} alt="partner" />
//                         </div>
//                     ))}
//                 </div>

//                 {/* SLIDER */}
//                 <div
//                     className="sliders"
//                     data-aos="fade-right"
//                     data-aos-offset="300"
//                 >
//                     {classes.map((item, i) => (
//                         <div
//                             key={i}
//                             className={`slider-item ${active === i ? "active" : ""}`}
//                             onClick={() => handleActive(i)}
//                         >
//                             <div
//                                 className="item"
//                                 style={{
//                                     backgroundImage: `url(${item.image})`,
//                                     backgroundSize: "cover",
//                                     backgroundPosition: "center",
//                                 }}
//                             >
//                                 <div className="bg-overlay"></div>

//                                 <div className="m-img-right">
//                                     <img src={item.image} alt={item.title} />
//                                 </div>

//                                 <div className="content">
//                                     <h3
//                                         className="h3-title fw-600 text-white mb-0"
//                                         dangerouslySetInnerHTML={{
//                                             __html: item.title,
//                                         }}
//                                     />

//                                     <div className="content-detail">
//                                         <div className="content-detail-inner">

//                                             <ul>
//                                                 {item.items.map((li, idx) => (
//                                                     <li key={idx}>{li}</li>
//                                                 ))}
//                                             </ul>

//                                             {item.logos.length > 0 && (
//                                                 <div className="logos">
//                                                     {item.logos.map((logo, idx) => (
//                                                         <div key={idx} className="logo-item">
//                                                             <img src={logo} alt="logo" />
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}

//                                             {item.link && (
//                                                 <div className="sc-btn">
//                                                     <a href={item.link} target="_self">
//                                                         Tìm hiểu thêm
//                                                     </a>
//                                                 </div>
//                                             )}

//                                         </div>
//                                     </div>

//                                 </div>

//                             </div>
//                         </div>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }
import React, { useState } from "react";
import "./education_route.css";

// 1. Định nghĩa Interface khớp với cấu trúc GraphQL bạn nhận được
interface EducationRouteProps {
    data?: {
        subTitle?: string;
        title?: string;
        decs?: string; // Lưu ý: API của bạn trả về field tên là 'decs'
        desc?: string; // Dự phòng trường hợp sửa lại tên field thành 'desc'
        logo?: Array<{
            item?: {
                node?: {
                    sourceUrl?: string;
                };
            };
        }>;
        classes?: Array<{
            title?: string;
            image?: {
                node?: {
                    sourceUrl?: string;
                };
            };
            items?: Array<{
                title?: string;
            }>;
            logos?: Array<{
                image?: {
                    node?: {
                        sourceUrl?: string;
                    };
                };
            }>;
            link?: {
                url?: string;
            };
        }>;
    };
}

export default function EducationRoute({ data }: EducationRouteProps) {
    const [active, setActive] = useState(0);

    // Nếu không có dữ liệu trả về thì không render component
    if (!data) return null;

    // Trích xuất dữ liệu an toàn với giá trị mặc định
    const partners = data.logo || [];
    const classes = data.classes || [];
    const description = data.decs || data.desc || "";

    const handleActive = (i: number) => {
        setActive(i);
    };

    return (
        <section className="sc-route">
            <div className="inner-container">

                {/* HEADER */}
                <div className="sc-header d-flex flex-wrap">
                    <div className="col-title" data-aos="fade-right">
                        {data.subTitle && (
                            <div className="sub-title fw-300 fs-48">
                                {data.subTitle}
                            </div>
                        )}
                        {data.title && (
                            <h2 className="h2-title fw-bold">
                                {data.title}
                            </h2>
                        )}
                    </div>

                    {description && (
                        <div
                            className="col-content"
                            data-aos="fade-down"
                            data-aos-delay="150"
                        >
                            <div className="desc fw-300">
                                {description}
                            </div>
                        </div>
                    )}
                </div>

                {/* PARTNERS */}
                {partners.length > 0 && (
                    <div className="partners d-flex flex-wrap" data-aos="fade-up">
                        {partners.map((partnerItem, i) => {
                            const imgUrl = partnerItem?.item?.node?.sourceUrl;
                            if (!imgUrl) return null;

                            return (
                                <div key={i} className="logo-partner">
                                    <img src={imgUrl} alt="partner logo" />
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* SLIDER / CLASSES */}
                {classes.length > 0 && (
                    <div
                        className="sliders"
                        data-aos="fade-right"
                        data-aos-offset="300"
                    >
                        {classes.map((item, i) => {
                            const bgImage = item.image?.node?.sourceUrl || "";
                            const itemLink = item.link?.url;

                            return (
                                <div
                                    key={i}
                                    className={`slider-item ${active === i ? "active" : ""}`}
                                    onClick={() => handleActive(i)}
                                >
                                    <div
                                        className="item"
                                        style={{
                                            backgroundImage: bgImage ? `url(${bgImage})` : "none",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                    >
                                        <div className="bg-overlay"></div>

                                        {bgImage && (
                                            <div className="m-img-right">
                                                <img src={bgImage} alt={item.title || "Class"} />
                                            </div>
                                        )}

                                        <div className="content">
                                            {item.title && (
                                                <h3
                                                    className="h3-title fw-600 text-white mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.title,
                                                    }}
                                                />
                                            )}

                                            <div className="content-detail">
                                                <div className="content-detail-inner">
                                                    
                                                    {/* Danh sách các mục con */}
                                                    {item.items && item.items.length > 0 && (
                                                        <ul>
                                                            {item.items.map((li, idx) => (
                                                                <li key={idx}>{li.title}</li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    {/* Danh sách logo các chứng chỉ/đối tác nhỏ */}
                                                    {item.logos && item.logos.length > 0 && (
                                                        <div className="logos">
                                                            {item.logos.map((logoObj, idx) => {
                                                                const logoUrl = logoObj?.image?.node?.sourceUrl;
                                                                if (!logoUrl) return null;

                                                                return (
                                                                    <div key={idx} className="logo-item">
                                                                        <img src={logoUrl} alt="class logo" />
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}

                                                    {/* Nút Tìm hiểu thêm */}
                                                    {itemLink && (
                                                        <div className="sc-btn">
                                                            <a href={itemLink} target="_self">
                                                                Tìm hiểu thêm
                                                            </a>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </section>
    );
}