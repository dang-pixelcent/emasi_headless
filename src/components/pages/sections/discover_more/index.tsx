
import React from "react";
import "./discover_more.css";
import { useStoreContext } from "@/context/StoreContext";

export interface DiscoverItem {
  image?: { node: { sourceUrl: string; altText?: string } } | null;
  title?: string;
  link?: { url: string; title?: string } | null;
}

export interface DiscoverProps {
  data?: {
    __typename?: string;
    title?: string;
    list?: DiscoverItem[];
  };
  lang?: string; // Nhận thêm prop ngôn ngữ (mặc định 'vi')
}

// Mảng dữ liệu mặc định (Fallback)
const getDefaultItems = (lang: string) => {
  const isEn = lang === 'vi';
  return [
    {
      title: isEn ? "EMASI officially achieves full WASC accreditation!" : "EMASI chính thức đạt kiểm định quốc tế WASC toàn phần!",
      link: { url: "/tin-tuc/emasi-dat-kiem-dinh-wasc-toan-phan/" },
      image: { node: { sourceUrl: "/assets/images/demo/our-schools/news_events/untitled-2.jpg" } }
    },
    {
      title: isEn ? "EMASI NAM LONG SPRING FESTIVAL 2025: SAIGON TET RETRO" : "HỘI XUÂN EMASI NAM LONG 2025: SAIGON TET RETRO",
      link: { url: "/tin-tuc/hoi-xuan-emasi-nam-long-2025-saigon-tet-retro-2/" },
      image: { node: { sourceUrl: "/assets/images/demo/our-schools/news_events/av1-2.png" } }
    },
    {
      title: isEn ? "Spring Festival 2025 at EMASI Van Phuc: New Year, New Me" : "Hội xuân Ất Tỵ 2025 tại EMASI Vạn Phúc “New Year, New Me”",
      link: { url: "/tin-tuc/hoi-xuan-at-ty-2025-tai-emasi-van-phuc-new-year-new-me/" },
      image: { node: { sourceUrl: "/assets/images/demo/our-schools/news_events/resize-3_1920x680-scaled.jpg" } }
    }
  ];
};

export default function Discover({ data, lang="en" }: DiscoverProps) {
  const { normalizePath } = useStoreContext();
  
  // Dùng dữ liệu từ WP nếu có, không thì lấy mặc định theo ngôn ngữ
  const hasData = data?.list && data.list.length > 0;
  const discoverList = hasData ? data!.list : getDefaultItems(lang);
  console.log(lang);
  // Tiêu đề động
  const sectionTitle = data?.title || (lang === 'vi' ? "Discover More" : "Khám phá thêm");

  return (
    <section className="sc-discorver">
      <div className="inner-container">
        <div className="sc-header">
          <h2 className="h2-title text-center f-ibmplexsans fw-600 mb-0" data-aos="fade-up">
            {sectionTitle}
          </h2>
        </div>

        <div className="list d-flex flex-wrap">
          {discoverList.map((item, index) => {
            const imageUrl = item.image?.node?.sourceUrl || "";
            const itemUrl = item.link?.url || "#";
            const title = item.title || "";

            return (
              <div className="item" key={index} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                <figure>
                  <a href={normalizePath(itemUrl)}>
                    <img src={imageUrl} alt={item.image?.node?.altText || title} />
                  </a>
                </figure>
                <div className="content">
                  <h3 className="h3-title text-center f-ibmplexsans fw-600 mb-0">
                    <a href={normalizePath(itemUrl)}>{title}</a>
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}