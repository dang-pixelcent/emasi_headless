import React from 'react';
import './hoc_bong_tai_nang.css';

interface TaiNangItemData {
  background: string;
  border_color: string;
  image_left: string; 
  icon_color: string;
  border_color_copy2: string; 
  content: string; 
  color_content: string;
}

interface HocBongTaiNangProps {
  lists?: TaiNangItemData[];
}

const mockLists: TaiNangItemData[] = [
  {
    background: '#f8f9fa',
    border_color: '#57cbf5',
    image_left: '<i class="fa fa-graduation-cap"></i>', 
    icon_color: '#ffffff',
    border_color_copy2: '#57cbf5',
    content: '<h2>Học bổng Học thuật</h2><p>Dành cho học sinh có thành tích học tập xuất sắc với điểm trung bình môn từ 9.0 trở lên.</p>',
    color_content: '#333333',
  },
  {
    background: '#ffffff',
    border_color: '#822a81',
    image_left: '<i class="fa fa-music"></i>',
    icon_color: '#ffffff',
    border_color_copy2: '#822a81',
    content: '<h2>Học bổng Năng khiếu</h2><p>Dành cho học sinh đạt giải thưởng cấp quốc gia/quốc tế về Thể thao, Âm nhạc, hoặc Nghệ thuật.</p>',
    color_content: '#333333',
  }
];

const HocBongTaiNang: React.FC<HocBongTaiNangProps> = ({ lists = mockLists }) => {
  if (!lists || lists.length === 0) return null;

  return (
    <div className="lists-tainang">
      {lists.map((row, index) => {
        const aosAnimation = index % 2 === 0 ? 'fade-right' : 'fade-left';
        const aosDelay = index * 150;

        return (
          <div
            key={index}
            data-aos={aosAnimation}
            data-aos-delay={aosDelay}
            className="tainang-item"
            style={{
              background: row.background,
              border: `2px solid ${row.border_color}`,
            }}
          >
            <div className="tainang-inner" style={{ display: 'flex', alignItems: 'stretch' }}>
              
              {row.image_left && (
                <div
                  className="tainang-image"
                  style={{
                    background: row.border_color_copy2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: row.icon_color || 'inherit',
                  }}
                  dangerouslySetInnerHTML={{ __html: row.image_left }}
                />
              )}

              <div
                className="tainang-content"
                style={{ flex: 1, color: row.color_content }}
                dangerouslySetInnerHTML={{ __html: row.content }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HocBongTaiNang;