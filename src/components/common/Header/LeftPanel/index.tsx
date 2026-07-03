

// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link } from 'gatsby';
// // import './LeftPanel.css';
// // import { useStoreContext } from '../../../../context/StoreContext';

// // interface LeftPanelProps {
// //   leftData: any;
// //   headerData1: any;
// // }

// // const LeftPanel = ({ leftData, headerData1 }: LeftPanelProps) => {
// //   const [activeIndex, setActiveIndex] = useState<number | null>(null);
// //   const panelRef = useRef<HTMLDivElement>(null);
// //   const { normalizePath } = useStoreContext();

// //   const handleToggle = (index: number, hasChild: boolean, e: React.MouseEvent) => {
// //     if (hasChild) {
// //       e.preventDefault();
// //       setActiveIndex(activeIndex === index ? null : index);
// //     }
// //   };

// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (window.innerWidth > 1200 && panelRef.current && !panelRef.current.contains(event.target as Node)) {
// //         setActiveIndex(null);
// //       }
// //     };
// //     document.addEventListener('click', handleClickOutside);
// //     return () => document.removeEventListener('click', handleClickOutside);
// //   }, []);

// //   if (!leftData || !headerData1) return null;

// //   const topItems = leftData?.topPanel?.topPanel || [];
// //   const bottomItems = headerData1?.headermobile?.list || [];
// //   console.log("=== LEFT PANEL RECEIVED DATA ===");
// //   console.log("Top Items:", topItems);
// //   console.log("Bottom Items:", bottomItems);
// //   // Hàm Helper thông minh: Xử lý cả Action Button, External Link và Internal Link
// //   const RenderLink = ({
// //     url,
// //     targetBlank,
// //     children,
// //     className,
// //     isAction
// //   }: {
// //     url?: string,
// //     targetBlank?: boolean,
// //     children: React.ReactNode,
// //     className?: string,
// //     isAction?: boolean
// //   }) => {
// //     if (isAction) {
// //       return (
// //         <a
// //           // Bỏ hoàn toàn href đi
// //           className={className}
// //           style={{ cursor: 'pointer' }} // Giữ lại con trỏ chuột hình bàn tay
// //           onClick={(e) => e.preventDefault()}
// //         >
// //           {children}
// //         </a>
// //       );
// //     }

// //     // 2. Xử lý link thông thường
// //     const href = normalizePath(url);
// //     const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

// //     if (isExternal) {
// //       return (
// //         <a href={href} target="_blank" rel="noreferrer" className={className}>
// //           {children}
// //         </a>
// //       );
// //     }

// //     return (
// //       <Link to={href} target={targetBlank ? "_blank" : "_self"} className={className}>
// //         {children}
// //       </Link>
// //     );
// //   };

// //   return (
// //     <div className="left-panel" ref={panelRef}>
// //       <div className="left-panel-menus">

// //         {/* =======================
// //             KHỐI TOP 
// //         ======================= */}
// //         <div className="left-panel-top">
// //           <ul className="left-panel-nav">
// //             {topItems.map((item: any, index: number) => {
// //               const url = item.link?.url;
// //               // Nếu url rỗng, null, hoặc bằng '#' -> Nó là nút Tìm kiếm / Menu dọc
// //               const isAction = !url || url === '#' || url.includes('javascript');
// //               const hasSub = item.sub && item.sub.length > 0;
// //               // Nó có menu con nếu có mảng sub HOẶC nó là nút Action (cần bung form Search)
// //               const hasChild = hasSub || isAction;

// //               return (
// //                 <li
// //                   key={index}
// //                   className={`${hasChild ? 'has-child' : ''} ${activeIndex === index ? 'active' : ''}`}
// //                   onClick={(e) => handleToggle(index, hasChild, e)}
// //                 >
// //                   <RenderLink url={url} targetBlank={item.targetBlank} isAction={isAction}>
// //                     <div className="icons">
// //                       <img className="icon" alt={item.title} src={item.image?.node?.sourceUrl} />
// //                       <img className="icon-hover" alt={item.title} src={item.image?.node?.sourceUrl} />
// //                     </div>
// //                     {item.title && <div className="name">{item.title}</div>}
// //                   </RenderLink>

