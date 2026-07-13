
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./university.css";

export default function University({ data }: { data: any }) {
  // Lặp lại mảng partners nếu ít hơn 8
  let partners = data.partners || [];
  if (partners.length > 0 && partners.length < 8) {
    partners = [...partners, ...partners]; 
  }

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } }
    ]
  };

  return (
    <>
      <section className="sc-university">
        <div className="inner-container">
          <div className="sc-header">
            <h2 
              data-aos="fade-down" 
              className="h2-title fw-300 text-center mb-0 color-4c4c4c text-uppercase"
              dangerouslySetInnerHTML={{ __html: data.title }} 
            />
            <div data-aos="fade-down" className="desc fw-300 text-center">{data.desc}</div>
          </div>
          {data.mapImage?.node?.sourceUrl && (
            <div className="sc-map text-center" data-aos="zoom-in-down">
              <img src={data.mapImage.node.sourceUrl} alt={data.title} />
            </div>
          )}
        </div>
      </section>

      <section className="sc-logos-university" data-aos="zoom-in-up">
        <div className="container-fluid px-0 container-2560">
          <Slider {...sliderSettings} className="logos-university-slider">
            {partners.map((partner: any, idx: number) => (
              <div key={idx} className="slide-logo">
                <div className="logo">
                  <img src={partner.image?.node?.sourceUrl} alt="Partner" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
}