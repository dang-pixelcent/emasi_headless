import React from "react";
import { useEffect } from "react";
import './banner.css';

export default function Banner() {

    const isSlider = false; //true thì slider, false thì image

    const backgroundImage =
        "https://emasi.pixelcent.com/wp-content/uploads/2025/03/our-schools-banner-21.jpg";

    const items = [
        "/assets/images/banner/1_2.png",
        "/assets/images/banner/1-2.jpg",
    ];
    //Slider tự động
    useEffect(() => {
        const $ = (window as any).$;

        if ($?.fn?.slick) {
            $(".campus-slider").slick({
                autoplay: true,
                arrows: false,
                infinite: true,
                dots: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
        }
    }, []);

    return (
        <section
            className="sc-banner custom-banner"
            style={
                !isSlider
                    ? {
                        background: `no-repeat center/cover url(${backgroundImage})`,
                    }
                    : undefined
            }
        >
            {/* SLIDER MODE */}
            {isSlider && (
                <div className="campus-slider-wrap">
                    <div className="campus-slider">
                        {items.map((img, index) => (
                            <div className="slick-slide" key={index}>
                                <div className="inner">
                                    <img src={img} alt={`slide-${index}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CONTENT */}
            <div className="inner-container h-100 d-flex align-items-center">
                <div className="banner-content d-flex flex-column">
                    <h1
                        className="h1-title text-white f-SVN-FuturaBold"
                        data-aos="fade-up"
                    >
                        Trường Quốc tế <br />
                        Song ngữ <br />
                        EMASI <i>Nam Long</i>
                    </h1>

                    <div className="sc-btn d-flex">
                        <a
                            href="#dangky"
                            className="btn-bg bg-icon bg-white"
                            data-aos="fade-up"
                            target="_self"
                        >
                            Đăng ký Trải nghiệm
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}