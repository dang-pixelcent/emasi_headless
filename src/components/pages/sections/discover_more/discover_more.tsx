import React from "react";
import "./discover_more.css";

export default function Discover() {
  const items = [
    {
      url: "https://emasi.pixelcent.com/tin-tuc/emasi-dat-kiem-dinh-wasc-toan-phan/",
      image:
        "/assets/images/demo/our-schools/news_events/untitled-2.jpg",
      title: "EMASI chính thức đạt kiểm định quốc tế WASC toàn phần!",
    },
    {
      url: "https://emasi.pixelcent.com/tin-tuc/hoi-xuan-emasi-nam-long-2025-saigon-tet-retro-2/",
      image:
        "/assets/images/demo/our-schools/news_events/av1-2.png",
      title: "HỘI XUÂN EMASI NAM LONG 2025: SAIGON TET RETRO",
    },
    {
      url: "https://emasi.pixelcent.com/tin-tuc/hoi-xuan-at-ty-2025-tai-emasi-van-phuc-new-year-new-me/",
      image:
        "/assets/images/demo/our-schools/news_events/resize-3_1920x680-scaled.jpg",
      title:
        "Hội xuân Ất Tỵ 2025 tại EMASI Vạn Phúc “New Year, New Me”",
    },
  ];

  return (
    <section className="sc-discorver">
      <div className="inner-container">
        <div className="sc-header">
          <h2
            className="h2-title text-center f-ibmplexsans fw-600 mb-0"
            data-aos="fade-up"
          >
            Khám phá thêm
          </h2>
        </div>

        <div className="list d-flex flex-wrap">
          {items.map((item, index) => (
            <div
              className="item"
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index + 1) * 100}
            >
              <figure>
                <a href={item.url}>
                  <img src={item.image} alt={item.title} />
                </a>
              </figure>

              <div className="content">
                <h3 className="h3-title text-center f-ibmplexsans fw-600 mb-0">
                  <a href={item.url}>{item.title}</a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}