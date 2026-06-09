import React, { useState } from "react";
import "./hoc_hieu.css";

const menuItems = [
  {
    id: "menu-1",
    image:
      "/assets/images/demo/program/English.png",
    title: "English (Tiếng Anh)",
    letter: "E",
    desc: `
      Chương trình Tiếng Anh Tích hợp tập trung phát triển năng lực tiếng Anh cho học sinh ở bốn kỹ năng ngôn ngữ cốt lõi: nghe, nói, đọc, viết đồng thời nuôi dưỡng tư duy toàn cầu, giúp các em trở thành những nhà giao tiếp hiệu quả và công dân toàn cầu hiểu biết.
      Thông qua đa dạng bài học và hoạt động học tập, học sinh được tiếp cận với nhiều nền văn hóa và góc nhìn khác nhau, từ đó mở rộng hiểu biết về các chủ đề toàn cầu. Đồng thời, học sinh được rèn luyện năng lực tiếng Anh giao tiếp trong nhiều dự án từ học thuật đến đời sống xã hội.
    `,
  },
  {
    id: "menu-2",
    image:
      "/assets/images/demo/program/Mathematics.png",
    title: "Mathematics (Toán học)",
    letter: "M",
    desc: `
      Toán học tại EMASI không chỉ xoay quanh “cách giải” mà trao cho học sinh “cách nghĩ” – logic, linh hoạt và có chiều sâu.
      Chương trình tích hợp giữa MOET và Cambridge cho phép học sinh sử dụng thành thạo Toán học ở cả tiếng Việt và tiếng Anh, từ đó bồi dưỡng năng lực lý luận, phát triển tư duy phản biện.
      Học sinh Tiểu học được xây nền tảng vững chắc qua thực hành, dự án thực tế trong khi học sinh Trung học được chuẩn bị toàn diện để tự tin chinh phục các yêu cầu của chương trình Cambridge Checkpoint, IGCSE, A-Level và quan trọng nhất là sẵn sàng cho tương lai đầy cơ hội.
    `,
  },
  {
    id: "menu-3",
    image:
      "/assets/images/demo/program/Arts.png",
    title: "Arts (Nghệ thuật)",
    letter: "A",
    desc: `
      EMASI tin rằng nghệ thuật là một phần thiết yếu của giáo dục toàn diện – không chỉ giúp học sinh trở thành những cá nhân tinh tế, sáng tạo mà còn có khả năng cảm thụ, phân tích và đánh giá nghệ thuật và vận dụng tư duy thẩm mỹ để làm phong phú đời sống.
      Bên cạnh các hoạt động khám phá sâu các bộ môn Âm nhạc, Mỹ thuật và Kịch nghệ, học sinh EMASI được đặc biệt hòa mình trong môi trường học tập đề cao nghệ thuật, thường xuyên tiếp xúc với đa dạng tác phẩm và giao lưu cùng nghệ sĩ, từ đó nuôi dưỡng cảm hứng, trí tưởng tượng và tiêu chuẩn thẩm mỹ một cách tự nhiên.
    `,
  },
  {
    id: "menu-4",
    image:
      "/assets/images/demo/program/Science.png",
    title: "Science (Khoa học)",
    letter: "S",
    desc: `
      Không chỉ học để biết, học sinh EMASI được trưởng thành trong một môi trường giàu trải nghiệm, nơi mỗi bài học là một hành trình khám phá đi từ quan sát, đánh giá đến thực nghiệm rồi tìm ra giải pháp.
      Học sinh EMASI được tạo cơ hội tối ưu để tiếp cận sinh học, hóa học, vật lý đến khoa học từ nguyên lý đến thực hành. Chương trình giáo dục tích hợp ngoài giúp học sinh hình thành lòng say mê khoa học đời sống còn thúc đẩy các em hai kỹ năng then chốt: giải quyết vấn đề và tư duy phản biện.
    `,
  },
  {
    id: "menu-5",
    image:
      "/assets/images/demo/program/IT.png",
    title: "Information & Communication Technology (Công nghệ Thông tin)",
    letter: "I",
    desc: `
      Sự đầu tư đồng bộ, đầy đủ của hệ thống hạ tầng công nghệ thông tin, các thiết bị, cùng đội ngũ chuyên viên, giáo viên giỏi chuyên môn là một cam kết rằng nhà trường quan tâm hàng đầu đến kỹ năng hiểu biết và thành thạo về công nghệ thông tin của học sinh.
      Các em được học cách sử dụng công nghệ một cách an toàn, có trách nhiệm đồng thời rèn luyện tư duy logic, khả năng giải quyết vấn đề và kỹ năng cộng tác trong thế giới số. Qua đó, các em từng bước trở thành những công dân chủ động và thích nghi linh hoạt trong thế giới ngày càng kết nối.
    `,
  },
];

export default function HocHieu() {
  const [activeMenu, setActiveMenu] = useState("menu-1");

  const activeContent = menuItems.find(
    (item) => item.id === activeMenu
  );

  return (
    <section className="sc-hoc-hieu">
      <div className="inner-container">
        <h3 className="title" data-aos="fade-up">
          Học hiệu <strong>EMASI</strong>
        </h3>

        <div
          className="description fw-300"
          data-aos="fade-up"
        >
          Như Học hiệu EMASI, chương trình giảng dạy tích hợp của trường mang
          các đặc điểm nổi bật sau:
        </div>

        <div className="menu-temp" data-aos="fade-up">
          <div className="menu">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href="#!"
                className={`menu-item ${
                  activeMenu === item.id ? "is-hover" : ""
                }`}
                onMouseEnter={() => setActiveMenu(item.id)}
                onClick={(e) => e.preventDefault()}
              >
                <img src={item.image} alt={item.title} />
              </a>
            ))}
          </div>
        </div>

        <div className="content" data-aos="fade-up">
          {activeContent && (
            <div className="menu-content show">
              <h4 className="menu-title">
                <span>{activeContent.letter}</span> -{" "}
                {activeContent.title}
              </h4>

              <div className="menu-desc fw-300"  style={{ whiteSpace: "pre-line" }}>
                {activeContent.desc}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}