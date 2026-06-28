// // NOTE: banner phải hiển thị được cả img hoặc là video
// import React from "react";
// import { useEffect } from "react";
// import "./banner.css";

// export default function Banner() {
//    useEffect(() => {
//     const $ = (window as any).$;

//     if ($?.fn?.slick) {
//         $(".home-slider").slick({
//             autoplay: true,
//             arrows: false,
//             infinite: true,
//             dots: false,
//             speed: 500,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//         });
//     }
// }, []);

//     return (
//         <section className="banner banner-home banner-image">
//             <div className="container-fluid">
//                 <div className="row">
//                     <div
//                         className="home-slider"
//                         data-aos="fade-out"
//                     >
//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/3.png"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>

//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/thumbnail.png"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>

//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/3.jpg"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>

//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/2.jpg"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>

//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/1.jpg"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>

//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/2_1.png"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>

//                         <div className="slide">
//                             <img
//                                 className="aspect-ratio-1"
//                                 src="assets/images/banner/1_2.png"
//                                 alt="Hệ thống Trường EMASI"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

import React, { useEffect } from "react";
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

    useEffect(() => {
        const $ = (window as any).$;

        // Thêm dấu ? vào items?.length cho an toàn tuyệt đối
        if ($?.fn?.slick && items?.length > 0) {
            const $slider = $(".home-slider");
            if (!$slider.hasClass("slick-initialized")) {
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
        }

        return () => {
            const $ = (window as any).$;
            const $slider = $(".home-slider");
            if ($slider.hasClass("slick-initialized")) {
                $slider.slick("unslick");
            }
        };
    }, [items]);

    // Đoạn check này vẫn giữ nguyên
    if (!items || items.length === 0) {
        return null;
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
                                        className="aspect-ratio-1"
                                        src={item.url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        className="aspect-ratio-1"
                                        src={item.url}
                                        alt={item.alt || "Hệ thống Trường EMASI"}
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