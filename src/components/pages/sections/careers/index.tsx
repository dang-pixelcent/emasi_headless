import React from "react";
import './careers.css';

// Liên hệ/ Tuyển dụng

const careers = [
  {
    heading: "Khối giáo dục",
    lists: [
      {
        title: "Phó Hiệu trưởng Tiểu học",
        positionTimes: "Toàn thời gian",
        address: "EMASI Vạn Phúc",
        applyEmail: "hr@emasi.edu.vn",
        jobDescription:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/04/jd-evp-head-of-elementary_2025_bilingual-03.pdf",
      },
      {
        title: "Giáo viên môn Nghiên cứu Kinh doanh IGCSE và A-Level",
        positionTimes: "Toàn thời gian",
        address: "EMASI Vạn Phúc",
        applyEmail: "hr@emasi.edu.vn",
        jobDescription:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/05/evp-jd_igcse-and-a-level-of-business-studies-2025-1.pdf",
      },
      {
        title: "Giáo viên Âm nhạc",
        positionTimes: "Toàn thời gian",
        address: "EMASI Vạn Phúc",
        applyEmail: "hr@emasi.edu.vn",
        jobDescription:
          "https://emasi.pixelcent.com/wp-content/uploads/2025/05/evp-jd_teacher-of-music_2025-2.pdf",
      },
    ],
  },
];

export default function Careers() {
  return (
    <div className="careers-content">
      {careers.map((career, careerIndex) => (
        <React.Fragment key={careerIndex}>
          {careerIndex === 1 && <hr className="hr-career" />}

          <div className="career-item">
            {career.heading && <h2>{career.heading}</h2>}

            {career.lists?.length > 0 && (
              <div className="career-lists">
                {career.lists.map((item, index) => (
                  <div key={index} className="career-list-item">
                    <div className="career-info">
                      {item.title && <h3>{item.title}</h3>}
                      {item.positionTimes && <p>{item.positionTimes}</p>}
                      {item.address && <p>{item.address}</p>}
                    </div>

                    <div className="career-btn">
                      {item.applyEmail && (
                        <div>
                          <a
                            className="btn btn-ungtuyen"
                            href={`mailto:${item.applyEmail}`}
                          >
                            Ứng tuyển ngay
                          </a>
                        </div>
                      )}

                      {item.jobDescription && (
                        <div>
                          <a
                            className="btn btn-mota"
                            href={item.jobDescription}
                            target="_blank"
                          >
                            Mô tả công việc
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}