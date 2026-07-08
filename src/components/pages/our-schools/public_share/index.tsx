// import React, { useEffect, useState } from "react";
// import "./public_share.css";

// declare global {
//   interface Window {
//     jQuery: any;
//   }
// }

// export default function PublicShare() {
//   const [current, setCurrent] = useState(1);

//   const list = [
//     {
//       type: "default",
//       content:
//         "EMASI có nhiều môn học thú vị, thầy cô luôn khuyến khích con đặt câu hỏi. Các tiết học nghệ thuật và thể thao cũng rất vui, con vừa học, vừa chơi với các bạn rất vui. Con cảm thấy mình học được rất nhiều điều mới mỗi ngày!",
//       name: "Em Trần Selena - Học sinh Lớp 2E",
//       image: "/assets/images/demo/public_share/vu-vo.jpg",
//     },
//     {
//       type: "default",
//       content:
//         "EMASI mang đến môi trường học tập khuyến khích sự tò mò một cách tự nhiên và chú trọng sự phát triển cả học thuật lẫn cá nhân...",
//       name: "Thầy Edward Albert Todd - Giáo viên EAL",
//       image: "/assets/images/demo/public_share/ONG1604-scaled.jpg",
//     },
//     {
//       type: "video",
//       videoImage:
//         "/assets/images/demo/public_share/overlay-img-video.jpg",
//       videoIframe: `
//         <iframe width="640" height="360"
//           src="https://www.youtube.com/embed/QBZQB_joHLU"
//           frameborder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowfullscreen>
//         </iframe>
//       `,
//     },
//     {
//       type: "default",
//       content:
//         "EMASI đã trang bị cho em nền tảng kỹ năng và giá trị vững chắc...",
//       name: "Em Chu Thanh Bình - Cựu học sinh Lớp 12E",
//       image: "/assets/images/demo/public_share/cuu-hoc-sinh.jpg",
//     },
//     {
//       type: "default",
//       content:
//         "Môi trường tại EMASI thật thân thiện...",
//       name: "Cô Hồng Lan - Đội ngũ Hỗ trợ Học sinh",
//       image: "/assets/images/demo/public_share/ONG2205-scaled.jpg",
//     },
//   ];

//   useEffect(() => {
//     const $ = window.jQuery;
//     if (!$.fn?.slick) return;

//     const $slider = $(".testimonials-slider");

//     if ($slider.hasClass("slick-initialized")) {
//       $slider.slick("unslick");
//     }

//     $slider.slick({
//       slidesToShow: 2,
//       slidesToScroll: 1,
//       infinite: true,
//       arrows: true,
//       dots: false,
//       autoplay: false,
//       speed: 600,
//       prevArrow: ".testimonial-pagination .slick-prev",
//       nextArrow: ".testimonial-pagination .slick-next",
//       responsive: [
//         {
//           breakpoint: 992,
//           settings: {
//             slidesToShow: 1,
//           },
//         },
//       ],
//     });

//     $slider.on("afterChange", (_: any, __: any, currentIndex: number) => {
//       setCurrent(currentIndex + 1);
//     });

//     return () => {
//       if ($slider.hasClass("slick-initialized")) {
//         $slider.slick("unslick");
//       }
//     };
//   }, []);

//   return (
//     <section className="sc-share-public">

//       <div className="inner-container">

//         {/* TITLE */}
//         <h2
//           className="h2-title fw-300 color-ffffff text-center text-uppercase mb-0"
//           data-aos="fade-down"
//         >
//           <strong>Chia sẻ từ cộng đồng</strong>
//         </h2>

//         {/* SLIDER */}
//         <div
//           className="testimonials-slider"
//           data-aos="fade-left"
//         >
//           {list.map((item, index) => (
//             <div className="slide" key={index}>

//               {item.type === "default" && (
//                 <div className="testimonial d-flex flex-wrap align-items-stretch">

//                   <div className="col-content text-black">
//                     <div className="desc">{item.content}</div>
//                     <div className="author">{item.name}</div>
//                   </div>

//                   {item.image && (
//                     <div className="col-img">
//                       <img src={item.image} alt={item.name} />
//                     </div>
//                   )}

//                 </div>
//               )}

//               {item.type === "video" && (
//                 <div className="testimonial d-flex flex-wrap align-items-stretch only-video">

