import React from 'react';
import './educational_aspects.css';

interface LinkData {
  url: string;
  title: string;
  target?: string;
}

interface EducationalListItem {
  background_color: string;
  image: string;
  color: string;
  desc: string;
  link?: LinkData;
  link_2?: LinkData;
  desc_link2?: string;
}

interface EducationalAspectsProps {
  lists?: EducationalListItem[];
}

const mockLists: EducationalListItem[] = [
  {
    background_color: '#003e58',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
    color: '#ffffff',
    desc: '<h2>Môi trường Quốc tế</h2><p>Trải nghiệm học tập trong môi trường đa văn hóa, phát triển tư duy toàn cầu.</p>',
    link: { url: '/chuong-trinh', title: 'Tìm hiểu thêm' },
  },
  {
    background_color: '#f4f4f4',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
    color: '#333333',
    desc: '<h2>Cơ sở vật chất</h2><p>Hệ thống phòng thí nghiệm và thư viện đạt chuẩn quốc tế.</p>',
    link_2: { url: '/dang-ky', title: 'Đăng ký tham quan' },
    desc_link2: 'Dành cho Phụ huynh',
  }
];

const EducationalAspects: React.FC<EducationalAspectsProps> = ({ lists = mockLists }) => {
  if (!lists || lists.length === 0) return null;

  return (
    <section className="sc-educational">
      <div className="temp">
        <div className="container-fluid container-2560">
          
          {lists.map((row, index) => {
            // Logic hiệu ứng bay: Đảo ngược giữa dòng chẵn và dòng lẻ
            // index 0 (dòng 1): ảnh fade-left, text fade-right
            // index 1 (dòng 2): ảnh fade-right, text fade-left
            const aosImage = index % 2 === 0 ? 'left' : 'right';
            const aosInfo = index % 2 === 0 ? 'right' : 'left';

            return (
              <div
                key={index}
                className="row col-box-2"
                style={{ background: row.background_color }}
              >
                {/* Cột Hình ảnh */}
                <div
                  className="col-sm-6 image"
                  data-aos={`fade-${aosImage}`}
                  data-aos-delay="0"
                >
                  <img src={row.image} alt="Educational aspect" />
                </div>

                {/* Cột Nội dung */}
                <div className="col-md-6 text" data-aos={`fade-${aosInfo}`}>
                  <div
                    className="box-desc"
                    style={{ color: row.color }}
                    data-aos="fade-up"
                    dangerouslySetInnerHTML={{ __html: row.desc }}
                  />

                  {/* Vùng Nút bấm (Links) */}
                  {(row.link || row.link_2) && (
                    <div className="box-link-edu">
                      
                      {/* Cột nút 1 */}
                      <div className="box-link-item">
                        {row.link && (
                          <a
                            href={(row.link.url && row.link.url !== '#') ? row.link.url : '#!'}
                            className="box-link btn btn-link1-edu"
                          >
                            {row.link.title}
                          </a>
                        )}
                      </div>

                      {/* Cột nút 2 & Ghi chú */}
                      <div className="box-link-item text-center">
                        {row.link_2 && (
                          <a
                            href={(row.link_2.url && row.link_2.url !== '#') ? row.link_2.url : '#!'}
                            className="box-link btn btn-link2-edu mb-2"
                          >
                            {row.link_2.title}
                          </a>
                        )}
                        {row.desc_link2 && (
                          <div
                            className="b-link2-desc"
                            dangerouslySetInnerHTML={{ __html: row.desc_link2 }}
                          />
                        )}
                      </div>

                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default EducationalAspects;