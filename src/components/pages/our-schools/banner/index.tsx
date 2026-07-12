
import React, { useEffect } from "react";
import "./banner.css";
import { useStoreContext } from "@/context/StoreContext";

// 1. Khai báo Interface cho dữ liệu trả về từ GraphQL
interface BannerProps {
    data?: {
        title?: string;
        bannergallery?: {
            nodes?: Array<{
                sourceUrl?: string;
                altText?: string;
            }>;
        };
        button?: {
            title?: string;
            url?: string;
            target?: string;
        };
    };
}

export default function Banner({ data }: BannerProps) {
    // Tránh render nếu không có dữ liệu
    if (!data) return null;
    const { normalizePath } = useStoreContext();
    // 2. Bóc tách dữ liệu
    const gallery = data.bannergallery?.nodes || [];
    const isSlider = gallery.length > 1;
    const backgroundImage = gallery.length === 1 ? gallery[0].sourceUrl : "";
    const btn = data.button;

    // 3. Xử lý Slider tự động (Có cơ chế Polling đợi Slick trên Vercel Production)
    useEffect(() => {
        if (!isSlider) return;

        let checkInterval: any = null;

        // Hàm kiểm tra và khởi tạo Slick Slider
        const initSlick = () => {
            const $ = (window as any).$;
            if ($ && $.fn && $.fn.slick) {
                const $slider = $(".campus-slider");
                if ($slider.length && !$slider.hasClass("slick-initialized")) {
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
                return true;
            }
            return false;
        };

        // Thử khởi chạy ngay lần đầu
        if (!initSlick()) {
            // NẾU TRÊN VERCEL FILE JS TẢI CHẬM: Đợi mỗi 100ms (tối đa 5 giây) cho đến khi slick tải xong
            let attempts = 0;
            checkInterval = setInterval(() => {
                attempts++;
                if (initSlick() || attempts > 50) {
                    clearInterval(checkInterval);
                }
            }, 100);
        }

        // Cleanup slick khi unmount
        return () => {
            if (checkInterval) clearInterval(checkInterval);
            const $ = (window as any).$;
            if ($ && $.fn && $.fn.slick) {
                const $slider = $(".campus-slider");
                if ($slider.hasClass("slick-initialized")) {
                    $slider.slick("unslick");
                }
            }
        };
    }, [isSlider, gallery.length]);

    return (
        <section
            className="sc-banner custom-banner"
            style={
                !isSlider && backgroundImage
                    ? {
                        background: `no-repeat center/cover url(${backgroundImage})`,
                    }
                    : { background: "#00364c" } // Màu nền dự phòng nếu không có ảnh
            }
        >
            {/* SLIDER MODE - GIỮ NGUYÊN BỐ CỤC NGUYÊN BẢN */}
            {isSlider && (
                <div className="campus-slider-wrap">
                    <div className="campus-slider">
                        {gallery.map((img, index) => (
                            <div className="slick-slide" key={index}>
                                <div className="inner">
                                    <img
                                        src={img.sourceUrl}
                                        alt={img.altText || `slide-${index}`}
                                        /* Tối ưu ngầm LCP cho Lighthouse, không làm thay đổi layout */
                                        loading={index === 0 ? "eager" : "lazy"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CONTENT - GIỮ NGUYÊN 100% THẺ, CLASS VÀ DATA-AOS CỦA BẠN */}
            <div className="inner-container h-100 d-flex align-items-center">
                <div className="banner-content d-flex flex-column">
                    {/* TITLE */}
                    {data.title && (
                        <h1
                            className="h1-title text-white f-SVN-FuturaBold"
                            data-aos="fade-up"
                            dangerouslySetInnerHTML={{ __html: data.title }}
                        />
                    )}

                    {/* BUTTON */}
                    {btn?.url && (
                        <div className="sc-btn d-flex">
                            <a
                                href={normalizePath(btn.url)}
                                className="btn-bg bg-icon bg-white"
                                data-aos="fade-up"
                                target={btn.target || "_self"}
                            >
                                {btn.title || "Xem thêm"}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}