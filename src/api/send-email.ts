import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import nodemailer from "nodemailer";

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, grade, campus, phone, email, message } = req.body;

  // 1. Tự động phân luồng: Lấy giá trị tương ứng từ file .env
  const campusEmails: Record<string, string | undefined> = {
    "EMASI Nam Long": process.env.EMAIL_NAM_LONG,
    "EMASI Vạn Phúc": process.env.EMAIL_VAN_PHUC,
    "EMASI Plus": process.env.EMASI_Plus,
    "EMASI Ciputra": process.env.EMASI_Ciputra,
  };

  // Nếu cơ sở chưa được cấu hình trong .env hoặc để trống, mặc định gửi về info@emasi.edu.vn
  const targetEmail = campusEmails[campus] || "info@emasi.edu.vn";

  // 2. Cấu hình tài khoản gửi mail lấy từ .env
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // Lấy từ .env
      pass: process.env.MAIL_PASS, // Lấy từ .env (App Password)
    },
  });

  // 3. Tạo nội dung email đẹp mắt gửi về cho Nhà trường
  const mailOptions = {
    from: '"Website EMASI" <no-reply@emasi.edu.vn>',
    to: targetEmail, // Gửi đúng về email trường lấy từ .env
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