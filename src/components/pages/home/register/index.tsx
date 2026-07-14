
import React, { useState } from "react";
import "./register.css";

export default function RegisterSection() {
  const [formData, setFormData] = useState({
    name: "",
    grade: "Mẫu giáo",
    campus: "EMASI Nam Long",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  // Xử lý thay đổi ô nhập liệu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý bấm nút Gửi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email!");
      return;
    }

    setStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setStatus({ loading: false, success: true, error: "" });
        // Xóa trắng form sau khi gửi thành công
        setFormData({ name: "", grade: "Mẫu giáo", campus: "EMASI Nam Long", phone: "", email: "", message: "" });
      } else {
        setStatus({ loading: false, success: false, error: result.message || "Có lỗi xảy ra!" });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: "Không thể kết nối đến máy chủ." });
    }
  };

  return (
    <section id="dangky" className="sc-register">
      <div className="bg-gray-ems">
        <div className="container-fluid pe-0 ps-90 container-2560">
          <div className="register-cols d-flex flex-wrap align-items-stretch">
            {/* Banner */}
            <div className="col-banner" data-aos="fade-right">
              <img src="/assets/images/demo/AN-LANH-GIAU-CAM-HUNG-TRAN-DAY-YEU-THUONG-blank.png" alt="ĐĂNG KÝ TƯ VẤN" />
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
                  <p>Vui lòng điền thông tin bên dưới, bộ phận tuyển sinh của EMASI sẽ liên hệ tư vấn trong thời gian sớm nhất.</p>
                </div>

                <form className="ninja-forms-form" onSubmit={handleSubmit}>
                  <div className="ninja-forms-all-fields-wrap">
                    
                    {/* Họ tên */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Tên Phụ huynh *" required />
                      </div>
                    </div>

                    {/* Row 2: Select Cấp học */}
                    <div className="field-wrap w_half-wrap">
                      <div className="nf-field-element">
                        <select name="grade" value={formData.grade} onChange={handleChange}>
                          <option value="Mẫu giáo">Mẫu giáo</option>
                          <option value="Tiểu học">Tiểu học</option>
                          <option value="THCS">THCS</option>
                          <option value="THPT">THPT</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Select Cơ sở */}
                    <div className="field-wrap w_half-wrap">
                      <div className="nf-field-element">
                        <select name="campus" value={formData.campus} onChange={handleChange}>
                          <option value="EMASI Nam Long">EMASI Nam Long</option>
                          <option value="EMASI Vạn Phúc">EMASI Vạn Phúc</option>
                          <option value="EMASI Plus">EMASI Plus</option>
                          <option value="EMASI Ciputra">EMASI Ciputra</option>
                        </select>
                      </div>
                    </div>

                    {/* SĐT */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Số điện thoại *" required />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" required />
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="field-wrap textarea-wrap">
                      <div className="nf-field-element">
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Lời nhắn cho EMASI" />
                      </div>
                    </div>

                    {/* Thông báo gửi thành công/thất bại */}
                    {status.success && (
                      <div style={{ color: "#0000", fontWeight: "bold", marginBottom: "15px" }}>
                        Success
                      </div>
                    )}
                    {status.error && (
                      <div style={{ color: "#dc3545", fontWeight: "bold", marginBottom: "15px" }}>
                        ❌ {status.error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="field-wrap submit-wrap">
                      <div className="nf-field-element">
                        <input 
                          type="submit" 
                          value={status.loading ? "ĐANG GỬI..." : "ĐĂNG KÝ"} 
                          disabled={status.loading}
                          style={{ opacity: status.loading ? 0.7 : 1, cursor: status.loading ? "not-allowed" : "pointer" }}
                        />
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