//                   <div className="col-content content-video text-black h-100">

//                     <div className="overlay-img-video d-flex">
//                       <img src={item.videoImage} alt="Video" />
//                     </div>

//                     <div className="icon-play">
//                       <img src="/assets/images/icon-play.png" alt="Play" />
//                     </div>

//                     <div
//                       className="play-video"
//                       dangerouslySetInnerHTML={{
//                         __html: item.videoIframe || "",
//                       }}
//                     />

//                   </div>
//                 </div>
//               )}

//             </div>
//           ))}
//         </div>

//         {/* PAGINATION */}
//         <div
//           className="testimonial-pagination"
//           // data-aos="fade-up"
//         >
//           <div className="pagination-controls">

//             <button className="slick-prev slick-arrow" aria-label="Previous">
//              <svg
//   fill="#cccccc"
//   width="20"
//   height="20"
//   viewBox="0 0 330 330"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z"
//   />
// </svg>
//             </button>

//             <div className="pagination text-white">
//               <span className="current">{current}</span> |{" "}
//               <span className="total">{list.length}</span>
//             </div>

//             <button className="slick-next slick-arrow" aria-label="Next">
//               <svg
//   fill="#cccccc"
//   width="20"
//   height="20"
//   viewBox="0 0 330 330"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z"
//   />
// </svg>
//             </button>

//           </div>
//         </div>

//       </div>

//     </section>
//   );
// }
import React, { useEffect, useState } from "react";
import "./public_share.css";

interface SharePublicProps {
  data?: {
    title?: string;
    listShare?: Array<{
      image?: {
        node?: {
          sourceUrl?: string;
        };
      };
      name?: string;
      desc?: string;
    }>;
  };
}

export default function PublicShare({ data }: SharePublicProps) {
  const [current, setCurrent] = useState(1);
  
  // Lấy dữ liệu từ props data, nếu không có thì trả về mảng rỗng
  const testimonials = data?.listShare || [];

  useEffect(() => {
    const $ = window.jQuery;
    if (!$.fn?.slick || testimonials.length === 0) return;

    const $slider = $(".testimonials-slider");

    if ($slider.hasClass("slick-initialized")) {
      $slider.slick("unslick");
    }

    $slider.slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      dots: false,
      autoplay: false,
      speed: 600,
      prevArrow: ".testimonial-pagination .slick-prev",
      nextArrow: ".testimonial-pagination .slick-next",
      responsive: [{ breakpoint: 992, settings: { slidesToShow: 1 } }],
    });

    $slider.on("afterChange", (_: any, __: any, currentIndex: number) => {
      setCurrent(currentIndex + 1);
    });

    return () => {
      if ($slider.hasClass("slick-initialized")) {
        $slider.slick("unslick");
      }
    };
  }, [testimonials.length]); // Chạy lại khi dữ liệu thay đổi

  if (!data) return null;

  return (
    <section className="sc-share-public">
      <div className="inner-container">
        {/* TITLE */}
        {data.title && (
          <h2
            className="h2-title fw-300 color-ffffff text-center text-uppercase mb-0"
            data-aos="fade-down"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
        )}

        {/* SLIDER */}
        <div className="testimonials-slider" data-aos="fade-left">
          {testimonials.map((item, index) => (
            <div className="slide" key={index}>
              <div className="testimonial d-flex flex-wrap align-items-stretch">
                <div className="col-content text-black">
                  <div className="desc">{item.desc}</div>
                  <div className="author">{item.name}</div>
                </div>

                {item.image?.node?.sourceUrl && (
                  <div className="col-img">
                    <img src={item.image.node.sourceUrl} alt={item.name || "Testimonial"} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="testimonial-pagination">
          <div className="pagination-controls">
            <button className="slick-prev slick-arrow" aria-label="Previous">
               <svg fill="#cccccc" width="20" height="20" viewBox="0 0 330 330"><path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z"/></svg>
            </button>

            <div className="pagination text-white">
              <span className="current">{current}</span> |{" "}
              <span className="total">{testimonials.length}</span>
            </div>

            <button className="slick-next slick-arrow" aria-label="Next">
               <svg fill="#cccccc" width="20" height="20" viewBox="0 0 330 330"><path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606C255,161.018,253.42,157.202,250.606,154.389z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}