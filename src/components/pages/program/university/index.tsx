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
             Nhà trường tự hào được đồng hành cùng các gia đình trên hành trình nuôi dưỡng và hỗ trợ học sinh trau dồi bản thân đồng thời dẫn dắt các em chinh phục một tương lai rộng mở. Các học sinh của EMASI liên tục đạt được kết quả học tập xuất sắc và trúng tuyển vào các trường đại học danh tiếng cả trong nước và quốc tế.
            </div>
          </div>

          <div className="sc-map text-center" data-aos="zoom-in-down">
            <img
              src="/assets/images/demo/map-img.png"
              alt="University map"
            />
          </div>
        </div>
      </section>
    </>
  );
}