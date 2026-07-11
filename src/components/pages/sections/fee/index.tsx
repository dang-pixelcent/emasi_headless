
import React, { useState } from "react";
import "./fee.css";

interface FeeProps {
  data?: {
    listFee?: Array<{
      title?: string;
      content?: string;
      // Khai báo kiểu linh hoạt để đón cả dạng chuỗi (URL) hoặc dạng Object từ GraphQL
      file?: {
        node?: {
          sourceUrl?: string;
          mediaItemUrl?: string; 
        };
      } | string | null;
    }>;
  };
}

export default function Fee({ data }: FeeProps) {
  // Quản lý tab đang mở (Mặc định không mở tab nào, nếu muốn mở tab đầu tiên thì set useState(0))
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = data?.listFee || [];

  if (!items.length) return null;

  const toggleAccordion = (index: number) => {
    // Nếu click vào tab đang mở thì đóng lại, ngược lại thì mở tab mới
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="collapse-items" id="accordion-collapse" data-aos="fade-up">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        // Xử lý an toàn đường dẫn URL cho file tải xuống
        const fileUrl = typeof item.file === "string" 
          ? item.file 
          : item.file?.node?.sourceUrl || item.file?.node?.mediaItemUrl || null;

        return (
          <React.Fragment key={index}>
            {/* THANH TIÊU ĐỀ ACCORDION */}
            <div
              className={`collapse-item ${!isOpen ? "collapsed" : ""}`}
              onClick={() => toggleAccordion(index)}
              data-aos-delay={(index + 1) * 100}
            >
              <img
                src="/assets/images/arrow-down.svg"
                alt="arrow"
              />
              {item.title}
            </div>

            {/* NỘI DUNG BÊN TRONG */}
            <div className={`collapse ${isOpen ? "show" : ""}`}>
              <div className="collapse-content">
                
                {/* Render HTML nội dung chữ */}
                {item.content && (
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                )}

                {/* Nút Download (Chỉ hiển thị nếu fileUrl tồn tại) */}
                {fileUrl && (
                  <div className="text-center mt-3">
                    <a
                      target="_blank"
                      className="btn btn-download-fee"
                      href={fileUrl}
                      rel="noopener noreferrer"
                    >
                      Tải xuống
                    </a>
                  </div>
                )}
                
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}