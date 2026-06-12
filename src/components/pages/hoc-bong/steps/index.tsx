// src/components/pages/hoc-bong/steps/index.tsx
import React from 'react';
import './steps.css';

// 1. Định nghĩa Interface
interface StepItemData {
  image: string;   // URL của ảnh
  content: string; // Nội dung mô tả (HTML)
}

interface StepsProps {
  heading?: string;
  lists?: StepItemData[];
}

// 2. Mock Data (Mô phỏng 4 bước ứng tuyển)
const mockSteps: StepItemData[] = [
  {
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=200&auto=format&fit=crop',
    content: '<p><strong>Bước 1</strong><br>Nộp hồ sơ trực tuyến qua cổng thông tin</p>',
  },
  {
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=200&auto=format&fit=crop',
    content: '<p><strong>Bước 2</strong><br>Hội đồng nhà trường xét duyệt hồ sơ</p>',
  },
  {
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=200&auto=format&fit=crop',
    content: '<p><strong>Bước 3</strong><br>Tham gia bài thi đánh giá năng lực & Phỏng vấn</p>',
  },
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200&auto=format&fit=crop',
    content: '<p><strong>Bước 4</strong><br>Nhận kết quả và hoàn tất thủ tục nhập học</p>',
  }
];

// 3. Component Chính
const Steps: React.FC<StepsProps> = ({ 
  heading = 'Quy trình dự tuyển', 
  lists = mockSteps 
}) => {
  return (
    <section className="sc-steps py-5">
      <div className="inner-container container">
        
        {/* Render Tiêu đề nếu có */}
        {heading && (
          <h2 
            className="text-center step-title fw-bold mb-5" 
            style={{ color: '#005d83' }}
          >
            {heading}
          </h2>
        )}

        {/* Render Danh sách các bước */}
        {lists && lists.length > 0 && (
          <div className="steps d-flex flex-wrap justify-content-between">
            {lists.map((item, index) => (
              <div 
                key={index} 
                // Mix các class utility của Bootstrap và class custom của bạn
                className="col-12 emasi-lg-3 step-item bg-white text-center pb-0 mb-4"
              >
                {/* Render Ảnh */}
                {item.image && (
                  <img 
                    className="step-img" 
                    src={item.image} 
                    alt={`Bước ${index + 1}`} 
                  />
                )}
                
                {/* Render Nội dung HTML */}
                {item.content && (
                  <div 
                    className="step-content"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Steps;