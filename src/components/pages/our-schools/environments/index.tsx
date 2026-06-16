import React from "react";
import "./environments.css";

const environmentItems = [
  {
    title: "Bảo chứng chất lượng",
    color: "bed62f",
    desc: "bởi Tổ chức Kiểm định giáo dục danh giá",
    image:
      "/assets/images/demo/our-schools/environments/wascLOGO_FullyAccredited_WHITE.png",
    link: "https://emasi.pixelcent.com/kiem-dinh-quoc-te-wasc-toan-phan/",
  },
  {
    title: "Trường Quốc tế Cambridge",
    color: "ffffff",
    desc: "Thành viên Tổ chức Giáo dục Quốc tế uy tín toàn cầu",
    image:
      "/assets/images/demo/our-schools/environments/logo-cambridge-1.png",
    link: "https://emasi.pixelcent.com/chuong-trinh-cambridge/",
  },
  {
    title: "Triết lý <br/> giáo dục",
    color: "bed62f",
    desc:
      "phát triển toàn diện về phẩm chất – tri thức – thể chất và tinh thần – năng lực",
  },
  {
    title: "Tích hợp <br/> Nghệ thuật <br/> vào Giáo dục",
    color: "ffffff",
    desc: "phối hợp độc quyền cùng Tổ chức Nguyen Art Foundation",
    image:
      "/assets/images/demo/our-schools/environments/NguyenArtFoundation_NewLogo_White-2-1-e1747124235542.png",
    link: "http://nguyenartfoundation.com",
  },
  {
    title: "Chương trình <br/> Song ngữ <br/> tích hợp",
    color: "ffffff",
    desc: "với hai lộ trình học tập",
  },
  {
    title: "Đội ngũ <br/> Sư phạm",
    color: "5bcbf5",
    desc: "giàu chuyên môn, kinh nghiệm và tâm huyết",
  },
  {
    title: "Cộng đồng trường",
    color: "ffffff",
    desc: "gắn kết sâu sắc và giàu lòng tự hào",
  },
  {
    title: "Cơ sở <br/> Vật chất",
    color: "5bcbf5",
    desc: "ưu việt tạo <br/> trải nghiệm <br/> vượt trội",
  },
];

export default function Environments() {
  return (
    <section
      className="sc-environments"
      style={{ backgroundColor: "#00364c" }}
    >
      <div className="inner-container">
        <div className="environments">
          <div className="sub-title fw-300 text-uppercase text-center" data-aos="fade-down">
            CHỌN EMASI
          </div>

          <h2 className="h2-title fw-bold text-white text-center" data-aos="fade-down">
            CHỌN MÔI TRƯỜNG PHÁT TRIỂN TOÀN DIỆN CHO CON
          </h2>

          <div className="lists d-flex flex-wrap" data-aos="fade-down" data-aos-delay="150">
            {environmentItems.map((item, index) => {
              const Tag = item.link ? "a" : "div";

              return (
                <Tag
                  key={index}
                  className="item"
                  {...(item.link
                    ? {
                        href: item.link,
                        target: "_self",
                      }
                    : {})}
                >
                  <div className="bg-overlay" />

                  <h3
                    className={`h3-title fw-bold mb-0 color-${item.color}`}
                    dangerouslySetInnerHTML={{
                      __html: item.title,
                    }}
                  />

                  <div className="desc fw-300 text-white">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.desc,
                      }}
                    />

                    {item.image && (
                      <img src={item.image} alt={item.title.replace(/<[^>]+>/g, "")} />
                    )}
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}