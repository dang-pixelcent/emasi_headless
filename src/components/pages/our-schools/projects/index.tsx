import React from "react";
import { useEffect, useState } from "react";
import "./projects.css";

const projects = [
  {
    image: "/assets/images/demo/our-schools/projects/1-2.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/science-and-engineering-fair-with-their-project-on-recycling-pig-bones-as-a-useful-material-for-bean-sprout/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/2-2.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/science-and-engineering-fair-with-their-project-on-scientific-meal-personalization/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/3-2.jpg",
    link: "https://emasi.pixelcent.com/uncategorized-vi/science-and-engineering-fair-with-their-project-on-drone-design-for-water-rescue-buoy-delivery/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/4-5.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/science-and-engineering-fair-with-their-project-on-organic-dish-soap-from-soapberries-and-litsea-glusinosa-a-green-solution-for-modern-life/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/5-2.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/science-and-engineering-fair-with-their-project-on-the-dings-comic/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/6.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/science-and-engineering-fair-with-their-project-on-the-role-of-education-in-shaping-and-fostering-patriotism/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/7.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/first-prize-in-the-emasi-science-engineering-fair-with-their-project-on-smiling-depression/",
  },
  {
    image: "/assets/images/demo/our-schools/projects/8.jpg",
    link: "https://emasi.pixelcent.com/du-an-hoc-sinh/science-and-engineering-fair-with-their-project-on-board-game-for-people-with-anxiety-disorders/",
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const $ = (window as any).jQuery;

    if (!$.fn?.slick) return;

    const $slider = $(".projects-slider");

    if ($slider.hasClass("slick-initialized")) {
      $slider.slick("unslick");
    }

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      dots: false,
      autoplay: false,

      prevArrow: ".projects-nav .slick-prev",
      nextArrow: ".projects-nav .slick-next",

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 576,
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
    <section className="sc-projects">
      <div className="inner-container">
        <h2
          data-aos="fade-down"
          className="h2-title f-opensans fw-light mb-0"
        >
          Dự án <span>HỌC SINH</span>
        </h2>
      </div>

      <div className="container-fluid container-2560">
        {/* <div className="row"> */}
        <div>
          <div className="header-sep-bg">
            <img
              src="/assets/images/mark-project.png"
              alt=""
            />
          </div>

          <div
            className="projects-wrapper"
            data-aos="fade-up"
          >
            <div className="projects-slider">
              {projects.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.link}
                    className="item-img"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={item.image} alt="" />
                  </a>
                </div>
              ))}
            </div>

            <div className="projects-nav">
              <button
                type="button"
                className="slick-arrow slick-prev"
              >
                <svg
                  fill="#cccccc"
                  width="20"
                  height="20"
                  viewBox="0 0 330 330"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
                    c-5.857,5.858-5.857,15.355,0.001,21.213
                    C82.322,328.536,86.161,330,90,330
                    s7.678-1.464,10.607-4.394
                    l149.999-150.004
                    c2.814-2.813,4.394-6.628,4.394-10.606
                    C255,161.018,253.42,157.202,250.606,154.389z"
                  />
                </svg>
              </button>

              <div className="projects-dots">
                <span className="current">{current}</span>
                {" | "}
                <span className="total">{projects.length}</span>
              </div>

              <button
                type="button"
                className="slick-arrow slick-next"
              >
                <svg
                  fill="#cccccc"
                  width="20"
                  height="20"
                  viewBox="0 0 330 330"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
                    c-5.857,5.858-5.857,15.355,0.001,21.213
                    C82.322,328.536,86.161,330,90,330
                    s7.678-1.464,10.607-4.394
                    l149.999-150.004
                    c2.814-2.813,4.394-6.628,4.394-10.606
                    C255,161.018,253.42,157.202,250.606,154.389z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}