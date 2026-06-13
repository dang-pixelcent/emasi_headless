import React, { useEffect, useState } from "react";
import "./academic_achievement.css";

const achievements = [
    {
        image:
            "/assets/images/demo/our-schools/achievements/le-nguyen-kieu-nhu-scaled.jpg",
        title: "Lê Nguyễn Kiều Như",
        className: "9M",
        desc: "Giải Ba môn Lịch Sử - Kỳ thi Học sinh Giỏi Thành Phố Thủ Đức",
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/nguyen-thuc-quyen-scaled.jpg",
        title: "Nguyễn Thục Quyên",
        className: "9M",
        desc: "Giải Ba môn Lịch Sử - Kỳ thi Học sinh Giỏi Thành Phố Thủ Đức",
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/11_-TRAN-PHUONG-NHA_ONG4525-scaled.jpg",
        title: "Trần Phương Nhã",
        className: "8A",
        desc: "Giải Nhì môn Lịch Sử - Kỳ thi Học sinh Giỏi Thành Phố Thủ Đức",
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/10-NGUYEN-CUU-GIA-NGUYEN_ONG4517-scaled.jpg",
        title: "Nguyễn Cửu Gia Nguyễn",
        className: "8A",
        desc: "Giải Khuyến khích môn Lịch Sử - Kỳ thi Học sinh Giỏi Thành Phố Thủ Đức",
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/15_CAO-VINH-PHAT-scaled.jpg",
        title: "Cao Vĩnh Phát",
        className: "5I",
        desc: `Giải Bạc Khối 4 & 5 Kỳ thi Olympic Toán học Quốc tế Thái Lan (TIMO)

Giải Khuyến Khích - Kỳ thi lập trình WRO (Coding)`,
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/5_DUONG-DINH-BAO-CHAU-scaled.jpg",
        title: "Dương Huỳnh Bảo Châu",
        className: "5I",
        desc: `Giải Đồng - Kỳ thi Olympic Toán học Trẻ (IJMO)
        Giải Đồng - Kỳ thi Olympic Toán quốc tế (IMO)`,
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/12_NGUYEN-TRAN-THAO-NGUYEN-scaled.jpg",
        title: "Nguyễn Trần Thảo Nguyên",
        className: "5I",
        desc: `Giải Bạc - Kỳ thi Olympic Quốc tế Khoa học, Toán và Tiếng Anh (ASMO)
        Giải Khuyến khích - Kỳ thi Toán quốc tế Kangaroo (IKMC)
        Đạt giải Khuyến khích Khối 5 Toàn Quốc kì thi IOE cấp Tỉnh/Thành phố.
        Đạt giải NHẤT Khối 5 Toàn Thành Phố kì thi IOE cấp Tỉnh/Thành phố.
        Đạt giải NHẤT Khối 5 Toàn Quốc kì thi IOE cấp Quốc Gia.`,
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/6_NGUYEN-TRI-DAT-scaled.jpg",
        title: "Nguyễn Trí Đạt",
        className: "5I",
        desc: `Giải Khuyến Khích Cấp Thành Phố dành cho khối 4&5 - Kỳ thi VIOEDU
Giải Bạc Kỳ thi Olympic Toán học quốc tế dành cho khối 2 (HKIMO)`,
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/10_Nguyen-Huynh-Le-Han.jpg",
        title: "Nguyễn Huỳnh Lê Hân",
        className: "11M",
        desc: "Giải Ba môn Lịch sử Kỳ thi Olympic Thành phố Hồ Chí Minh dành cho học sinh cấp THPT",
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/5_Nguyen-Duc-Son-scaled.jpg",
        title: "Nguyễn Đức Sơn",
        className: "11M",
        desc: "Giải Ba môn Lịch sử Kỳ thi Olympic Thành phố Hồ Chí Minh dành cho học sinh cấp THPT",
    },
    {
        image:
            "/assets/images/demo/our-schools/achievements/18_Tran-Doan-Khanh-Nghi.jpg",
        title: "Trần Đoàn Khánh Nghi",
        className: "11M",
        desc: "Giải Ba môn Lịch sử - Kỳ thi Olympic Thành phố Hồ Chí Minh dành cho học sinh cấp THPT",
    },
];

export default function Achievement() {
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        const $ = (window as any).jQuery;

        if (!$?.fn?.slick) return;

        const $slider = $(".slider_academic");

        if ($slider.hasClass("slick-initialized")) {
            $slider.slick("unslick");
        }

        $slider.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            arrows: true,
            dots: false,

            prevArrow: ".slider-nav .slick-prev",
            nextArrow: ".slider-nav .slick-next",

            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        });
        
        //khởi tạo lại AOS sau khi slick đã render xong để tránh bị lỗi aos ở những section sau
        const AOS = (window as any).AOS;
        if (AOS) {
            if (typeof AOS.refresh === "function") {
                AOS.refresh();
            } else if (typeof AOS.init === "function") {
                AOS.init();
            }
        }

        $slider.on(
            "afterChange",
            (_: any, __: any, currentIndex: number) => {
                setCurrent(currentIndex + 1);
            }
        );

        return () => {
            $slider.off("afterChange");

            if ($slider.hasClass("slick-initialized")) {
                $slider.slick("unslick");
            }
        };
    }, []);

    return (
        <section
            className="sc-achievement position-relative"
            style={{
                background:
                    "url('/assets/images/demo/our-schools/achievements/bg-achievement-2.jpg') center/cover no-repeat",
            }}
        >
            <div className="inner-container">
                <div className="sc-header">
                    <div
                        data-aos="fade-down"
                        className="sub-title fs-48 fw-light text-white text-center"
                    >
                        Thành tích nổi bật
                    </div>

                    <h2
                        data-aos="fade-down"
                        className="h2-title fw-light text-white text-center"
                    >
                        Học sinh EMASI
                    </h2>
                </div>

                <div className="academic-wrapper achievement-list">
                    <div className="slider_academic" data-aos="fade-up">
                        {achievements.map((item, index) => (
                            <div className="slide-item" key={index}>
                                <div className="item">
                                    <div className="inner">
                                        <div className="item-featured text-center">
                                            <figure>
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                />
                                            </figure>
                                        </div>

                                        <div className="item-content text-center">
                                            <h3 className="h3-title fw-bold text-uppercase">
                                                {item.title}
                                            </h3>

                                            <div className="class fw-light text-uppercase">
                                                {item.className}
                                            </div>

                                            <div className="desc fw-light text-white">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="slider-nav"
                    >
                        <button
                            type="button"
                            className="slick-arrow slick-prev"
                        >
                            <svg
                                fill="#cccccc"
                                height="20px"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 330 330"
                            >
                                <path
                                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
                                    c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330
                                    s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                                    C255,161.018,253.42,157.202,250.606,154.389z"
                                />
                            </svg>
                        </button>

                        <div className="slider-dots">
                            <span className="current">{current}</span>
                            {" | "}
                            <span className="total">
                                {achievements.length}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="slick-arrow slick-next"
                        >
                            <svg
                                fill="#cccccc"
                                height="20"
                                width="20"
                                viewBox="0 0 330 330"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
                                    c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330
                                    s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                                    C255,161.018,253.42,157.202,250.606,154.389z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}