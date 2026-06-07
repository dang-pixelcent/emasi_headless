import React from "react";
import { useEffect } from "react";
import "./university.css";

export default function University() {
  return (
    <>
      <section className="sc-university">
        <div className="inner-container">
          <div className="sc-header">
            <h2 className="h2-title fw-bold text-center mb-0 color-4c4c4c text-uppercase">
              Điểm đến <strong>Đại học</strong>
            </h2>

            <div className="desc fw-300 text-center">
              Với hành trang học thuật có được từ chương trình đào tạo EMASI,
              nền tảng năng lực hun đúc được tại môi trường giáo dục song ngữ
              đạt chuẩn quốc tế WASC cùng sự hỗ trợ sâu sát từ Chuyên viên Tư
              vấn Học đường, học sinh các khoá tốt nghiệp tại EMASI đạt thành
              tích học thuật nổi trội, tự tin theo đuổi nguyện vọng và trúng
              tuyển vào nhiều trường đại học danh giá hàng đầu thế giới.
            </div>
          </div>

          <div className="sc-map text-center" data-aos="zoom-in-down">
            <img
              src="https://emasi.pixelcent.com/wp-content/uploads/2025/02/map-img.png"
              alt="University map"
            />
          </div>
        </div>
      </section>
    </>
  );
}