// //                   {/* --- HIỂN THỊ SUBMENU HOẶC FORM TÌM KIẾM --- */}
// //                   {hasChild && (
// //                     <div className="sub-menu">
// //                       <div className="box-left-panel-search">

// //                         {/* Nếu là nút Action (Tìm kiếm) -> Render Form input */}
// //                         {isAction && (
// //                           <div className="box-search-top">
// //                             <form action="/search" className="frm-search" onClick={(e) => e.stopPropagation()}>
// //                               <input type="text" name="s" className="txt-search" placeholder="Tìm kiếm" />
// //                             </form>
// //                           </div>
// //                         )}

// //                         {/* Nếu có danh sách link con -> Render Danh sách */}
// //                         {hasSub && (
// //                           <div className="box-search-content text-white">
// //                             <ul className="search-results-h">
// //                               {item.sub.map((sub: any, subIdx: number) => (
// //                                 <li key={subIdx}>
// //                                   <RenderLink url={sub.link?.url}>{sub.title}</RenderLink>
// //                                 </li>
// //                               ))}
// //                             </ul>
// //                           </div>
// //                         )}

// //                       </div>
// //                     </div>
// //                   )}
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </div>

// //         {/* =======================
// //             KHỐI BOTTOM 
// //         ======================= */}
// //         <div className="left-panel-bottom">
// //           <ul className="left-panel-nav">
// //             {bottomItems.map((item: any, index: number) => {
// //               const url = item.link?.url;
// //               const isAction = !url || url === '#';

// //               return (
// //                 <li key={`bottom-${index}`} className="menu">
// //                   <RenderLink url={url} targetBlank={item.link?.target === "_blank"} isAction={isAction}>
// //                     <div className="icons">
// //                       <img className="icon" alt={item.title} src={item.icon?.node?.sourceUrl} />
// //                       <img className="icon-hover" alt={item.title} src={item.icon?.node?.sourceUrl} />
// //                     </div>
// //                     <div className="name">{item.title}</div>
// //                   </RenderLink>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default LeftPanel;
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'gatsby';
// import './LeftPanel.css';
// import { useStoreContext } from '../../../../context/StoreContext';

// interface LeftPanelProps {
//   leftData: any;
//   headerData1: any;
// }

// const LeftPanel = ({ leftData, headerData1 }: LeftPanelProps) => {
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const panelRef = useRef<HTMLDivElement>(null);
//   const { normalizePath } = useStoreContext();

//   const handleToggle = (index: number, hasChild: boolean, e: React.MouseEvent) => {
//     console.log("=== CLICK ĐƯỢC GỌI ===");
//     console.log("Index:", index, "HasChild:", hasChild);
//     if (hasChild) {
//       e.preventDefault();
//       e.stopPropagation();

//       setActiveIndex(activeIndex === index ? null : index);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (window.innerWidth > 1200 && panelRef.current && !panelRef.current.contains(event.target as Node)) {
//         setActiveIndex(null);
//       }
//     };
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   if (!leftData || !headerData1) return null;

//   const topItems = leftData?.topPanel?.topPanel || [];
//   const bottomItems = headerData1?.headermobile?.list || [];

//   const RenderLink = ({
//     url,
//     targetBlank,
//     children,
//     className,
//     isAction,
//     onClick
//   }: {
//     url?: string,
//     targetBlank?: boolean,
//     children: React.ReactNode,
//     className?: string,
//     isAction?: boolean,
//     onClick?: (e: React.MouseEvent) => void // <-- Khai báo kiểu
//   }) => {
//     if (isAction) {
//       return (
//         <a className={className} style={{ cursor: 'pointer' }} onClick={(e) => {
//           e.preventDefault();
//           if (onClick) {
//             onClick(e);
//           }
//         }}>
//           {children}
//         </a >
//       );
//     }

//     const href = normalizePath(url);
//     const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

//     if (isExternal) {
//       return (
//         <a href={href} target="_blank" rel="noreferrer" className={className}>
//           {children}
//         </a>
//       );
//     }

