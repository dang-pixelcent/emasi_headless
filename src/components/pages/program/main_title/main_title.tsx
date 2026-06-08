import React from "react";
import "./main_title.css";

export default function MainTitle() {
  return (
    <section className="sc-main-title">
      <div className="inner-container">
        <div
          className="header-content"
          data-aos="fade-up"
        >
          <div className="breadcrumb text-uppercase">
            <a href="/" target="_self" rel="noreferrer">
              Trang chủ
            </a>
            <span>-</span>
            <a
              href="/tong-quan-chuong-trinh/"
              target="_self"
              rel="noreferrer"
            >
              Tổng quan Chương trình
            </a>
          </div>
        </div>

        <h4
          className="subtitle fw-300"
          data-aos="fade-up"
        >
          Tổng quan
        </h4>

        <h4
          className="title fw-bold"
          data-aos="fade-up"
        >
          Chương Trình Song Ngữ Quốc Tế EMASI
        </h4>

        <div
          className="blockquote fw-300"
          data-aos="fade-up"
        >
          <p>
            Chương trình đào tạo tại EMASI được biên soạn chuyên biệt với mục
            tiêu kiến tạo các học sinh toàn diện, xuất sắc trong học tập lẫn
            phát triển cá nhân thông qua nền giáo dục song ngữ Tiếng Việt và
            Tiếng Anh. Chương trình tích hợp độc đáo kết hợp chương trình Bộ
            Giáo dục & Đào tạo Việt Nam (MOET) và chương trình Quốc tế Cambridge
            cùng với lợi thế từ hai lộ trình học tập linh hoạt tại EMASI sẽ là
            hành trang vô giá cho thế hệ tiên phong thấm nhuần giá trị truyền
            thống Việt Nam và sở hữu tư duy toàn cầu.
          </p>

          <p>
            Với kiểm định toàn diện từ WASC (Hiệp hội các trường học và đại học
            miền Tây Hoa Kỳ), chương trình đào tạo tại EMASI không chỉ đảm bảo
            nền giáo dục theo tiêu chuẩn quốc tế mà còn mở ra nhiều cơ hội học
            tập và phát triển cho học sinh trong môi trường song ngữ hiện đại.
          </p>
        </div>
      </div>
    </section>
  );
}