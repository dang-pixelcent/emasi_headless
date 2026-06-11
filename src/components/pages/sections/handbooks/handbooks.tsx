import React, { useEffect, useState } from "react";
import "./handbooks.css";

const tabs = [
    {
        title: "EMASI Nam Long",
        collapses: [
            {
                title: "Sổ tay chương trình",
                books: [
                    {
                        id: "60337",
                        title: "Sổ Tay Chương Trình Quốc Tế – Hệ Thống Trường EMASI",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.14.45.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/VIE-IP-Handbook-2023-2024.pdf",
                    },
                    {
                        id: "60356",
                        title: "Sổ Tay Chương Trình IGCSE – Hệ Thống Trường EMASI",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.15.09.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/IGCSE-Handbook-2024-EMASI-Schools.pdf",
                    },
                ],
            },
            {
                title: "Sổ tay dành cho Phụ huynh",
                books: [
                    {
                        id: "60485",
                        title: "Sổ tay Phụ huynh – Trường EMASI Nam Long",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Parent-Handbook-EMASI-Nam-Long-1-scaled.jpg",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Parent-Handbook-EMASI-Nam-Long.pdf",
                    },
                    {
                        id: "60475",
                        title: "Sổ tay Y tế",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.15.58.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Medical-Handbook.pdf",
                    },
                ],
            },
            {
                title: "Sổ tay dành cho Học sinh",
                books: [
                    {
                        id: "60479",
                        title: "Sổ tay Học sinh – Trường EMASI Nam Long",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Student-Handbook-2024-2025_EMASI-Nam-Long-1-1-scaled.jpg",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Student-Handbook-2024-2025_EMASI-Nam-Long.pdf",
                    },
                ],
            },
             {
                title: "Quy trình, Chính sách",
                books: [
                    {
                        id: "60366",
                        title: "Chính sách bảo vệ trẻ em – Hệ thống Trường EMASI",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Child-Protection-Policy-Handbook-EMASI-Schools0-scaled.jpg",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Child-Protection-Policy-Handbook-EMASI-Schools.pdf",
                    },
                ],
            },
        ],
    },
    {
        title: "EMASI Vạn Phúc",
       collapses: [
            {
                title: "Sổ tay chương trình",
                books: [
                    {
                        id: "60337",
                        title: "Sổ Tay Chương Trình Quốc Tế – Hệ Thống Trường EMASI",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.14.45.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/VIE-IP-Handbook-2023-2024.pdf",
                    },
                    {
                        id: "60356",
                        title: "Sổ Tay Chương Trình IGCSE – Hệ Thống Trường EMASI",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.15.09.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/IGCSE-Handbook-2024-EMASI-Schools.pdf",
                    },
                ],
            },
            {
                title: "Sổ tay dành cho Phụ huynh",
                books: [
                    {
                        id: "60485",
                        title: "Sổ tay Phụ huynh – Trường EMASI Vạn Phúc",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.15.26.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Parent-Handbook-EMASI-Van-Phuc.pdf",
                    },
                    {
                        id: "60475",
                        title: "Sổ tay Y tế",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Screenshot-2025-04-03-at-11.15.58.png",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Medical-Handbook.pdf",
                    },
                ],
            },
            {
                title: "Sổ tay dành cho Học sinh",
                books: [
                    {
                        id: "60479",
                        title: "Sổ tay Học sinh – Trường EMASI Vạn Phúc",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Student-Handbook-2024-2025_EMASI-Nam-Long-1-1-scaled.jpg",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Student-Handbook-2024-2025_EMASI-Nam-Long.pdf",
                    },
                ],
            },
             {
                title: "Quy trình, Chính sách",
                books: [
                    {
                        id: "60366",
                        title: "Chính sách bảo vệ trẻ em – Hệ thống Trường EMASI",
                        thumb:
                            "/assets/images/demo/sections/handbooks/Child-Protection-Policy-Handbook-EMASI-Schools0-scaled.jpg",
                        pdf: "https://emasi.pixelcent.com/wp-content/uploads/2025/04/Child-Protection-Policy-Handbook-EMASI-Schools.pdf",
                    },
                ],
            },
        ],
    },
];

export default function Handbooks() {
    const [activeTab, setActiveTab] = useState(0);
    const [openCollapse, setOpenCollapse] = useState<string | null>(null);

    const toggleCollapse = (key: string) => {
        setOpenCollapse((prev) => (prev === key ? null : key));
    };

    useEffect(() => {
        const AOS = (window as any).AOS;
        if (AOS) {
            if (typeof AOS.refresh === "function") {
                AOS.refresh();
            } else if (typeof AOS.init === "function") {
                AOS.init();
            }
        }
    }, [activeTab, openCollapse]);

    return (
        <>
            {/* TABS */}
            <div className="button nav nav-tabs">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`item nav-link ${activeTab === index ? "active" : ""}`}
                        data-aos="fade-up"
                        onClick={() => {
                            setActiveTab(index);
                            setOpenCollapse(null);
                        }}
                        type="button"
                    >
                        <img
                            src="/assets/images/demo/icon-marker-large.png"
                            alt=""
                        />
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* CONTENT */}
            <div className="tab-content">
  {tabs.map((tab, tabIndex) => (
    <div
      key={tabIndex}
      className={`collapse-items tab-pane fade ${
        activeTab === tabIndex ? "show active" : ""
      }`}
    >
      <div id={`accordion-${tabIndex}`}>
        {tab.collapses.map((collapse, collapseIndex) => {
          const collapseKey = `${tabIndex}-${collapseIndex}`;
          const isOpen = openCollapse === collapseKey;

          return (
            <React.Fragment key={collapseKey}>
              {/* Header */}
              <div
                className={`collapse-item ${!isOpen ? "collapsed" : ""}`}
                data-aos="fade-right"
                onClick={() => toggleCollapse(collapseKey)}
              >
                <img
                  src="/assets/images/arrow-down.svg"
                  alt=""
                />

                {collapse.title}
              </div>

              {/* Body */}
              <div className={`collapse ${isOpen ? "show" : ""}`}>
                <div className="collapse-content">
                  {collapse.books.map((book) => (
                    <a
                      key={book.id}
                      href={book.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="item"
                    >
                      <div
                        className="_df_thumb df-element df-popup-thumb df-tl-book-title-hover"
                        id={`df_${book.id}`}
                        data-title={book.title}
                      >
                        <div className="df-book-wrapper">
                          <div className="df-book-page1" />

                          <div className="df-book-page2" />

                          <div className="df-book-cover">
                            <img
                              src={book.thumb}
                              alt={book.title}
                              width={210}
                              height={297}
                            />

                            <span className="df-book-title">
                              {book.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  ))}
</div>
        </>
    );
}