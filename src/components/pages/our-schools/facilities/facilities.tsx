import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import './facilities.css';

export type GalleryItem = {
  src: string;
  thumb: string;
};

export type FacilityItem = {
  id: number;
  title: string;
  icon: string;
  iconHover: string;
  description: string;
  gallery: GalleryItem[];
};

function Arrow(props: any) {
  const { className, customClass, onClick } = props;

  return (
    <button
      type="button"
      className={`${className} ${customClass}`}
      onClick={onClick}
    >
      <svg fill="#cccccc" width="20" height="20" viewBox="0 0 330 330">
        <path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z" />
      </svg>
    </button>
  );
}

const facilities: FacilityItem[] = [
  {
    id: 62023,
    title: "Học thuật",
    icon: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/hoc-thuat.svg",
    iconHover: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/hoc-thuat-XANH.svg",
    description: "Học thuật là nền tảng cốt lõi...",
    gallery: [
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/DJI_0845-scaled.jpg",
        thumb: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/DJI_0845-1024x767.jpg",
      },
    ]
  },
  {
    id: 62033,
    title: "Tiện ích & Gắn kết cộng đồng",
    icon: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/cong-dong-gan-ket.svg",
    iconHover: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/cong-dong-gan-ket-XANH.svg",
    description: "Môi trường học tập gắn kết cộng đồng...",
    gallery: [
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0349-1-scaled.jpg",
        thumb: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0349-1-1024x683.jpg",
      }
    ],
  },
  {
    id: 62030,
    title: "Thể chất & Sức khoẻ",
    icon: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/the-chat.svg",
    iconHover:
      "https://emasi.pixelcent.com/wp-content/uploads/2025/04/the-chat-XANH-1.svg",
    description:
      "EMASI tin rằng vận động thể chất bên cạnh trau dồi tinh thần là yếu tố không thể thiếu trong quá trình phát triển toàn diện. Trường sở hữu hệ thống thể thao bao gồm Hồ bơi, Sân bóng, Phòng thể chất đa năng và Khu leo núi trong nhà, tạo điều kiện để học sinh rèn luyện thể lực, tăng cường sức bền và xây dựng tinh thần đồng đội. Các hoạt động thể thao cũng được tích hợp vào thời khoá biểu hằng ngày, góp phần cải thiện sức khỏe, từ đó nâng cao hiệu quả học tập.",
    gallery: [
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0349-1-scaled.jpg",
        thumb:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0349-1-1024x683.jpg",
      },
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/6G9A0420-scaled.jpg",
        thumb:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/05/6G9A0420-1024x683.jpg",
      },
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/AW0A7221_Select_1-1-scaled.jpg",
        thumb:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/05/AW0A7221_Select_1-1-1024x683.jpg",
      },
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0096-scaled.jpg",
        thumb:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0096-1024x683.jpg",
      },
    ],
  },
  {
    id: 62028,
    title: "Nghệ thuật & Sáng tạo",
    icon: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/nghe-thuat.svg",
    iconHover: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/nghe-thuat-XANH.svg",
    description: "Không gian sáng tạo nghệ thuật...",
    gallery: [
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/AW0A7221_Select_1-1-scaled.jpg",
        thumb: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/AW0A7221_Select_1-1-1024x683.jpg",
      },
    ]
  },
  {
    id: 62025,
    title: "Khoa học",
    icon: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/khoa-hoc.svg",
    iconHover: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/khoa-hoc-XANH.svg",
    description: "Không gian nghiên cứu khoa học hiện đại...",
    gallery: [
      {
        src: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0096-scaled.jpg",
        thumb: "https://emasi.pixelcent.com/wp-content/uploads/2025/05/ONG0096-1024x683.jpg",
      }
    ],
  }
];

