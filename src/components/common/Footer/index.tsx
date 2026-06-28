import React from 'react';

const Footer = () => {
    return (
        <footer id="footer" className="position-relative text-white" style={{ background: '#00364d' }}>
            <div className="footer-overlay-left position-absolute"></div>
            <div className="footer-overlay-right position-absolute"></div>

            <div className="footer-top">
                <div className="inner-container">
                    <div className="footer-inner d-flex flex-wrap">

                        {/* Cột 1 */}
                        <div className="footer-col f-col-1">
                            <div className="footer-logo d-flex">
                                <img className="d-footer-logo" src="/assets/images/footer-logo.png" alt="Logo" />
                                <img className="m-footer-logo" src="/assets/images/mobile_logo.png" alt="Logo Mobile" />
                                <div className="m-footer-desc">Môi trường giáo dục tiên tiến, song ngữ và quốc tế.</div>
                            </div>
                            <div className="title">Thành viên của: </div>
                            <img src="/assets/images/logo-khai-sang.png" alt="EMASI" />
                            {/* // LOGO ĐỐI TÁC */}
                            <div className="partners">
                                <img src="/assets/images/partners-logos-1.png" alt="Partners" />
                            </div>
                        </div>

                        {/* Cột 2 */}
                        <div className="footer-col f-col-2">
                            <div className="footer-logo d-flex">
                                <img src="/assets/images/anh_Viber.png" alt="Image Left" />
                                <img src="/assets/images/logo-cambridge-1.png" alt="Logo 1" />
                            </div>
                            <div className="footer-infor d-flex flex-column">
                                <div className="email">
                                    <img src="/assets/images/email-icon.svg" alt="Email" />
                                    <span>tuyensinh@emasi.edu.vn</span>
                                </div>
                                <div className="phone">
                                    <img src="/assets/images/phone-icon.svg" alt="Phone" />
                                    <div className="d-flex flex-column">
                                        <span>Hotline: 1800 599 918</span>
                                        <span>EMASI Nam Long: 028 3773 3668</span>
                                        <span>EMASI Vạn Phúc: 028 3588 9090</span>
                                        <span>EMASI Plus: 028 4455 8585</span>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-nav">
                                <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
                                <a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>
                            </div>

                            <div className="social-links d-flex align-items-center">
                                <a href="#" target="_blank" className="facebook">
                                    <img src="/assets/images/facebook.svg" alt="Facebook" />
                                </a>
                                <a href="#" target="_blank" className="instagram">
                                    <img src="/assets/images/instagram.svg" alt="Instagram" />
                                </a>
                                <a href="#" target="_blank" className="youtube">
                                    <img src="/assets/images/youtube.svg" alt="Youtube" />
                                </a>
                            </div>

                            <div className="copyright">
                                © Copyright 2025. EMASI. All rights reserved.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;