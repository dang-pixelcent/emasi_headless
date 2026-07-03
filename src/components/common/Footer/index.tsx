

import React from 'react';
import './Footer.css';
import { useStoreContext } from '@context/StoreContext'; // Import hàm normalizePath

interface FooterProps {
    footerData?: any;
}

const Footer: React.FC<FooterProps> = ({ footerData }) => {
    const { normalizePath } = useStoreContext();
    const content = footerData?.footerContent;

    if (!content) return null;

    return (
        <footer id="footer" className="position-relative text-white" style={{ background: '#00364d' }}>
            <div className="footer-overlay-left position-absolute"></div>
            <div className="footer-overlay-right position-absolute"></div>

            <div className="footer-top">
                <div className="inner-container">
                    <div className="footer-inner d-flex flex-wrap">

                        {/* ==================================
                            CỘT 1
                        ================================== */}
                        <div className="footer-col f-col-1">
                            <div className="footer-logo d-flex">
                                <img className="d-footer-logo" src={content.footeImage?.node?.sourceUrl} alt="Logo" />
                                {/* Logo Mobile và dòng chữ không có trong data, giữ nguyên tĩnh để không vỡ UI */}
                                <img className="m-footer-logo" src="/assets/images/mobile_logo.png" alt="Logo Mobile" />
                                <div className="m-footer-desc">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt .</div>
                            </div>
                            
                            <div className="title">{content.thanhVienCA}: </div>
                            <img src={content.image?.node?.sourceUrl} alt="Khai Sang" />
                            
                            {/* LOGO ĐỐI TÁC */}
                            <div className="partners">
                                <img src={content.partner?.node?.sourceUrl} alt="Partners" />
                            </div>
                        </div>

                        {/* ==================================
                            CỘT 2
                        ================================== */}
                        <div className="footer-col f-col-2">
                            
                            {/* Logo Trường ĐH/Đối tác (Viber, Cambridge...) */}
                            <div className="footer-logo d-flex">
                                {content.logoUni?.map((uni: any, idx: number) => {
                                    // Nếu CMS có điền link thì bọc trong thẻ <a>, nếu không thì chỉ hiện thẻ <img>
                                    const hasLink = uni.link?.url;
                                    const imgNode = <img key={`img-${idx}`} src={uni.image?.node?.sourceUrl} alt={`Logo ${idx}`} />;
                                    
                                    return hasLink ? (
                                        <a key={idx} href={normalizePath(uni.link?.url)} target={uni.link?.target || "_self"}>
                                            {imgNode}
                                        </a>
                                    ) : (
                                        imgNode
                                    );
                                })}
                            </div>

                            {/* Thông tin liên hệ (Email & Phone) */}
                            <div className="footer-infor d-flex flex-column">
                                {content.contact?.map((item: any, idx: number) => {
                                    // Dựa vào cấu trúc HTML cũ: Index 0 là Email, Index 1 là Phone
                                    const isPhone = idx === 1;

                                    return (
                                        <div key={idx} className={isPhone ? "phone" : "email"}>
                                            <img src={item.icon?.node?.sourceUrl} alt="Icon" />
                                            {isPhone ? (
                                                // Khối Phone có flex-column bọc các thẻ span con
                                                <div className="d-flex flex-column">
                                                    {item.content?.map((c: any, cIdx: number) => (
                                                        <span key={cIdx}>{c.title}</span>
                                                    ))}
                                                </div>
                                            ) : (
                                                // Khối Email chỉ có 1 thẻ span
                                                <span>{item.content?.[0]?.title}</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Menu Chính sách */}
                            <div className="footer-nav">
                                {content.listLink?.map((linkItem: any, idx: number) => (
                                    <a key={idx} href={normalizePath(linkItem.link?.url)} target={linkItem.link?.target || "_self"}>
                                        {linkItem.title}
                                    </a>
                                ))}
                            </div>

                            {/* Mạng xã hội */}
                            <div className="social-links d-flex align-items-center">
                                {content.icon?.map((social: any, idx: number) => (
                                    <a key={idx} href={social.link?.url || "#"} target={social.link?.target || "_blank"} rel="noreferrer">
                                        <img src={social.image?.node?.sourceUrl} alt="Social" />
                                    </a>
                                ))}
                            </div>

                            {/* Copyright */}
                            <div className="copyright">
                                {content.copyRight}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
