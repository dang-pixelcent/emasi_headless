import React from "react";
import './list_tai_nang.css';

// Học bổng/ Học bổng tiểu học

const talentList = [
  {
    background: "#ffffff",
    borderColor: "#67cce0",
    iconBg: "#67cce0",
    iconColor: "#ffffff",
    icon: "fa-home",
    content: (
      <>
        <h2>Giới thiệu</h2>
        <p>
          Nhằm thể hiện sự trân trọng của Nhà trường dành cho các em học sinh
          Tiểu học ưu tú, có thành tích học tập xuất sắc cũng như sở hữu năng
          khiếu đặc biệt trong các lĩnh vực khác nhau. Các em học sinh tham gia
          sẽ có cơ hội được trao tặng giải thưởng tài năng trị giá{" "}
          <strong>30% học phí toàn bộ các năm học Tiểu học liên tiếp</strong>{" "}
          tại Hệ thống Trường EMASI.
        </p>
      </>
    ),
  },
  {
    background: "",
    borderColor: "#9ad36a",
    iconBg: "",
    iconColor: "#9ad36a",
    icon: "fa-users",
    content: (
      <>
        <h2>Đối tượng</h2>
        <ul>
          <li>
            Tất cả các học sinh <strong>chuẩn bị hoặc đang học Tiểu học</strong>{" "}
            từ năm học <strong>2025-2026</strong>;
          </li>
          <li>
            Các em học sinh là người Việt Nam, hoặc Việt Kiều hoặc người nước
            ngoài có quốc tịch Việt Nam.
          </li>
        </ul>
      </>
    ),
  },
  {
    background: "#dff0d8",
    borderColor: "#d6e9c6",
    iconBg: "",
    iconColor: "#9ad36a",
    icon: "fa-trophy",
    content: (
      <>
        <h2>Giá trị</h2>
        <p>
          Lên đến 30% học phí các năm học Tiểu học liên tiếp tại EMASI.
        </p>
      </>
    ),
  },
  {
    background: "#eaf3fb",
    borderColor: "#67cce0",
    iconBg: "",
    iconColor: "#67cce0",
    icon: "fa-check",
    content: (
      <>
        <h2>Điều kiện Ứng tuyển</h2>
        <p>Học sinh cần đạt một trong những điều kiện tối thiểu sau để ứng tuyển:</p>
        <ul>
          <li>
            Kĩ năng tiếng Anh xuất sắc và/hoặc từng đạt Bằng kiểm tra trình độ
            tiếng Anh Cambrige cấp độ Starters (cho học sinh Lớp 2) hoặc Movers
            (cho học sinh Lớp 4);
          </li>
          <li>
            Điểm số học bạ xuất sắc, đặc biệt trong các môn Toán, Tiếng Việt và
            Tiếng Anh;
          </li>
          <li>
            Giải thưởng và thành tích trong các lĩnh vực Thể Thao, Nghệ thuật
            hoặc bất kì môn học nào khác.
            <br />
            (Học sinh cần gửi chứng minh kết quả đạt giải khi nộp đơn đăng ký)
          </li>
        </ul>
      </>
    ),
  },
  {
    background: "#ffffff",
    borderColor: "#67cce0",
    iconBg: "#67cce0",
    iconColor: "#ffffff",
    icon: "fa-comments-o",
    content: (
      <>
        <h2>Quy trình Xét tuyển</h2>
        <p>
          Các học sinh đáp ứng được điều kiện xét tuyển sẽ được mời tham gia
          buổi phỏng vấn với Nhà trường. Học sinh vượt qua vòng phỏng vấn sẽ
          được trao tặng Học bổng Tài năng. Thông tin trúng tuyển sẽ được thông
          báo tới gia đình trong vòng thời gian sớm nhất.
        </p>
      </>
    ),
  },
];

export default function ListTaiNang() {
  return (
    <div className="lists-tainang">
      {talentList.map((item, index) => (
        <div
          key={index}
          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          data-aos-delay={index * 150}
          className="tainang-item"
          style={{
            background: item.background,
            border: `2px solid ${item.borderColor}`,
          }}
        >
          <div
            className="tainang-inner"
            style={{
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <div
              className="tainang-image"
              style={{
                background: item.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: item.iconColor,
              }}
            >
              <i className={`fa ${item.icon}`} />
            </div>

            <div
              className="tainang-content"
              style={{
                flex: 1,
              }}
            >
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}