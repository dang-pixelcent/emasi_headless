// src/components/pages/sections/banner_plus/index.tsx
import React from 'react';
import './banner_plus.css';

interface BannerItem {
  image: string;
  focalPoint?: string;
  subTitle?: string;
  title?: string;
  description?: string;
}

// Mock Data để set cứng giao diện
const banners: BannerItem[] = [
  {
    image: '/assets/images/banner/1_2.png',
    focalPoint: 'center',
    subTitle: 'Đơn vị đi đầu',
    title: 'Học Bổng IGCSE & A-LEVEL',
    description: 'Dành cho học sinh lớp 8 và lớp 10 (tính theo năm học hiện tại)'
  }
];

const BannerPlus = () => {
  return (
    <>
      {banners.map((item, index) => (
        <section
          key={index}
          data-aos="fade-in"
          className="banner d-flex align-items-end py-0"
          style={{
            background: `no-repeat center/cover url('${item.image}')`,
            backgroundPosition: item.focalPoint || 'center'
          }}
        >
          <div className="container">
            <div className="inner-container">
              <div className="main-banner">
                {/* <div className="main-banner-inner">
                  {item.subTitle && <h2 className="sub-title">{item.subTitle}</h2>}
                  {item.title && <h1 className="h1-title">{item.title}</h1>}
                  {item.description && <p className="desc">{item.description}</p>}
                </div> */}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default BannerPlus;