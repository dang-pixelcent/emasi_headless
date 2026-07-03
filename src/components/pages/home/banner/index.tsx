
// import React, { useEffect } from "react";
// import "./banner.css";

// interface BannerItem {
//     type: "image" | "video";
//     url: string;
//     alt?: string;
// }

// interface BannerProps {
//     items: BannerItem[];
// }

// export default function Banner({ items = [] }: BannerProps) {

//     useEffect(() => {
//         const $ = (window as any).$;

//         // Thêm dấu ? vào items?.length cho an toàn tuyệt đối
//         if ($?.fn?.slick && items?.length > 0) {
//             const $slider = $(".home-slider");
//             if (!$slider.hasClass("slick-initialized")) {
//                 $slider.slick({
//                     autoplay: true,
//                     arrows: false,
//                     infinite: true,
//                     dots: false,
//                     speed: 500,
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 });
//             }
//         }

//         return () => {
//             const $ = (window as any).$;
//             const $slider = $(".home-slider");
//             if ($slider.hasClass("slick-initialized")) {
//                 $slider.slick("unslick");
//             }
//         };
//     }, [items]);

//     // Đoạn check này vẫn giữ nguyên
//     if (!items || items.length === 0) {
//         return null;
//     }
//     return (
//         <section className="banner banner-home banner-image">
//             <div className="container-fluid p-0">
//                 <div className="row m-0">
//                     <div className="home-slider" data-aos="fade-out">
//                         {items.map((item, index) => (
//                             <div key={index} className="slide">
//                                 {item.type === "video" ? (
//                                     <video
//                                         className="img aspect-ratio-1"
//                                         src={item.url}
//                                         autoPlay
//                                         loop
//                                         muted
//                                         playsInline
//                                     />
//                                 ) : (
//                                     <img
//                                         className=" img aspect-ratio-1"
//                                         src={item.url}
//                                         alt={item.alt || "Hệ thống Trường EMASI"}
//                                     />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// // import React, { useEffect } from "react";
// // import { Link } from "gatsby";
// // import "./banner.css"; // File CSS chứa object-fit mình đã hướng dẫn ở trên

// // interface BannerButton {
// //     url: string;
// //     title: string;
// //     target?: string;
// // }

// // interface CampusBannerItem {
// //     image: string;
// // }

// // interface CustomBannerProps {
// //     type: "slider" | "image";
// //     background_image?: string;
// //     items?: CampusBannerItem[];
// //     title?: string;
// //     button?: BannerButton | null;
// // }

// // export default function Banner({ 
// //     type, 
// //     background_image, 
// //     items = [], 
// //     title, 
// //     button 
// // }: CustomBannerProps) {

// //     useEffect(() => {
// //         const $ = (window as any).$;

// //         // Chỉ khởi tạo Slick nếu type là slider và có items
// //         if (type === "slider" && $?.fn?.slick && items?.length > 0) {
// //             const $slider = $(".campus-slider");
// //             if (!$slider.hasClass("slick-initialized")) {
// //                 $slider.slick({
// //                     autoplay: true,
// //                     arrows: false,
// //                     infinite: true,
// //                     dots: false,
// //                     speed: 500,
// //                     slidesToShow: 1,
// //                     slidesToScroll: 1,
// //                     fade: true, // banner tĩnh thì nên có fade chuyển cảnh cho mượt
// //                 });
// //             }
// //         }

// //         return () => {
// //             const $ = (window as any).$;
// //             const $slider = $(".campus-slider");
// //             if ($slider.hasClass("slick-initialized")) {
// //                 $slider.slick("unslick");
// //             }
// //         };
// //     }, [type, items]);

