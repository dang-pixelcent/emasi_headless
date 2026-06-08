import React from "react";
import "./about.css";

export default function OurSchoolsAbout() {
  return (
    <section className="sc-our-schools-about">
      <div className="inner-container">
        <div className="our-schools-about text-center">
          <h2
            data-aos="fade-up"
            className="h2-title fw-500"
          >
            Chào mừng đến với <strong>EMASI</strong>
          </h2>

          <div
            data-aos="fade-up"
            data-aos-delay={150}
            className="desc fw-500"
          >
            <p>
                Trường Quốc tế Song ngữ EMASI tiên phong kiến tạo môi trường giáo
                dục khai phóng, nơi học sinh được trang bị nền tảng toàn diện về
                phẩm chất – tri thức – thể lực và tinh thần – năng lực, mở ra tương
                lai hạnh phúc và thành công.
            </p>
            <p>
                Là thành viên của Tổ chức giáo dục Quốc tế Cambridge đồng thời là
                một trong số ít trường song ngữ tại Việt Nam đạt kiểm định quốc tế
                WASC toàn phần, EMASI cam kết mang đến một nền giáo dục quốc tế
                chuẩn mực: từ lộ trình học tập song ngữ tích hợp chương trình
                Cambridge và chương trình quốc gia được truyền tải bằng phương pháp
                giáo dục tối ưu trên thế giới bởi đội ngũ các nhà giáo dục giỏi
                chuyên môn, đến cộng đồng trường đa quốc tịch gắn kết và hệ thống
                cơ sở vật chất chuẩn quốc tế.
            </p>
          
          </div>
        </div>
      </div>
    </section>
  );
}