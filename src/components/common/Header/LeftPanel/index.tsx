import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import { headerData } from '../mockData';
import './LeftPanel.css';

const TopPanel = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // LOGIC: Toggle Left Panel (Tương đương toggleLeftPanel trong emasi.js)
  const handleToggle = (index: number, hasChild: boolean, e: React.MouseEvent) => {
    if (hasChild) {
      e.preventDefault();
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  // LOGIC: Click ra ngoài để đóng menu (Tương đương addEventListener của emasi.js)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Chỉ đóng khi màn hình > 1200px (theo yêu cầu của emasi.js)
      if (window.innerWidth > 1200 && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="left-panel" ref={panelRef}>
      <div className="left-panel-menus">
        {/* --- KHỐI TOP --- */}
        <div className="left-panel-top">
          <ul className="left-panel-nav">
            {headerData.topPanel.map((item, index) => (
              <li
                key={index}
                className={`${item.hasChild ? 'has-child' : ''} ${activeIndex === index ? 'active' : ''}`}
                onClick={(e) => handleToggle(index, item.hasChild || false, e)}
              >
                <Link to={item.link}>
                  <div className="icons">
                    <img className="icon" alt={item.title} src={item.icon} />
                    <img className="icon-hover" alt={item.title} src={item.iconHover || item.icon} />
                  </div>
                  {item.title && <div className="name">{item.title}</div>}
                </Link>

                {/* --- KHUNG TÌM KIẾM --- */}
                {item.hasChild && (
                  <div className="sub-menu">
                    <div className="box-left-panel-search">
                      {item.showSearch && (
                        <div className="box-search-top">
                          <form action="/search" className="frm-search">
                            <input type="text" name="s" className="txt-search" placeholder="Tìm kiếm" />
                          </form>
                        </div>
                      )}
                      <div className="box-search-content text-white">
                        <h3 className="h3-title mb-0">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* --- KHỐI BOTTOM --- */}
        <div className="left-panel-bottom">
          <ul className="left-panel-nav">
            {headerData.bottomPanel.map((item, index) => (
              <li key={index} className="menu">
                <Link to={item.link}>
                  <div className="icons">
                    <img className="icon" alt={item.title} src={item.icon} />
                    <img className="icon-hover" alt={item.title} src={item.iconHover || item.icon} />
                  </div>
                  <div className="name">{item.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopPanel;