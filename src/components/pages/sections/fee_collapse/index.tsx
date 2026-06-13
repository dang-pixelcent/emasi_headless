import React, { useState } from "react";
import './collapse.css';

//collapse của main_content_fee

export const collapseData = [
  {
    title: "Lịch Năm Học 2024 - 2025",
    content: (
      <img
        src="/assets/images/demo/sections/fee-collapse/Academic-Calendar-2024-2025-EMASI-Schools-1-1024x724.jpg"
        alt="Lịch Năm Học 2024 - 2025"
      />
    ),
    download:
      "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Academic-Calendar-2024-2025-EMASI-Schools.pdf",
  },
  {
    title: "Lịch Năm Học 2025 - 2026",
    content: (
      <img
        src="/assets/images/demo/sections/fee-collapse/emasi_academic-calendar_2526-1024x716.jpg"
        alt="Lịch Năm Học 2025 - 2026"
      />
    ),
    download:
      "https://emasi.pixelcent.com/wp-content/uploads/2025/04/emasi_academic-calendar_2526.pdf",
  },
];

export default function Collapse() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="collapse-items" data-aos="fade-up">
      {collapseData.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`collapse-item ${
              activeIndex === index ? "" : "collapsed"
            }`}
            onClick={() => handleToggle(index)}
            data-aos-delay={(index + 1) * 100}
          >
            <img src="/assets/images/arrow-down.svg" alt="" />
            {item.title}
          </div>

          <div
            className={`collapse ${
              activeIndex === index ? "show" : ""
            }`}
          >
            <div className="collapse-content">{item.content}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};