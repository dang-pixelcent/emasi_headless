// import React from "react";
// import "./news_events.css";

// const news = [
//   {
//     title: "EMASI chính thức đạt kiểm định quốc tế WASC toàn phần!",
//     image:
//       "/assets/images/demo/our-schools/news_events/untitled-2.jpg",
//     link: "https://emasi.pixelcent.com/tin-tuc/emasi-dat-kiem-dinh-wasc-toan-phan/",
//   },
//   {
//     title: "HỘI XUÂN EMASI NAM LONG 2025: SAIGON TET RETRO",
//     image:
//       "/assets/images/demo/our-schools/news_events/av1-2.png",
//     link: "https://emasi.pixelcent.com/tin-tuc/hoi-xuan-emasi-nam-long-2025-saigon-tet-retro-2/",
//   },
//   {
//     title:
//       "Hội xuân Ất Tỵ 2025 tại EMASI Vạn Phúc “New Year, New Me”",
//     image:
//       "/assets/images/demo/our-schools/news_events/resize-3_1920x680-scaled.jpg",
//     link: "https://emasi.pixelcent.com/tin-tuc/hoi-xuan-at-ty-2025-tai-emasi-van-phuc-new-year-new-me/",
//   },
// ];

// export default function News() {
//   const featured = news[0];
//   const list = news.slice(1);

//   return (
//     <section className="sc-news">
//       <div className="inner-container">
//         {/* HEADER */}
//         <div className="sc-header">
//           <h2
//             data-aos="fade-down"
//             data-aos-delay={150}
//             className="h2-title f-opensans fw-light color-4C4C4C mb-0"
//           >
//             Tin tức & <span>Sự Kiện</span>
//           </h2>
//         </div>

//         {/* NEWS */}
//         <div className="news-list row d-flex flex-wrap">
//           {/* FEATURED */}
//           {featured && (
//             <div
//               className="col col-feature-news"
//               data-aos="fade-left"
//               data-aos-delay={150}
//             >
//               <figure>
//                 <a href={featured.link}>
//                   <img src={featured.image} alt={featured.title} />
//                 </a>
//               </figure>

//               <div className="content">
//                 <h3 className="h3-title f-opensans fw-500">
//                   <a href={featured.link}>{featured.title}</a>
//                 </h3>

//                 <div className="sc-btn">
//                   <a href={featured.link}>--&gt; Find out more</a>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* LIST */}
//           <div className="col col-list" data-aos="zoom-in-left">
//             {list.map((item, index) => (
//               <div className="item" key={index}>
//                 <figure>
//                   <a href={item.link}>
//                     <img src={item.image} alt={item.title} />
//                   </a>
//                 </figure>

//                 <div className="content">
//                   <h3 className="h3-title f-opensans fw-500">
//                     <a href={item.link}>{item.title}</a>
//                   </h3>

//                   <div className="sc-btn">
//                     <a href={item.link}>--&gt; Find out more</a>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {/* BUTTON FIX CỨNG */}
//             <div className="sc-btn sc-btn-all ms-auto">
//               <a href="#">
//                 <img
//                   src="/assets/images/custom-arrow-right.svg"
//                   alt=""
//                 />
//                 View all news and events
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import "./news_events.css";

// 1. Khai báo Interface cho dữ liệu
interface PostNode {
  id?: string;
  title?: string;
  uri?: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

interface NewsProps {
  data?: {
    title?: string;
    subTitle?: string;
    link?: {
      url?: string;
      target?: string;
      title?: string;
    };

    postsItem?: Array<{
      postTinTuc?: {
        nodes?: PostNode[];
      };
    }>;
  };
}
import { useStoreContext } from "@/context/StoreContext";
export default function News({ data }: NewsProps) {
  // Tránh render nếu không có dữ liệu
  if (!data) return null;

  // 2. Bóc tách dữ liệu bài viết từ mảng postsItem lồng nhau
  const posts: PostNode[] = (data.postsItem || []).reduce((acc: PostNode[], current) => {
    // Lấy node đầu tiên trong mảng nodes của postTinTuc
    const node = current?.postTinTuc?.nodes?.[0];
    if (node) {
      acc.push(node);
    }
    return acc;
  }, []);

  const featured = posts[0];
  const list = posts.slice(1);
  const { normalizePath } = useStoreContext();
  // Link xem tất cả
  const viewAllUrl = data.link?.url || "#";
  const viewAllTarget = data.link?.target || "_self";

  return (
    <section className="sc-news">
      <div className="inner-container">
        {/* HEADER */}
        <div className="sc-header">
          {data.title && (
            <h2
              data-aos="fade-down"
              data-aos-delay={150}
              className="h2-title f-opensans fw-light color-4C4C4C mb-0"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          )}
        </div>

        {/* NEWS LIST */}
        {posts.length > 0 && (
          <div className="news-list row d-flex flex-wrap">

            {/* FEATURED NEWS */}
            {featured && (
              <div
                className="col col-feature-news"
                data-aos="fade-left"
                data-aos-delay={150}
              >
                {featured.featuredImage?.node?.sourceUrl && (
                  <figure>
                    <a href={normalizePath(featured.uri) || "#"}>
                      <img
                        src={featured.featuredImage.node.sourceUrl}
                        alt={featured.title || "News Image"}
                      />
                    </a>
                  </figure>
                )}

                <div className="content">
                  <h3 className="h3-title f-opensans fw-500">
                    <a href={featured.uri || "#"}>{featured.title}</a>
                  </h3>

                  <div className="sc-btn">
                    <a href={featured.uri || "#"}>--&gt; Find out more</a>
                  </div>
                </div>
              </div>
            )}

            {/* LIST NEWS */}
            <div className="col col-list" data-aos="zoom-in-left">
              {list.map((item, index) => {
                const itemImg = item.featuredImage?.node?.sourceUrl || "/assets/images/placeholder.jpg";
                const itemLink = normalizePath(item.uri) || "#";

                return (
                  <div className="item" key={index}>
                    <figure>
                      <a href={itemLink}>
                        <img src={itemImg} alt={""} />
                      </a>
                    </figure>

                    <div className="content">
                      <h3 className="h3-title f-opensans fw-500">
                        <a href={itemLink}>{item.title}</a>
                      </h3>

                      <div className="sc-btn">
                        <a href={itemLink}>--&gt; Find out more</a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* VIEW ALL BUTTON */}
              {data.link && (
                <div className="sc-btn sc-btn-all ms-auto">
                  <a href={normalizePath(viewAllUrl)} target={viewAllTarget}>
                    <img
                      src="/assets/images/custom-arrow-right.svg"
                      alt="arrow right"
                    />
                    {data.link.title || "View all news and events"}
                  </a>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}