import React from "react";
import "./badgets.css";

const items = [
  {
    title: "Sổ tay và Quy trình",
    icon: "/assets/images/demo/our-schools/badgets/b-icon-1.svg",
    link: "https://emasi.pixelcent.com/so-tay-quy-trinh/",
  },
  {
    title: "Lịch năm học",
    icon: "/assets/images/demo/our-schools/badgets/b-icon-2.svg",
    link: "https://emasi.pixelcent.com/lich-nam-hoc/",
  },
  {
    title: "Dịch vụ Học sinh",
    icon: "/assets/images/demo/our-schools/badgets/b-icon-3.svg",
    link: "https://emasi.pixelcent.com/dich-vu-hoc-sinh/",
  },
  {
    title: "Cựu Học sinh",
    icon: "/assets/images/demo/our-schools/badgets/b-icon-5.svg",
    link: "https://emasi.pixelcent.com/cuu-hoc-sinh-emasi/",
  },
  {
    title: "Đội ngũ Sư phạm",
    icon: "/assets/images/demo/our-schools/badgets/b-icon-6.svg",
    link: "https://emasi.pixelcent.com/doi-ngu-su-pham/",
  },
];

export default function Badgets() {
  const total = items.length;

  const cls = total > 6 ? "box8" : "flex-wrap";

  return (
    <section className="sc-badgets">
      <div className="container-fluid pe-0 ps-90">
        <div
          className={`boxies d-flex ${cls} justify-content-center`}
        >
          {items.map((item, index) => {
            const count = index + 1;

            return (
              <div
                key={count}
                className={`box box-${count}`}
                data-aos="fade-up"
                data-aos-delay={count * 150}
              >
                <a
                  href={item.link}
                  className="d-flex flex-column h-100 justify-content-center align-items-center text-center"
                >
                  {item.icon && (
                    <img src={item.icon} alt={item.title} />
                  )}
                  <div className="title fw-light text-white">
                    {item.title}
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}