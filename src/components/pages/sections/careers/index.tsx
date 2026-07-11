// import React from "react";
// import './careers.css';

// // Liên hệ/ Tuyển dụng

// const careers = [
//   {
//     heading: "Khối giáo dục",
//     lists: [
//       {
//         title: "Phó Hiệu trưởng Tiểu học",
//         positionTimes: "Toàn thời gian",
//         address: "EMASI Vạn Phúc",
//         applyEmail: "hr@emasi.edu.vn",
//         jobDescription:
//           "https://emasi.pixelcent.com/wp-content/uploads/2025/04/jd-evp-head-of-elementary_2025_bilingual-03.pdf",
//       },
//       {
//         title: "Giáo viên môn Nghiên cứu Kinh doanh IGCSE và A-Level",
//         positionTimes: "Toàn thời gian",
//         address: "EMASI Vạn Phúc",
//         applyEmail: "hr@emasi.edu.vn",
//         jobDescription:
//           "https://emasi.pixelcent.com/wp-content/uploads/2025/05/evp-jd_igcse-and-a-level-of-business-studies-2025-1.pdf",
//       },
//       {
//         title: "Giáo viên Âm nhạc",
//         positionTimes: "Toàn thời gian",
//         address: "EMASI Vạn Phúc",
//         applyEmail: "hr@emasi.edu.vn",
//         jobDescription:
//           "https://emasi.pixelcent.com/wp-content/uploads/2025/05/evp-jd_teacher-of-music_2025-2.pdf",
//       },
//     ],
//   },
// ];

// export default function Careers() {
//   return (
//     <div className="careers-content">
//       {careers.map((career, careerIndex) => (
//         <React.Fragment key={careerIndex}>
//           {careerIndex === 1 && <hr className="hr-career" />}

//           <div className="career-item">
//             {career.heading && <h2>{career.heading}</h2>}

//             {career.lists?.length > 0 && (
//               <div className="career-lists">
//                 {career.lists.map((item, index) => (
//                   <div key={index} className="career-list-item">
//                     <div className="career-info">
//                       {item.title && <h3>{item.title}</h3>}
//                       {item.positionTimes && <p>{item.positionTimes}</p>}
//                       {item.address && <p>{item.address}</p>}
//                     </div>

//                     <div className="career-btn">
//                       {item.applyEmail && (
//                         <div>
//                           <a
//                             className="btn btn-ungtuyen"
//                             href={`mailto:${item.applyEmail}`}
//                           >
//                             Ứng tuyển ngay
//                           </a>
//                         </div>
//                       )}

//                       {item.jobDescription && (
//                         <div>
//                           <a
//                             className="btn btn-mota"
//                             href={item.jobDescription}
//                             target="_blank"
//                           >
//                             Mô tả công việc
//                           </a>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
import React from "react";
import './careers.css';

interface CareerItem {
  chCV?: string;
  thIGian?: string;
  moTCongViC?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

interface CareersProps {
  data?: {
    heading?: string;
    listCarre?: CareerItem[];
  };
}

export default function Careers({ data }: CareersProps) {
  if (!data) return null;

  const { heading, listCarre } = data;
  const jobs = listCarre || [];

  return (
    <div className="careers-content">
      <div className="career-item">
        {/* Render Tiêu đề khối (VD: Khối giáo dục) */}
        {heading && <h2>{heading}</h2>}

        {jobs.length > 0 && (
          <div className="career-lists">
            {jobs.map((item, index) => (
              <div key={index} className="career-list-item">
                <div className="career-info">
                  {/* Tên công việc */}
                  {item.chCV && <h3>{item.chCV}</h3>}
                  
                  {/* Thời gian làm việc */}
                  {item.thIGian && <p>{item.thIGian}</p>}
                  
                  {/* Địa chỉ (Đang giữ theo template của bạn) */}
                  <p>EMASI Vạn Phúc</p>
                </div>

                <div className="career-btn">
                  {/* Nút Ứng tuyển */}
                  <div>
                    <a
                      className="btn btn-ungtuyen"
                      href="mailto:hr@emasi.edu.vn"
                    >
                      Ứng tuyển ngay
                    </a>
                  </div>

                  {/* Nút Mô tả công việc (Chỉ hiện nếu có up file) */}
                  {item.moTCongViC?.node?.sourceUrl && (
                    <div>
                      <a
                        className="btn btn-mota"
                        href={item.moTCongViC.node.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
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
    </div>
  );
}