
import React from "react";
import "./main_title.css";

interface MainTitleProps {
  data: {
    uri: string;
    title: string;
    subTitle?: string;
    desc?: string;
  };
  lang?: string; // Nhận thêm prop lang từ WPPage
}

export default function MainTitle({ data, lang = 'vi' }: MainTitleProps) {
  // Bộ từ điển nhỏ cho các text tĩnh
  const i18n = {
    vi: { home: "Trang chủ" },
    en: { home: "Home" }
  };

  const currentLang = (lang?.toLowerCase() === 'en' ? 'en' : 'vi') as 'vi' | 'en';

  return (
    <section className="sc-main-title">
      <div className="inner-container">
        {/* Breadcrumb */}
        <div className="header-content" data-aos="fade-up">
          <div className="breadcrumb text-uppercase">
            <a href="/" target="_self">{i18n[currentLang].home}</a>
            <span> - </span>
            <a href={data.uri} target="_self">{data.title}</a>
          </div>
        </div>

        {/* Nội dung chính */}
        {data.subTitle && (
          <h4 className="subtitle fw-300" data-aos="fade-up">{data.subTitle}</h4>
        )}
        
        <h4 className="title fw-bold" data-aos="fade-up">{data.title}</h4>
        
        {data.desc && (
          <div 
            className="blockquote fw-300" 
            data-aos="fade-up"
            dangerouslySetInnerHTML={{ __html: data.desc }} 
          />
        )}
      </div>
    </section>
  );
}