export default function Facilities() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);

  const mainRef = useRef<Slider | null>(null);
  const navRef = useRef<Slider | null>(null);
  const titleRef = useRef<Slider | null>(null);

  // IMPORTANT: force rerender sync after mount
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const activeFacility = facilities[activeIndex];

  const handleChangeFacility = (index: number) => {
    setActiveIndex(index);
    setCurrentSlide(0);

    mainRef.current?.slickGoTo(0);
    navRef.current?.slickGoTo(0);
  };

  const titleSettings = {
    vertical: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    asNavFor: ready ? mainRef.current || undefined : undefined,
    prevArrow: <Arrow customClass="title-slider-prev" />,
    nextArrow: <Arrow customClass="title-slider-next" />,
  };

  const mainSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true,
    arrows: false,
    asNavFor: ready ? navRef.current || undefined : undefined,
  };

  const navSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    focusOnSelect: true,
    arrows: false,
    asNavFor: ready ? mainRef.current || undefined : undefined,
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };


  return (
    <section className="sc-our-schools-facilities">
      <div className="container-fluid pe-0 ps-90 container-2048">
        <div className="main-facilities position-relative">
          {/* LEFT - MAIN GALLERY */}
          <div
            className="facilities-left aos-init aos-animate"
            data-aos="fade-down"
          >
            <Slider
              ref={mainRef}
              {...mainSettings}
              className="facilities-slider"
              afterChange={(index) => setCurrentSlide(index)}
            >
              {activeFacility.gallery.map((img, index) => (
                <div key={index}>
                  <img src={img.src} alt="" />
                </div>
              ))}
            </Slider>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="facilities-right pe-305x position-absolute h-100">
            <div className="facilities-content">
              <div className="m-cus-header">
                <div
                  className="sub-title fw-light text-white aos-init aos-animate"
                  data-aos="fade-down"
                >
                  Cơ Sở Vật Chất
                </div>

                <h2
                  id="subtitle-facilities"
                  className="h2-title fw-bold aos-init aos-animate"
                  data-aos="fade-down"
                >
                  {activeFacility.title}
                </h2>
              </div>

              <div className="m-cus-slider show-only-mobile">
                <div
                  id="description-facilities"
                  className="desc fw-light text-white aos-init aos-animate"
                  data-aos="fade-down"
                >
                  {activeFacility.description}
                </div>

                {/* NAV SLIDER (FACILITY SELECTOR) */}
                <div className="m-title-slider aos-init aos-animate">
                  <div className="title-slider slick-vertical">
                    {facilities.map((item, index) => {
                      const isActive = index === activeIndex;

                      return (
                        <div
                          key={item.id}
                          className={`slide ${isActive ? "active" : ""}`}
                          onClick={() => handleChangeFacility(index)}
                          data-aos="fade-down"
                        >
                          <div className="item">
                            <figure>
                              <img src={item.icon} alt="" />
                              <img
                                className="icon-hover"
                                src={item.iconHover}
                                alt=""
                              />
                            </figure>
                            <div className="title">{item.title}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* PAGINATION */}
            <div
              className="m-nav-pagination"
              data-aos="fade-up"
            >
              <div className="cus-dots">
                <span className="dot-current">{currentSlide + 1}</span>
                {" | "}
                <span className="total-slides">
                  {activeFacility.gallery.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV (RIGHT SIDE BIG SLIDER NAV) */}
        <div className="facility-nav ps-215 d-flex">

          {/* LEFT TITLE NAV */}
          <div className="d-title-slider show-only-desktop">
            <Slider
              ref={titleRef}
              {...titleSettings}
              className="title-slider"
            >
              {facilities.map((item) => (
                <div
                  key={item.id}
                  data-id={item.id}
                >
                  <div className="item">
                    <figure>
                      <img src={item.icon} alt={item.title} />
                      <img
                        className="icon-hover"
                        src={item.iconHover}
                        alt={item.title}
                      />
                    </figure>

                    <div className="title">
                      {item.title}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* RIGHT GALLERY */}
          <div
            className="nav-slider-wrap"
            data-aos="fade-left"
          >
            <Slider
              ref={navRef}
              {...navSettings}
              className="nav-slider"
            >
              {activeFacility.gallery.map((img, index) => (
                <div key={index}>
                  <img src={img.thumb} alt="" />
                </div>
              ))}
            </Slider>

            <div className="nav-pagination">
              <Arrow className="slick-arrow slick-prev" onClick={() => navRef.current?.slickPrev()}/>
              <div className="cus-dots">
                <span className="dot-current">{currentSlide + 1}</span>
                {" | "}
                <span className="total-slides">
                  {activeFacility.gallery.length}
                </span>
              </div>
             <Arrow className="slick-arrow slick-next" onClick={() => navRef.current?.slickNext()}/>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};