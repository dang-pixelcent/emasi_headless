import React from "react";
import './list_hoc_bong.css';

const scholarships = [
  {
    title: "Học bổng Tiểu học",
    link: "https://emasi.pixelcent.com/giai-thuong-tai-nang-emasi/",
    image:
      "/assets/images/demo/sections/list-hoc-bong/tai-nang-25-01-scaled.png",
  },
  {
    title: "Học bổng Khai Phóng",
    link: "https://emasi.pixelcent.com/hoc-bong-trung-hoc/",
    image:
      "/assets/images/demo/sections/list-hoc-bong/khai-phong.jpg",
  },
  {
    title: "Học bổng IGCSE & A-Level",
    link: "https://emasi.pixelcent.com/hoc-bong-igcse-a-level/",
    image:
      "/assets/images/demo/sections/list-hoc-bong/website-tv.jpg",
  },
];

export default function ListHocBong(){
    return (
        <section className="sc-list-hocbong p-0">
  <div className="inner-container p-0">
    <div
      className="list d-flex flex-wrap"
      data-aos="fade-up"
    >
      {scholarships.map((item, index) => (
        <div className="item" key={index}>
          <figure>
            <a href={item.link}>
              <img src={item.image} alt={item.title} />
            </a>
          </figure>

          <div className="content">
            <h3 className="h3-title text-center f-ibmplexsans fw-600 m-0">
              <a href={item.link}>{item.title}</a>
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    );
};