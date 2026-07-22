
import React, { useState } from "react";
import { useLocation } from "@reach/router";
import "./register.css";

export default function RegisterSection() {
  const location = useLocation();
  
  // Tự động nhận diện ngôn ngữ dựa trên URL (nếu có /en thì là tiếng Anh)
  const isEn = typeof window !== "undefined" ? location.pathname.includes("/en") : false;
  const currentLang = isEn ? "en" : "vi";

  // Bộ từ điển song ngữ
  const i18n = {
    vi: {
      title1: "ĐĂNG KÝ",
      title2: "TƯ VẤN & THAM QUAN",
      desc: "Vui lòng điền thông tin bên dưới, bộ phận tuyển sinh của EMASI sẽ liên hệ tư vấn trong thời gian sớm nhất.",
      namePh: "Tên Phụ huynh *",
      gradeOpts: [
        { val: "Mẫu giáo", label: "Mẫu giáo" },
        { val: "Tiểu học", label: "Tiểu học" },
        { val: "THCS", label: "THCS" },
        { val: "THPT", label: "THPT" },
      ],
      phonePh: "Số điện thoại *",
      emailPh: "Email *",
      messagePh: "Lời nhắn cho EMASI",
      successMsg: "Đăng ký thành công! (Success)",
      errorEmpty: "Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email!",
      errorEmail: "Email không đúng định dạng (VD: ten@gmail.com).",
      errorPhone: "Số điện thoại không hợp lệ (Vui lòng nhập 10 số).",
      errorServer: "Không thể kết nối đến máy chủ.",
      errorGeneric: "Có lỗi xảy ra!",
      btnSending: "ĐANG GỬI...",
      btnSubmit: "ĐĂNG KÝ",
    },
    en: {
      title1: "REGISTER FOR",
      title2: "CONSULTATION & TOUR",
      desc: "Please fill out the information below, our admissions team will contact you shortly.",
      namePh: "Parent's Name *",
      gradeOpts: [
        { val: "Kindergarten", label: "Kindergarten" },
        { val: "Primary School", label: "Primary School" },
        { val: "Middle School", label: "Middle School" },
        { val: "High School", label: "High School" },
      ],
      phonePh: "Phone Number *",
      emailPh: "Email *",
      messagePh: "Message for EMASI",
      successMsg: "Registration successful! (Success)",
      errorEmpty: "Please fill in your Name, Phone Number, and Email!",
      errorEmail: "Invalid email format (e.g., name@gmail.com).",
      errorPhone: "Invalid phone number (Please enter 10 digits).",
      errorServer: "Cannot connect to the server.",
      errorGeneric: "An error occurred!",
      btnSending: "SENDING...",
      btnSubmit: "REGISTER",
    },
  };

  const t = i18n[currentLang];

  const [formData, setFormData] = useState({
    name: "",
    grade: t.gradeOpts[0].val, // Tự động lấy Cấp học đầu tiên theo ngôn ngữ hiện tại
    campus: "EMASI Nam Long",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Kiểm tra rỗng (Dùng câu thông báo theo ngôn ngữ)
    if (!formData.name || !formData.phone || !formData.email) {
      setStatus({ loading: false, success: false, error: t.errorEmpty });
      return;
    }

    // 2. Kiểm tra định dạng Email bằng Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ loading: false, success: false, error: t.errorEmail });
      return;
    }

    // 3. Kiểm tra định dạng Số điện thoại VN bằng Regex (10 số, bắt đầu bằng 03, 05, 07, 08, 09)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
    if (!phoneRegex.test(formData.phone)) {
      setStatus({ loading: false, success: false, error: t.errorPhone });
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
        setFormData({ name: "", grade: t.gradeOpts[0].val, campus: "EMASI Nam Long", phone: "", email: "", message: "" });
      } else {
        setStatus({ loading: false, success: false, error: result.message || t.errorGeneric });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: t.errorServer });
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
                  {t.title1} <br />
                  <strong>{t.title2}</strong>
                </h2>
              </div>

              <div className="register-form" data-aos="fade-up">
                <div className="desc">
                  <p>{t.desc}</p>
                </div>

                <form className="ninja-forms-form" onSubmit={handleSubmit}>
                  <div className="ninja-forms-all-fields-wrap">
                    
                    {/* Họ tên */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t.namePh} required />
                      </div>
                    </div>

                    {/* Row 2: Select Cấp học */}
                    <div className="field-wrap w_half-wrap">
                      <div className="nf-field-element">
                        <select name="grade" value={formData.grade} onChange={handleChange}>
                          {t.gradeOpts.map((opt, idx) => (
                            <option key={idx} value={opt.val}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Select Cơ sở (Giữ nguyên tên cơ sở do tên riêng) */}
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
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t.phonePh} required />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="field-wrap">
                      <div className="nf-field-element">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.emailPh} required />
                      </div>
                    </div>

                    {/* Textarea */}
                    <div className="field-wrap textarea-wrap">
                      <div className="nf-field-element">
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder={t.messagePh} />
                      </div>
                    </div>

                    {/* Thông báo gửi thành công/thất bại */}
                    {status.success && (
                      <div style={{ color: "#0096FF", fontWeight: "bold", marginBottom: "15px" }}>
                        {t.successMsg}
                      </div>
                    )}
                    {status.error && (
                      <div style={{ color: "#dc3545", fontWeight: "bold", marginBottom: "15px" }}>
                        {status.error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="field-wrap submit-wrap">
                      <div className="nf-field-element">
                        <input
                          type="submit"
                          value={status.loading ? t.btnSending : t.btnSubmit}
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