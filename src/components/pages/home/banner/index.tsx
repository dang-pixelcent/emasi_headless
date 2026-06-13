// NOTE: banner phải hiển thị được cả img hoặc là video
import React from "react";
import { useEffect } from "react";
import "./banner.css";

export default function Banner() {
   useEffect(() => {
    const $ = (window as any).$;

    if ($?.fn?.slick) {
        $(".home-slider").slick({
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
        <section className="banner banner-home banner-image">
            <div className="container-fluid">
                <div className="row">
                    <div
                        className="home-slider"
                        data-aos="fade-out"
                    >
                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/3.png"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>

                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/thumbnail.png"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>

                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/3.jpg"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>

                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/2.jpg"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>

                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/1.jpg"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>

                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/2_1.png"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>

                        <div className="slide">
                            <img
                                className="aspect-ratio-1"
                                src="assets/images/banner/1_2.png"
                                alt="Hệ thống Trường EMASI"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}