//     return (
//       <Link to={href} target={targetBlank ? "_blank" : "_self"} className={className}>
//         {children}
//       </Link>
//     );
//   };
//   console.log("=== LEFT PANEL RECEIVED DATA ===");
//   console.log("Left Data:", leftData);
//   return (
//     <div className="left-panel" ref={panelRef}>
//       <div className="left-panel-menus">

//         {/* =======================
//             KHỐI TOP 
//         ======================= */}
//         <div className="left-panel-top">
//           <ul className="left-panel-nav">
//             {topItems.map((item: any, index: number) => {
//               const url = item.link?.url;
//               const isSearch = item.title?.toLowerCase().includes("tìm kiếm");

//               // Là nút bấm chức năng nếu URL rỗng, = "#" HOẶC tiêu đề là "Tìm kiếm"
//               const isAction = !url || url === '#' || isSearch;

//               // Có dữ liệu sub-menu trả về từ WP
//               const hasSub = item.sub && item.sub.length > 0;
//               { console.log("sub; ", item.sub) }

//               // Cần mũi tên dropdown và kích hoạt submenu nếu có mảng sub hoặc là khung Search
//               const hasChild = hasSub || isAction;

//               return (
//                 <li
//                   key={index}
//                   className={`${hasChild ? 'has-child' : ''} ${activeIndex === index ? 'active' : ''}`}
//                 >
//                   <RenderLink url={url} targetBlank={item.targetBlank} isAction={isAction} onClick={(e) => handleToggle(index, hasChild, e)}>
//                     <div className="icons">
//                       <img className="icon" alt={item.title} src={item.image?.node?.sourceUrl} />
//                       <img className="icon-hover" alt={item.title} src={item.image?.node?.sourceUrl} />
//                     </div>
//                     {item.title && <div className="name">{item.title}</div>}

//                   </RenderLink>

//                   {/* --- KHU VỰC ĐỔ DỮ LIỆU SUB-MENU & SEARCH --- */}
//                   {hasChild && (
//                     <div className="sub-menu" onClick={(e) => e.stopPropagation()}>
                      
//                       <div className="box-left-panel-search">

//                         {/* 1. HIỂN THỊ FORM NẾU LÀ TÌM KIẾM */}
//                         {isSearch && (
//                           <div className="box-search-top">
//                             <form action="/search" className="frm-search" onClick={(e) => e.stopPropagation()}>
//                               <input type="text" name="s" className="txt-search" placeholder="Tìm kiếm" />
//                             </form>
//                           </div>
//                         )}

//                         {/* 2. HIỂN THỊ DANH SÁCH MENU CON (SUB) TỪ WP */}
//                         {hasSub && (
//                           <div className="box-search-content text-white">
//                             <ul className="search-results-h">
//                               {item.sub.map((sub: any, subIdx: number) => (
//                                 <li key={subIdx}>
//                                   <RenderLink url={sub.link?.url}>{sub.title}</RenderLink>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                       </div>
//                     </div>
//                   )}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         {/* =======================
//             KHỐI BOTTOM 
//         ======================= */}
//         <div className="left-panel-bottom">
//           <ul className="left-panel-nav">
//             {bottomItems.map((item: any, index: number) => {
//               const url = item.link?.url;
//               const isAction = !url || url === '#';

//               return (
//                 <li key={`bottom-${index}`} className="menu">
//                   <RenderLink url={url} targetBlank={item.link?.target === "_blank"} isAction={isAction}>
//                     <div className="icons">
//                       <img className="icon" alt={item.title} src={item.icon?.node?.sourceUrl} />
//                       <img className="icon-hover" alt={item.title} src={item.icon?.node?.sourceUrl} />
//                     </div>
//                     <div className="name">{item.title}</div>
//                   </RenderLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LeftPanel;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import './LeftPanel.css';
import { useStoreContext } from '@context/StoreContext'; // Import hàm chuẩn hóa

interface LeftPanelProps {
  leftData: any;
}

