// import React, { useEffect, useRef, useState } from "react";
// import "./school_list.css";
// import { useStoreContext } from "@/context/StoreContext";
// export default function SchoolList() {
//     const { normalizePath } = useStoreContext();
//     const [activeIndex, setActiveIndex] = useState(0);
//     const sliderRef = useRef<any>(null);

//     const schools = [
//         {
//             title: "EMASI NAM LONG",
//             address: "Khu dân cư Nam Long, Quận 7, TP.HCM",
//             link: "https://emasi.pixelcent.com/emasi-nam-long/",
//             image: "/assets/images/banner/3-1.jpg",
//         },
//         {
//             title: "EMASI VẠN PHÚC",
//             address: "Khu đô thị Vạn Phúc, Thủ Đức, TP.HCM",
//             link: "https://emasi.pixelcent.com/emasi-van-phuc/",
//             image: "/assets/images/banner/2-1.jpg",
//         },
//         {
//             title: "EMASI PLUS WATERPOINT",
//             address: "Khu đô thị Waterpoint, Long An",
//             link: "https://emasiplus.edu.vn/truong-noi-tru-song-ngu-quoc-te-emasi-plus-waterpoint/",
//             image: "/assets/images/banner/1-2.jpg",
//         },
//         {
//             title: "",
//             address: "",
//             link: "#",
//             image: "/assets/images/banner/CIPUTRA.jpg",
//         },
//     ];

//     const programmaticChangeRef = useRef(false);

//     useEffect(() => {
//         const $ = (window as any).$;

//         if ($?.fn?.slick && !$(".schools-slider").hasClass("slick-initialized")) {
//             sliderRef.current = $(".schools-slider");

//             sliderRef.current.slick({
//                 vertical: true,
//                 slidesToShow: 4,
//                 slidesToScroll: 1,
//                 arrows: false,
//                 infinite: false,
//                 focusOnSelect: false,
//                 swipe: true,
//                 draggable: true,
//             });

//             // Slick → React sync
//             sliderRef.current.on("afterChange", (_: any, __: any, current: number) => {
//                 if (programmaticChangeRef.current) {
//                     programmaticChangeRef.current = false;
//                     return;
//                 }

//                 setActiveIndex(current);
//             });
//         }
//     }, []);

//     // 🔥 IMPORTANT: FORCE CONTROL SLIDER FROM HOVER
//     const handleHover = (index: number) => {
//         setActiveIndex(index);
//         programmaticChangeRef.current = true;

//         if (sliderRef.current) {
//             sliderRef.current.slick("slickGoTo", index, true);
//         }
//     };

//     return (
//         <section id="campus" className="sc-school-list">
//             <div className="container-fluid pe-0 ps-90 container-2560">
//                 <div className="schools d-flex">

//                     {/* LEFT */}
//                     <div className="schools-slider" data-aos="fade-right">
//                         {schools.map((item, index) => (
//                             <div
//                                 key={index}
//                                 className={`slide ${activeIndex === index ? "active" : ""}`}
//                                 onMouseEnter={() => handleHover(index)}
//                             >
//                                 <a
//                                     href={item.link}
//                                     className={`box box-${index + 1}`}
//                                 >
//                                     <div className="inner-box">
//                                         <img
//                                             src="/assets/images/demo/icon-marker-large.png"
//                                             alt=""
//                                         />
//                                         <div className="content">
//                                             <h3 className="h3-title text-white mb-0">
//                                                 {item.title}
//                                             </h3>

//                                             {item.address && (
//                                                 <div className="address text-white">
//                                                     {item.address}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </a>
//                             </div>
//                         ))}
//                     </div>

//                     {/* RIGHT */}
//                     <div className="school-img">
//                         <a href={schools[activeIndex]?.link}>
//                             <img
//                                 src={schools[activeIndex]?.image}
//                                 alt={schools[activeIndex]?.title}
//                             />
//                         </a>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     );
// }
import React, { useEffect, useRef, useState } from "react";
import "./school_list.css";
import { useStoreContext } from "@/context/StoreContext";

interface SchoolListProps {
  data?: {
    listSchoolItem?: Array<{
      title?: string;
      subTitle?: string;
      image?: {
        node?: {
          sourceUrl?: string;
        };
      };
      link?: {
        url?: string;
        target?: string;
      };
    }>;
  };
}

export default function SchoolList({ data }: SchoolListProps) {
  const { normalizePath } = useStoreContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<any>(null);
  const programmaticChangeRef = useRef(false);

  // Lấy dữ liệu từ WordPress
  const schools = data?.listSchoolItem || [];

  useEffect(() => {
    const $ = (window as any).$;
    if (!schools.length) return;

    if ($?.fn?.slick && !$(".schools-slider").hasClass("slick-initialized")) {
      sliderRef.current = $(".schools-slider");

      sliderRef.current.slick({
        vertical: true,
        slidesToShow: Math.min(schools.length, 4), // Tránh lỗi nếu ít hơn 4 items
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        focusOnSelect: false,
        swipe: true,
        draggable: true,
      });

      sliderRef.current.on("afterChange", (_: any, __: any, current: number) => {
        if (programmaticChangeRef.current) {
          programmaticChangeRef.current = false;
          return;
        }
        setActiveIndex(current);
      });
    }
  }, [schools.length]);

  const handleHover = (index: number) => {
    setActiveIndex(index);
    programmaticChangeRef.current = true;
    if (sliderRef.current) {
      sliderRef.current.slick("slickGoTo", index, true);
    }
  };

  if (!schools.length) return null;

  return (
    <section id="campus" className="sc-school-list">
      <div className="container-fluid pe-0 ps-90 container-2560">
        <div className="schools d-flex">
          {/* LEFT: SLIDER */}
          <div className="schools-slider" data-aos="fade-right">
            {schools.map((item, index) => (
              <div
                key={index}
                className={`slide ${activeIndex === index ? "active" : ""}`}
                onMouseEnter={() => handleHover(index)}
              >
                <a
                  href={normalizePath(item.link?.url)}
                  className={`box box-${index + 1}`}
                  target={item.link?.target || "_self"}
                >
                  <div className="inner-box">
                    <img src="/assets/images/demo/icon-marker-large.png" alt="" />
                    <div className="content">
                      <h3 className="h3-title text-white mb-0">{item.title}</h3>
                      {item.subTitle && (
                        <div className="address text-white">{item.subTitle}</div>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          {/* RIGHT: IMAGE */}
          <div className="school-img">
            {schools[activeIndex] && (
              <a href={normalizePath(schools[activeIndex].link?.url)}>
                <img
                  src={schools[activeIndex].image?.node?.sourceUrl}
                  alt={schools[activeIndex].title}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}