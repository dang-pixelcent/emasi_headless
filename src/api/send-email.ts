
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import nodemailer from "nodemailer";

// ==========================================
// 1. CẤU HÌNH RATE LIMITING (IN-MEMORY)
// ==========================================
// Biến rateLimitCache đặt ngoài handler để giữ được dữ liệu khi serverless function đang "warm"
const rateLimitCache = new Map();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // Thời gian khóa: 1 phút (60,000 ms)
const MAX_REQUESTS_PER_WINDOW = 3;      // Tối đa 3 lần gửi form / 1 phút

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // Chỉ nhận phương thức POST
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  // ==========================================
  // 2. THỰC THI RATE LIMITING (KIỂM SOÁT TẦN SUẤT)
  // ==========================================
  // Lấy IP của người dùng (Hỗ trợ cả môi trường Local và Vercel)
  const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown-ip";
  const currentTime = Date.now();

  if (rateLimitCache.has(ip)) {
    const rateData = rateLimitCache.get(ip);
    
    // Nếu vẫn đang trong thời gian 1 phút
    if (currentTime - rateData.startTime < RATE_LIMIT_WINDOW_MS) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({ 
          success: false, 
          message: "Bạn thao tác quá nhanh. Vui lòng thử lại sau 1 phút!" 
        });
      }
      rateData.count += 1;
    } else {
      // Đã qua 1 phút -> Reset lại bộ đếm cho IP này
      rateLimitCache.set(ip, { count: 1, startTime: currentTime });
    }
  } else {
    // Lần đầu IP này gửi request
    rateLimitCache.set(ip, { count: 1, startTime: currentTime });
  }

  // ==========================================
  // 3. SERVER-SIDE VALIDATION (KIỂM THỰC DỮ LIỆU)
  // ==========================================
  const { name, grade, campus, phone, email, message } = req.body;

  // A. Kiểm tra dữ liệu rỗng
  if (!name || !phone || !email || !campus || !grade) {
    return res.status(400).json({ success: false, message: "Dữ liệu không được để trống!" });
  }

  // B. Kiểm tra định dạng Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Email không đúng định dạng!" });
  }

  // C. Kiểm tra định dạng Số điện thoại (Đầu số VN, 10 số)
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, message: "Số điện thoại không hợp lệ!" });
  }

  // ==========================================
  // 4. XỬ LÝ GỬI EMAIL (NODEMAILER)
  // ==========================================
  const campusEmails: Record<string, string | undefined> = {
    "EMASI Nam Long": process.env.EMAIL_NAM_LONG,
    "EMASI Vạn Phúc": process.env.EMAIL_VAN_PHUC,
    "EMASI Plus": process.env.EMASI_Plus,
    "EMASI Ciputra": process.env.EMASI_Ciputra,
  };

  const targetEmail = campusEmails[campus] || "info@emasi.edu.vn";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS, 
    },
  });

  const mailOptions = {
    from: '"Website EMASI" <no-reply@emasi.edu.vn>', // Lưu ý: Nếu gửi bị vào Spam, hãy đổi chỗ này thành email thật của process.env.MAIL_USER
    to: targetEmail,
    subject: `[Đăng ký tư vấn] - ${campus} - Phụ huynh: ${name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #003e58;">ĐĂNG KÝ TƯ VẤN & THAM QUAN MỚI</h2>
        <p>Hệ thống vừa nhận được một yêu cầu tư vấn mới từ Website với thông tin như sau:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #f4f4f4;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Cơ sở quan tâm:</strong></td><td style="padding: 10px; border: 1px solid #ddd; color: #822a81; font-weight: bold;">${campus}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>Tên Phụ huynh:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${name}</td></tr>
          <tr style="background: #f4f4f4;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Số điện thoại:</strong></td><td style="padding: 10px; border: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>Email Phụ huynh:</strong></td><td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="background: #f4f4f4;"><td style="padding: 10px; border: 1px solid #ddd;"><strong>Cấp học quan tâm:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${grade}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd;"><strong>Lời nhắn:</strong></td><td style="padding: 10px; border: 1px solid #ddd;">${message || "Không có"}</td></tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Gửi email thành công!" });
  } catch (error) {
    console.error("Lỗi gửi mail:", error);
    return res.status(500).json({ success: false, message: "Lỗi hệ thống khi gửi mail." });
  }
}