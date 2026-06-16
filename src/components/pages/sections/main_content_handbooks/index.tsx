import React from "react";
import Sidebar from "../sidebar";
import Handbooks from "../handbooks";
import './main_content_handbooks.css';

export const pageData = {
  title: "Sổ tay và Quy trình",
  breadcrumb: {
    title: "Sổ tay và Quy trình",
    slug: "/so-tay-quy-trinh",
  },
  content: (
    <>
      <p>
        Tại EMASI, việc xây dựng một môi trường học tập an toàn, văn minh và hiệu
        quả không chỉ dựa trên chất lượng giảng dạy, mà còn nằm ở sự rõ ràng,
        minh bạch trong từng quy trình và quy định. Các Sổ tay và Quy trình được
        nhà trường thiết kế một cách chi tiết, dễ hiểu và cập nhật thường xuyên
        nhằm hỗ trợ phụ huynh, học sinh và toàn thể đội ngũ giáo viên trong quá
        trình học tập và sinh hoạt tại trường.
      </p>

      <p>
        Các Sổ tay và quy trình EMASI bao gồm những hướng dẫn cụ thể về các hoạt
        động học tập, giờ giấc, nề nếp, đánh giá học tập, cũng như các tiêu
        chuẩn ứng xử và an toàn trong và ngoài lớp học. Các quy trình được thiết
        kế dựa trên sự tham khảo từ các mô hình giáo dục tiên tiến và phù hợp với
        điều kiện học tập tại Việt Nam, giúp học sinh rèn luyện tinh thần kỷ
        luật, chủ động và có trách nhiệm với cộng đồng.
      </p>

      <p>
        Bên cạnh đó, Sổ tay cũng là kênh thông tin hữu ích để phụ huynh nắm bắt
        các chính sách và hoạt động của nhà trường, từ đó phối hợp chặt chẽ hơn
        với giáo viên trong việc đồng hành cùng sự phát triển của con em mình.
      </p>

      <p>
        EMASI tin rằng, khi mỗi thành viên trong cộng đồng đều hiểu rõ vai trò và
        trách nhiệm của mình, môi trường học tập sẽ trở nên tích cực hơn – là nền
        tảng để các em học sinh phát triển không chỉ về học thuật mà còn về nhân
        cách và kỹ năng sống. Đây chính là một phần quan trọng trong hành trình
        kiến tạo một nền giáo dục bền vững và nhân văn tại EMASI.
      </p>

      <img
        src="/assets/images/demo/sections/handbooks/ONG2355-1024x683.jpg"
        alt="Sổ tay và Quy trình"
      />
    </>
  ),
};

export default function MainContentHandbooks() {
  return (
    <section className="sc-main-content">
      <div className="inner-container">
        <div className="page-content d-flex flex-wrap">
          <div className="header-content">
            <div className="breadcrumb text-uppercase">
              <a href="/" target="_self">
                Trang chủ
              </a>
              <span>-</span>
              <a href={pageData.breadcrumb.slug} target="_self">
                {pageData.breadcrumb.title}
              </a>
            </div>
          </div>

          <div className="main-content">
            <h1
              style={{
                fontWeight: 700,
                color: "#003e58",
              }}
            >
              {pageData.title}
            </h1>

            {pageData.content}

            <Handbooks />
          </div>

          <Sidebar />
        </div>
      </div>
    </section>
  );
}