// //     return (
// //         <section className="sc-banner custom-banner">
// //             {/* LỚP NỀN (Nằm dưới) */}
// //             {type === "slider" ? (
// //                 <div className="campus-slider-wrap">
// //                     <div className="campus-slider">
// //                         {items.map((item, index) => (
// //                             <div key={index} className="slick-slide">
// //                                 <img
// //                                     className="custom-banner-img"
// //                                     src={item.image}
// //                                     alt="Campus Banner"
// //                                 />
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             ) : (
// //                 <div className="custom-banner-bg">
// //                     {background_image && (
// //                         <img
// //                             className="custom-banner-img"
// //                             src={background_image}
// //                             alt="Campus Banner"
// //                         />
// //                     )}
// //                 </div>
// //             )}

// //             {/* LỚP NỘI DUNG (Nổi lên trên) */}
// //             <div className="inner-container h-100 d-flex align-items-center">
// //                 <div className="banner-content d-flex flex-column">
// //                     {title && (
// //                         <h1 
// //                             className="h1-title text-white f-SVN-FuturaBold" 
// //                             data-aos="fade-up"
// //                             dangerouslySetInnerHTML={{ __html: title }} 
// //                         />
// //                     )}
                    
// //                     {button && button.url && (
// //                         <div className="sc-btn d-flex">
// //                             <Link 
// //                                 to={button.url} 
// //                                 className="btn-bg bg-icon bg-white" 
// //                                 data-aos="fade-up" 
// //                                 target={button.target || "_self"}
// //                             >
// //                                 {button.title}
// //                             </Link>
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // }
import React, { useEffect, useState } from "react";
import "./banner.css";

interface BannerItem {
    type: "image" | "video";
    url: string;
    alt?: string;
}

interface BannerProps {
    items: BannerItem[];
}

export default function Banner({ items = [] }: BannerProps) {
    const [isMounted, setIsMounted] = useState(false);

    // 1. Chặn lỗi Hydration SSR trên Vercel
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted || !items || items.length === 0) return;

        let checkExistInterval: any = null;

        const initSlick = () => {
            const $ = (window as any).$;
            // Kiểm tra jQuery và thư viện Slick đã thực sự tải xong chưa
            if ($ && $?.fn?.slick) {
                const $slider = $(".home-slider");
                if ($slider.length > 0 && !$slider.hasClass("slick-initialized")) {
                    $slider.slick({
                        autoplay: true,
                        arrows: false,
                        infinite: true,
                        dots: false,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    });
                }
                // Khởi tạo thành công thì dừng bộ đếm thời gian lại
                if (checkExistInterval) clearInterval(checkExistInterval);
            }
        };

        // Thử chạy ngay lập tức
        initSlick();

        // Nếu chưa được (do mạng Vercel tải slick.min.js chậm), kiểm tra lại mỗi 100ms (tối đa trong 3 giây)
        let attempts = 0;
        checkExistInterval = setInterval(() => {
            attempts++;
            initSlick();
            if (attempts > 30) {
                clearInterval(checkExistInterval); // Dừng lại sau 3s để tránh lặp vô tận
            }
        }, 100);

        return () => {
            if (checkExistInterval) clearInterval(checkExistInterval);
            const $ = (window as any).$;
            if ($ && $?.fn?.slick) {
                const $slider = $(".home-slider");
                if ($slider && $slider.hasClass("slick-initialized")) {
                    $slider.slick("unslick");
                }
            }
        };
    }, [isMounted, items]);

    if (!items || items.length === 0) {
        return null;
    }

    // Nếu đang build SSR trên Vercel, trả về khung tĩnh trước để tránh lệch giao diện
    if (!isMounted) {
        return (
            <section className="banner banner-home banner-image">
                <div className="container-fluid p-0">
                    <div className="row m-0">
                        <div className="home-slider">
                            {items.length > 0 && (
                                <div className="slide">
                                    <img
                                        className="img aspect-ratio-1"
                                        src={items[0].url}
                                        alt="Banner placeholder"
                                        style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="banner banner-home banner-image">
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <div className="home-slider" data-aos="fade-out">
                        {items.map((item, index) => (
                            <div key={index} className="slide">
                                {item.type === "video" ? (
                                    <video
                                        className="img aspect-ratio-1"
                                        src={item.url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        className="img aspect-ratio-1"
                                        src={item.url?.replace("http://", "https://")}
                                        alt={item.alt || "Hệ thống Trường EMASI"}
                                        loading="eager" // Bắt buộc điện thoại tải ảnh ngay lập tức
                                        style={{ width: "100%", height: "auto", objectFit: "cover" }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}