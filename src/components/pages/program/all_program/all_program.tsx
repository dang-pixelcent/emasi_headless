import React from "react";
import "./all_program.css";

const programs = [
  {
    image: "/assets/images/demo/program/program.png",
    title: (
      <>
        Chương trình <strong>MẪU GIÁO</strong>
      </>
    ),
    description:
      "Chương trình dành cho trẻ từ 3 – 5 tuổi xây dựng dựa trên chương trình Bộ GD&ĐT, chương trình Giáo dục Mầm non Anh Quốc (EYFS) và phương pháp giáo dục Monstessori. Trong môi trường giáo dục song ngữ quốc tế năng động của EMASI, trẻ phát triển toàn diện về tư duy – ngôn ngữ – kỹ năng – thể chất – tinh thần – cảm xúc, tạo nền tảng vững chắc cho hành trình học tập sau này.",
    link: "https://emasi.pixelcent.com/chuong-trinh-mau-giao/",
    linkColor: "#003e58",
    backgroundColor: "#90b30d",
    titleColor: "#003e58",
    position: "top-left",
    aosImage: "fade-right",
    aosInfo: "fade-left",
    logos: [
      "/assets/images/demo/program/logo-department-w.png",
      "/assets/images/demo/program/cambridge-logo.svg",
    ],
  },
  {
    image: "/assets/images/demo/program/2.png",
    title: (
      <>
        Chương trình <strong>TIỂU HỌC</strong>
      </>
    ),
    description:
      "Chương trình Tiểu học tại EMASI được đúc kết từ chương trình mới của Bộ GD&ĐT và Chương trình Tiểu học Quốc tế Cambridge. Đặc biệt, các phẩm chất của một công dân toàn cầu và nền tảng năng lực tiếng Anh được chú trọng trau dồi xuyên suốt hành trình Tiểu học của học sinh.",
    link: "https://emasi.pixelcent.com/chuong-trinh-tieu-hoc/",
    linkColor: "#ffffff",
    backgroundColor: "#44b0d7",
    titleColor: "#003e58",
    position: "top-left",
    aosImage: "fade-left",
    aosInfo: "fade-right",
    logos: [
      "/assets/images/demo/program/cambridge-logo.svg",
    ],
  },
  {
    image: "/assets/images/demo/program/3.png",
    title: (
      <>
        Chương trình <strong><br />TRUNG HỌC CƠ SỞ</strong>
      </>
    ),
    description:
      "Chương trình Trung học Cơ sở (Lớp 6 – Lớp 9) tại EMASI tích hợp Chương trình Bộ GD&ĐT Việt Nam kết hợp cùng Chương trình Quốc tế Cambridge. Hai lựa chọn lộ trình học tập đảm bảo học sinh được trải nghiệm giáo dục chất lượng và tối ưu với mình, từ đó thuận lợi khám phá và phát huy thế mạnh bản thân cả trong học tập lẫn phát triển bản thân. Học sinh lựa chọn lộ trình quốc tế sẽ có cơ hội theo đuổi chương trình Trung học Quốc tế IGCSE – giúp mở rộng kiến thức, tăng cường kỹ năng học thuật và chuẩn bị sẵn sàng cho các mục tiêu cao hơn.",
    link: "https://emasi.pixelcent.com/chuong-trinh-trung-hoc-co-so/",
    linkColor: "#43deff",
    backgroundColor: "#04768e",
    titleColor: "#43deff",
    position: "bottom-right",
    aosImage: "fade-right",
    aosInfo: "fade-left",
    logos: [
      "/assets/images/demo/program/cambridge-logo.svg",
      "/assets/images/demo/program/IGCSE_cover.jpeg",
    ],
  },
  {
    image: "/assets/images/demo/program/1.png",
    title: (
      <>
        Chương trình <strong><br />TRUNG HỌC PHỔ THÔNG</strong>
      </>
    ),
    description:
      "Ở bậc Trung học Phổ thông, học sinh EMASI lựa chọn theo đuổi lộ trình học tập song ngữ tích hợp hoặc tiếp tục theo học chương trình Trung học Quốc tế IGCSE và Tú Tài Anh A-Level ở lớp 11 và 12. Được chủ động trong lựa chọn chương trình học giúp học sinh tối ưu hóa thế mạnh cá nhân để chuẩn bị cho bậc đại học và tương lai. Khi tốt nghiệp, học sinh có thể nhận bằng tốt nghiệp EMASI, chứng chỉ A-Level hoặc bằng tốt nghiệp THPT cùng chứng chỉ IELTS – những văn bằng được công nhận toàn cầu, mở ra cánh cửa vào các trường đại học hàng đầu tại Việt Nam và thế giới.",
    link: "https://emasi.pixelcent.com/chuong-trinh-trung-hoc-pho-thong/",
    linkColor: "#ffffff",
    backgroundColor: "#003e58",
    titleColor: "#43deff",
    position: "bottom-left",
    aosImage: "fade-left",
    aosInfo: "fade-right",
    logos: [
      "/assets/images/demo/program/cambridge-logo.svg",
      "/assets/images/demo/program/IGCSE_cover.jpeg",
      "/assets/images/demo/program/alevels-logo1.png",
      "/assets/images/demo/program/logo-ielts.png",
    ],
  },
];

export default function AllProgramSection() {
  return (
    <section className="sc-all-program">
      <div className="container-fluid container-2560">
        <div className="row">
          {programs.map((program, index) => (
            <div className="main-program" key={index}>
              <div
                className="image"
                data-aos={program.aosImage}
                data-aos-delay="500"
              >
                <img src={program.image} alt="" />
              </div>

              <div
                className={`info-box ${program.position}`}
                style={{
                  background: program.backgroundColor,
                }}
                data-aos={program.aosInfo}
              >
                <div
                  className="title"
                  style={{ color: program.titleColor }}
                >
                  {program.title}
                </div>

                <div className="desc">{program.description}</div>

                <div className="learn-more">
                  <a
                    href={program.link}
                    style={{ color: program.linkColor }}
                  >
                    TÌM HIỂU THÊM
                  </a>

                  <div className="logo">
                    {program.logos.map((logo, logoIndex) => (
                      <img key={logoIndex} src={logo} alt="" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}