const LeftPanel = ({ leftData }: LeftPanelProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { normalizePath } = useStoreContext();

  const handleToggle = (index: number, hasChild: boolean, e: React.MouseEvent) => {
    if (hasChild) {
      e.preventDefault();
      e.stopPropagation();
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (window.innerWidth > 1200 && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setActiveIndex(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (!leftData) return null;

  // LẤY ĐÚNG DỮ LIỆU TỪ LEFT DATA CHO CẢ TOP VÀ BOTTOM
  const topItems = leftData?.topPanel?.topPanel || [];
  const bottomItems = leftData?.topPanel?.bottomPanel || []; 

  const RenderLink = ({
    url,
    targetBlank,
    children,
    className,
    isAction,
    onClick
  }: {
    url?: string,
    targetBlank?: boolean,
    children: React.ReactNode,
    className?: string,
    isAction?: boolean,
    onClick?: (e: React.MouseEvent) => void 
  }) => {
    if (isAction) {
      return (
        <a className={className} style={{ cursor: 'pointer' }} onClick={(e) => {
          e.preventDefault();
          if (onClick) {
            onClick(e);
          }
        }}>
          {children}
        </a>
      );
    }

    const href = normalizePath(url);
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={className} onClick={onClick}>
          {children}
        </a>
      );
    }

    return (
      <Link to={href} target={targetBlank ? "_blank" : "_self"} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  };

  return (
    <div className="left-panel" ref={panelRef}>
      <div className="left-panel-menus">

        {/* =======================
            KHỐI TOP 
        ======================= */}
        <div className="left-panel-top">
          <ul className="left-panel-nav">
            {topItems.map((item: any, index: number) => {
              const url = item.link?.url;
              const isSearch = item.title?.toLowerCase().includes("tìm kiếm");
              const isAction = !url || url === '#' || isSearch;
              const hasSub = item.sub && item.sub.length > 0;
              const hasChild = hasSub || isAction;

              return (
                <li
                  key={index}
                  className={`${hasChild ? 'has-child' : ''} ${activeIndex === index ? 'active' : ''}`}
                >
                  <RenderLink url={url} targetBlank={item.targetBlank} isAction={isAction} onClick={(e) => handleToggle(index, hasChild, e)}>
                    <div className="icons">
                      <img className="icon" alt={item.title} src={item.image?.node?.sourceUrl} />
                      <img className="icon-hover" alt={item.title} src={item.image?.node?.sourceUrl} />
                    </div>
                    {item.title && <div className="name">{item.title}</div>}
                  </RenderLink>

                  {hasChild && (
                    <div className="sub-menu" onClick={(e) => e.stopPropagation()}>
                      <div className="box-left-panel-search">

                        {isSearch && (
                          <div className="box-search-top">
                            <form action="/search" className="frm-search" onClick={(e) => e.stopPropagation()}>
                              <input type="text" name="s" className="txt-search" placeholder="Tìm kiếm" />
                            </form>
                          </div>
                        )}

                        {hasSub && (
                          <div className="box-search-content text-white">
                            <ul className="search-results-h">
                              {item.sub.map((sub: any, subIdx: number) => (
                                <li key={subIdx}>
                                  <RenderLink url={sub.link?.url}>{sub.title}</RenderLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* =======================
            KHỐI BOTTOM (Đã đổi sang lấy từ leftData)
        ======================= */}
        <div className="left-panel-bottom">
          <ul className="left-panel-nav">
            {bottomItems.map((item: any, index: number) => {
              const url = item.link?.url;
              const isAction = !url || url === '#';

              return (
                <li key={`bottom-${index}`} className="menu">
                  <RenderLink url={url} targetBlank={item.targetBlank} isAction={isAction}>
                    <div className="icons">
                      {/* Đổi từ item.icon sang item.image cho khớp với LeftData */}
                      <img className="icon" alt={item.title} src={item.image?.node?.sourceUrl} />
                      <img className="icon-hover" alt={item.title} src={item.image?.node?.sourceUrl} />
                    </div>
                    {item.title && <div className="name">{item.title}</div>}
                  </RenderLink>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default LeftPanel;