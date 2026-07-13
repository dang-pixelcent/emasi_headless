
import React from "react";
import "./emasi_about.css";
import { useStoreContext } from "@/context/StoreContext";

interface EmasiAboutProps {
  data?: {
    title?: string;
    subTitle?: string;
    desc: string;
    image?: {
      node?: {
        sourceUrl?: string;
      };
    };
    button?: {
      title?: string;
      url?: string;
      target?: string;
    };
  };
}

export default function EmasiAbout({ data }: EmasiAboutProps) {
  const { normalizePath } = useStoreContext();

  if (!data) return null;

  const imgUrl = data.image?.node?.sourceUrl || "/assets/images/demo/image-colors.png";
  const btn = data.button;

  return (
    <section className="sc-about-emasi pt-0 m-px">
      <div className="inner-container">
        <div className="d-flex flex-wrap justify-content-between">

          {/* CỘT TRÁI */}
          <div className="col-left" data-aos="fade-right">
            <img
              className="ab-img-left"
              data-aos="fade-down"
              src={imgUrl}
              alt={data.title || "EMASI"}
            />

            {data.title && (
              <h2 className="h2-title fs-72 color-004d6c fw-bold">
                {data.title}
              </h2>
            )}

            {data.subTitle && (
              <div
                className="sub-title fs-46 fw-bold color-004d6c"
                dangerouslySetInnerHTML={{ __html: data.subTitle }}
              />
            )}

            <div className="sep"></div>
          </div>

          {/* CỘT PHẢI */}
          <div className="col-right" data-aos="fade-left" data-aos-delay="150">
            <img
              className="ab-img-right"
              data-aos="fade-down"
              data-aos-delay="150"
              src={imgUrl}
              alt="EMASI"
            />

            <div className="desc fw-300">
              {/* Nếu bạn muốn field mô tả này cũng là CMS, 
                   hãy thêm field vào ACF và thay nội dung tĩnh dưới đây bằng biến data */}
              {/* Trường Quốc tế Song ngữ EMASI tiên phong kiến tạo môi trường giáo dục khai phóng... */}
              {data.desc}
            </div>

            {btn?.url && (
              <div className="sep">
                <a
                  href={normalizePath(btn.url)}
                  target={btn.target || "_self"}
                >
                  {btn.title || "Tìm hiểu thêm"}
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}