import React from "react";
import './main_content_fee.css';
import Sidebar from "../sidebar/sidebar";
import Collapse from "../fee_collapse/collapse";

//Phụ huynh/ Lịch năm học

const pageData = {
  title: "Lịch năm học",
  breadcrumb: {
    title: "Lịch năm học",
    slug: "/lich-nam-hoc",
  },
  content: (
    <>
      <p>
        Lịch năm học EMASI được thiết kế bài bản, khoa học và linh hoạt – với mục tiêu tạo sự cân bằng giữa quá trình học tập, trải nghiệm thực tế, nghỉ ngơi và phát triển cá nhân cho học sinh. Mỗi giai đoạn trong năm được xây dựng không chỉ dựa trên tiến độ giảng dạy của các chương trình học thuật, mà còn tính đến các thời điểm vàng để học sinh tham gia các hoạt động ngoại khóa, thể thao, nghệ thuật và các chuyến học tập trải nghiệm.
      </p>

      <p>
        Chính vì vậy, lịch năm học tại EMASI không chỉ là một kế hoạch học tập, mà còn là một phần quan trọng trong chiến lược giáo dục toàn diện. Nhà trường chú trọng vào việc phân bổ thời gian một cách khoa học, để mỗi học sinh có cơ hội phát triển hài hòa cả về học lực, cảm xúc, kỹ năng và tư duy sáng tạo.
      </p>

      <h2>Học tập và trải nghiệm song hành</h2>
        <img src="/assets/images/demo/sections/main-content-fee/IMG_0717-300x200.jpg"/>
        <img src="/assets/images/demo/sections/main-content-fee/IMG_2915-300x200.jpg"/>
        <img src="/assets/images/demo/sections/main-content-fee/TEAMBUILDING-7-300x200.jpeg"/>
        <img src="/assets/images/demo/sections/main-content-fee/67E9D8E2-01EF-4C38-A19C-F99352F01A3B-scaled-e1746472186959-300x200.jpeg"/>
      <p>
        Bên cạnh các học kỳ chính, nhà trường bố trí đan xen các tuần lễ chuyên đề, các đợt kiểm tra định kỳ, ngày hội học thuật và hoạt động cộng đồng. Các kỳ nghỉ được sắp xếp hợp lý nhằm giúp học sinh tái tạo năng lượng và duy trì sự hứng thú trong học tập.
      </p>
      
    </>
  ),
};

export default function MainContentFee() {
  return (
    <section className="sc-main-content">
      <div className="inner-container">
        <div className="page-content d-flex flex-wrap">
          <div className="header-content">
            <div className="breadcrumb text-uppercase">
              <a href="/">Trang chủ</a>
              <span>-</span>
              <a href={pageData.breadcrumb.slug}>
                {pageData.breadcrumb.title}
              </a>
            </div>
          </div>

          <div className="main-content">
            <h1>{pageData.title}</h1>

            {pageData.content}
            <Collapse />
          </div>
          <Sidebar />

        </div>
      </div>
    </section>
  );
}