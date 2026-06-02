import { useStoreContext } from "@/context/StoreContext";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const PaginationBlog = ({
  currentPage,
  totalPages,
  handlePageChange,
}: Props) => {
  const { setCurrentPage } = useStoreContext();
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      window.history.replaceState(null, "", `?page=${currentPage - 1}`);
      handlePageChange(currentPage - 1);
      setCurrentPage?.((currentPage - 1).toString());
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      window.history.replaceState(null, "", `?page=${currentPage + 1}`);
      handlePageChange(currentPage + 1);
      setCurrentPage?.((currentPage + 1).toString());
    }
  };

  const handleChoosePage = (page: number) => {
    window.history.replaceState(null, "", `?page=${page}`);
    handlePageChange(page);
    setCurrentPage?.(page.toString());
  };
  return (
    <div className="border-t border-solid border-[#EAECF0] w-full pt-[20px] flex justify-between items-center">
      <button
        className="pagination-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon size={20} />
        <span className="hidden sm:block">Previous</span>
      </button>
      <div className="pagination-numbers">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return <span key={`ellipsis-${index}`}>...</span>;
          }

          return (
            <button
              key={page}
              className={`pagination-button-number ${
                page === currentPage ? "active-number" : ""
              }`}
              onClick={() => handleChoosePage(page as number)}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        className="pagination-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <span className="hidden sm:block">Next</span>
        <ArrowRightIcon size={20} />
      </button>
    </div>
  );
};

export default PaginationBlog;
