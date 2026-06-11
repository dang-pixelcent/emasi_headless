import React from "react";
import "./tuition_fees.css";

export default function Fees() {
  return (
    <section
      className="sc-fees"
      style={{
        background:
          "no-repeat center/cover url('https://emasi.pixelcent.com/wp-content/uploads/2025/03/our-schools-banner.jpg')",
      }}
    >
      <div className="inner-container">
        <div className="sc-header">
          <h2
            data-aos="fade-down"
            className="h2-title fw-light text-white text-center"
          >
            HỌC PHÍ <strong>&amp; ƯU ĐÃI</strong>
          </h2>
        </div>

        <div
          className="list"
          data-aos="fade-up"
        >
          <img
            src="/assets/images/demo/our-schools/tuition_fees/fee-img.jpg"
            alt="Học phí"
          />

          <img
            src="/assets/images/demo/our-schools/tuition_fees/hb.jpg"
            alt="Học bổng"
          />
        </div>

        <div
          data-aos="fade-up"
          className="sc-btn d-flex justify-content-center"
        >
          <a
            href="https://emasi.pixelcent.com/hoc-phi/"
            className="btn-bg bg-icon bg-white"
            target="_self"
          >
            <span>Tư vấn Học phí</span>
          </a>
        </div>
      </div>
    </section>
  );
}