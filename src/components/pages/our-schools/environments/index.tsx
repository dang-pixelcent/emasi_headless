
import React from "react";
import "./environments.css";
import { useStoreContext } from "@/context/StoreContext";
// 1. Định nghĩa Interface khớp với GraphQL Schema của EnviromentLayout
interface EnvironmentsProps {
  data?: {
    subTitle?: string;
    title?: string;
    list?: Array<{
      title?: string;
      colorTitle?: string; // Khai báo field màu sắc (nhớ thêm field này vào GraphQL query nhé)
      desc?: string;
      image?: {
        node?: {
          sourceUrl?: string;
        };
      };
      link?: {
        url?: string;
      };
    }>;
  };
}
const colorPalette = ["ffffff", "bed62f", "5bcbf5"];
export default function Environments({ data }: EnvironmentsProps) {
  // Nếu không có dữ liệu thì không render gì cả
  if (!data) return null;
  const { normalizePath } = useStoreContext();
  const items = data.list || [];

  return (
    <section
      className="sc-environments"
      style={{ backgroundColor: "#00364c" }}
    >
      <div className="inner-container">
        <div className="environments">
          
          {/* SUB TITLE */}
          {data.subTitle && (
            <div className="sub-title fw-300 text-uppercase text-center" data-aos="fade-down">
              {data.subTitle}
            </div>
          )}

          {/* MAIN TITLE */}
          {data.title && (
            <h2 className="h2-title fw-bold text-white text-center" data-aos="fade-down">
              {data.title}
            </h2>
          )}

          {/* LIST ITEMS */}
          {items.length > 0 && (
            <div className="lists d-flex flex-wrap" data-aos="fade-down" data-aos-delay="150">
              {items.map((item, index) => {
                const itemLink = item.link?.url;
                const Tag = itemLink ? "a" : "div";
                const imgUrl = item.image?.node?.sourceUrl;

                // Xử lý class màu sắc: lấy màu từ ACF, nếu không có tự động fallback về màu trắng ffffff
                // (Hãy chắc chắn trong mục Choices của ACF Radio Button bạn điền "ffffff", "bed62f", "5bcbf5")
                const colorCode = item.colorTitle || colorPalette[index % colorPalette.length];
                return (
                  <Tag
                    key={index}
                    className="item"
                    {...(itemLink
                      ? {
                          href: normalizePath(itemLink),
                          target: "_self",
                        }
                      : {})}
                  >
                    <div className="bg-overlay" />

                    {/* TITLE CỦA ITEM */}
                    {item.title && (
                      <h3
                        className={`h3-title fw-bold mb-0 color-${colorCode}`}
                        dangerouslySetInnerHTML={{
                          __html: item.title,
                        }}
                      />
                    )}

                    {/* DESCRIPTION & IMAGE */}
                    <div className="desc fw-300 text-white">
                      {item.desc && (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.desc,
                          }}
                        />
                      )}

                      {imgUrl && (
                        <img 
                          src={imgUrl} 
                          alt={item.title ? item.title.replace(/<[^>]+>/g, "") : "environment image"} 
                        />
                      )}
                    </div>
                  </Tag>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}