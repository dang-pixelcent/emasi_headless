import React from "react";
import { useEffect } from "react";
import "./logo_university.css";

interface LogoItem {
  image: string;
}

const logos: LogoItem[] = [
  { image: "/assets/images/demo/university/logo-hanyang.png" },
  { image: "/assets/images/demo/university/logo-helsingin.png" },
  { image: "/assets/images/demo/university/FTU-logo-e1746695900497.png" },
  { image: "/assets/images/demo/university/logo-Michigan-State-University.png" },
  { image: "/assets/images/demo/university/logo-university-of-exeter.png" },
  { image: "/assets/images/demo/university/Truong_Dai_hoc_VinUni_logo-e1746695948314.png" },
  { image: "/assets/images/demo/university/logo-university-of-melbourne.png" },
  { image: "/assets/images/demo/university/logo-Fulbright_University_Seal.png" },
  { image: "/assets/images/demo/university/Logo_Dai_hoc_Y_Duoc_Thanh_pho_Ho_Chi_Minh.png" },
  { image: "/assets/images/demo/university/logo-Duke_University.png" },
  { image: "/assets/images/demo/university/logo-RMIT_University.png" },
];

export default function LogoUniversity() {
    const displayLogos = logos.length < 8 ? [...logos, ...logos] : logos;

    useEffect(() => {
        const $ = (window as any).jQuery;

        if (!$.fn?.slick) return;

        const $slider = $(".logos-university-slider");
        const images = $slider.find('img');
        let loadedCount = 0;

        // Đợi tất cả ảnh load xong trước khi khởi tạo Slick
        const initSlick = () => {
            if ($slider.hasClass("slick-initialized")) {
                $slider.slick("unslick");
            }

            $slider.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 0,
                speed: 5000,
                cssEase: "linear",
                infinite: true,
                arrows: false,
                dots: false,
                pauseOnHover: false,
                pauseOnFocus: false,
            });
        };

        if (images.length === 0) {
            initSlick();
        } else {
            images.on('load', () => {
                loadedCount++;
                if (loadedCount === images.length) {
                    initSlick();
                }
            });

            // Fallback: nếu sau 2s vẫn chưa load hết ảnh, cũng khởi tạo
            setTimeout(initSlick, 2000);
        }

        return () => {
            if ($slider.hasClass("slick-initialized")) {
                $slider.slick("unslick");
            }
        };
    }, []);
    return (
        <section className="sc-logos-university" data-aos="fade-up">
            <div className="container-fluid px-0 container-2560">
                <div className="logos-university-slider position-relative">
                {displayLogos.map((item, index) => (
                    <div className="slide-logo" key={index}>
                    <div className="logo">
                        <img src={item.image} alt="Partner" />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
    );
};