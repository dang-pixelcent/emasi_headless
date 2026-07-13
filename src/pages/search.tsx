
import React, { useEffect, useState } from "react";
import { useLocation } from "@reach/router";
import { StaticQuery, graphql } from "gatsby";
import { Helmet } from "react-helmet";

// Components
import Layout from "@/components/common/Layout";
import MainTitle from "@/components/pages/program/main_title";

// ==========================================
// COMPONENT PHÂN TRANG (NẰM GỘP TRONG FILE)
// ==========================================
interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    const pages: (number | string)[] = [];

    // Logic tự động thu gọn số trang thành dấu "..." (ví dụ: 1 2 3 4 ... 33)
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pages.push(i);
        } else if (pages[pages.length - 1] !== "...") {
            pages.push("...");
        }
    }

    return (
        <nav
            className="pagination-wrapper"
            style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "60px",
                marginBottom: "20px"
            }}
        >
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                    style={{
                        background: "transparent",                   // Không có màu nền (khớp ảnh)
                        border: "none",                              // Không có khung viền (khớp ảnh)
                        outline: "none",
                        color: page === currentPage ? "#57cbf5" : "#003e58", // Màu xanh sáng cho trang hiện tại, màu xanh đậm cho trang khác
                        cursor: page === "..." ? "default" : "pointer",
                        fontSize: "22px",                            // Chữ số to rõ giống ảnh
                        fontWeight: page === currentPage ? "700" : "500",
                        padding: "5px 10px",
                        transition: "all 0.2s ease"
                    }}
                >
                    {page}
                </button>
            ))}
        </nav>
    );
};

// ==========================================
// TRANG TÌM KIẾM CHÍNH (SEARCH PAGE)
// ==========================================
const SearchPage = () => {
    const location = useLocation();
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Hiển thị 5 bài mỗi trang

    // Lấy từ khóa từ URL (ví dụ: ?s=f)
    const query = new URLSearchParams(location.search).get("s") || "";

    // Tự động phát hiện tiếng Anh hay tiếng Việt dựa vào đường dẫn hoặc mặc định 'vi'
    const isEn = location.pathname.includes("/en");
    const currentLang = isEn ? "en" : "vi";

    // Bộ từ điển nhỏ cho nút bấm và thông báo
    const i18n = {
        vi: {
            title: `Kết quả tìm kiếm cho: ${query}`,
            desc: `Tìm thấy ${results.length} kết quả`,
            seeMore: "----> XEM THÊM",
            searching: "Đang tìm kiếm...",
            noResult: `Không tìm thấy kết quả nào cho: "${query}"`,
        },
        en: {
            title: `Search results for: ${query}`,
            desc: `Found ${results.length} results`,
            seeMore: "----> SEE MORE",
            searching: "Searching...",
            noResult: `No results found for: "${query}"`,
        }
    };

    useEffect(() => {
        // Đọc dữ liệu từ file search-data.json trong folder public
        fetch("/search-data.json")
            .then((res) => res.json())
            .then((data) => {
                if (query) {
                    const filtered = data.filter((item: any) =>
                        item.s?.toLowerCase().includes(query.toLowerCase())
                    );
                    setResults(filtered);
                } else {
                    setResults([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi khi tải dữ liệu tìm kiếm:", err);
                setLoading(false);
            });
    }, [query]);

    // Logic cắt mảng để phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(results.length / itemsPerPage);

    // Xử lý khi chuyển trang -> Tự động cuộn mượt lên đầu danh sách
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 300, behavior: "smooth" });
    };

    return (
        <StaticQuery
            query={graphql`
        query GetThemeForSearch {
          wpThemeOptions {
            header
            footer
            topMenu
            leftPanel
          }
        }
      `}
            render={(data) => {
                const themeOptions = data?.wpThemeOptions;

                return (
                    <Layout themeOption={themeOptions} currentLang={currentLang}>
                        <Helmet>
                            <title>
                                {query
                                    ? `${query} - ${currentLang === 'vi' ? 'Tìm kiếm' : 'Search'}`
                                    : (currentLang === 'vi' ? 'Tìm kiếm' : 'Search')}
                            </title>
                        </Helmet>
                        {/* Banner Tiêu đề trang */}
                        <MainTitle
                            data={{
                                uri: "/search",
                                title: i18n[currentLang].title,
                                desc: query ? i18n[currentLang].desc : undefined,
                            }}
                            lang={currentLang}
                        />

                        {/* Khu vực kết quả tìm kiếm */}
                        <div className="container" style={{
                            // Trên máy tính margin-left là 250px, trên điện thoại (dưới 768px) thì là 0 hoặc 15px
                            marginLeft: typeof window !== 'undefined' && window.innerWidth < 768 ? "15px" : "250px",
                            marginRight: "15px",
                            marginTop: "60px",
                            marginBottom: "60px",
                            minHeight: "50vh",
                            maxWidth: "960px"
                        }}>
                            {loading ? (
                                <p style={{ fontSize: "18px", color: "#666" }}>{i18n[currentLang].searching}</p>
                            ) : results.length > 0 ? (
                                <>
                                    <div className="search-results-list">
                                        {currentItems.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="search-item"
                                                style={{ marginBottom: "45px" }}
                                                data-aos="fade-up"
                                            >
                                                {/* Tiêu đề bài viết - Màu xanh đậm #003e58 */}
                                                <h3 className="f-ibmplexsans fw-600" style={{ fontSize: "24px", marginBottom: "12px" }}>
                                                    <a
                                                        href={item.uri}
                                                        style={{ color: "#003e58", textDecoration: "none", transition: "0.2s" }}
                                                        onMouseOver={(e) => (e.currentTarget.style.color = "#57cbf5")}
                                                        onMouseOut={(e) => (e.currentTarget.style.color = "#003e58")}
                                                    >
                                                        {item.title}
                                                    </a>
                                                </h3>

                                                {/* Đoạn văn mô tả (Nếu có trong search index) */}
                                                {item.excerpt && (
                                                    <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "12px", fontSize: "16px" }}>
                                                        {item.excerpt}
                                                    </p>
                                                )}

                                                {/* Nút Xem thêm - Màu xanh sáng #57cbf5 */}
                                                <a
                                                    href={item.uri}
                                                    style={{
                                                        color: "#57cbf5",
                                                        fontWeight: "400",
                                                        fontSize: "14px",
                                                        textTransform: "uppercase",
                                                        textDecoration: "none",
                                                        letterSpacing: "1px"
                                                    }}
                                                >
                                                    {i18n[currentLang].seeMore}
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Thanh Phân Trang (Chỉ hiện khi tổng số bài > 5) */}
                                    {totalPages > 1 && (
                                        <Pagination
                                            totalPages={totalPages}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    )}
                                </>
                            ) : (
                                <p style={{ fontSize: "18px", color: "#666" }}>{i18n[currentLang].noResult}</p>
                            )}
                        </div>
                    </Layout>
                );
            }}
        />
    );
};

export default SearchPage;