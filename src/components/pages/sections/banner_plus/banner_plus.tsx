import React from "react";
import './banner_plus.css';

//Học sinh/ Thư viện

const bannerData = {
  image:
    "/assets/images/banner/banner-homepage-EMASI-1920-x-970-px-2-1.png",
  focalPoint: "center",
};

export default function BannerPlus() {
  return (
    <section
      data-aos="fade-in"
      className="banner d-flex align-items-end py-0"
      style={{
        background: `no-repeat center/cover url('${bannerData.image}')`,
        backgroundPosition: bannerData.focalPoint || "center",
      }}
    />
  );
}