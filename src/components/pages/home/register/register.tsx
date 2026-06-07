import React from "react";
import "./register.css";

export default function RegisterSection() {
  return (
    <section id="dangky" className="sc-register">
      <div className="bg-gray-ems">
        <div className="container-fluid pe-0 ps-90 container-2560">
          
          <div className="register-cols d-flex flex-wrap align-items-stretch">

            {/* Banner */}
            <div className="col-banner" data-aos="fade-right">
              <img
                src="https://emasi.pixelcent.com/wp-content/uploads/2025/04/AN-LANH-GIAU-CAM-HUNG-TRAN-DAY-YEU-THUONG-blank.png"
                alt="ĐĂNG KÝ TƯ VẤN"
              />
            </div>

            {/* Form */}
            <div className="col-form" data-aos="fade-left">
              
              <div className="sc-header">
                <h2 className="h2-title fw-300" data-aos="fade-down">
                  ĐĂNG KÝ <br />
                  <strong>TƯ VẤN & THAM QUAN</strong>
                </h2>
              </div>

              <div className="register-form" data-aos="fade-up">
                
                <div className="desc">
                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt . 
                  </p>
                </div>

                <form className="ninja-forms-form">

                  <div className="ninja-forms-all-fields-wrap">

                    {/* Họ tên */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="text" placeholder="Tên Phụ huynh *" />
                      </div>
                    </div>

                    {/* Row 2 select */}
                    <div className="field-wrap w_half-wrap">
                      <div className="nf-field-element">
                        <select defaultValue="mau-giao">
                          <option value="mau-giao">Mẫu giáo</option>
                          <option value="tieu-hoc">Tiểu học</option>
                          <option value="trung-hoc-co-so">THCS</option>
                          <option value="trung-hoc-pho-thong">THPT</option>
                        </select>
                      </div>
                    </div>

                    <div className="field-wrap w_half-wrap">
                      <div className="nf-field-element">
                        <select defaultValue="EMASI Nam Long">
                          <option>EMASI Nam Long</option>
                          <option>EMASI Vạn Phúc</option>
                          <option>EMASI Plus</option>
                          <option>EMASI Ciputra</option>
                        </select>
                      </div>
                    </div>

                    {/* SĐT */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="tel" placeholder="Số điện thoại *" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="email" placeholder="Email *" />
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="field-wrap textarea-wrap">
                      <div className="nf-field-element">
                        <textarea placeholder="Lời nhắn cho EMASI" />
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="field-wrap submit-wrap">
                      <div className="nf-field-element">
                        <input type="submit" value="Đăng ký" />
                      </div>
                    </div>

                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}