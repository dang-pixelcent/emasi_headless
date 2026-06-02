import React, { forwardRef, useEffect, useState, useRef } from "react";
import { SearchIcon, X, Clock, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/utils/clsx";
import { useLocalSearch } from "@/hooks/useLocalSearch";

interface SearchBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBox = forwardRef<HTMLDivElement, SearchBoxProps>(
  ({ isOpen, onClose }, ref) => {
    // 1. GỌI HOOK LOGIC
    const {
      searchTerm,
      setSearchTerm,
      results,
      recentSearches,
      isTyping,
      handleSelect,
      removeRecent,
      sectionResults,
      pageResults,
    } = useLocalSearch();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showResults, setShowResults] = useState(true);

    // Ref cho wrapper và input để focus lại sau khi clear
    const inputWrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const navigationList = isTyping ? results : recentSearches;
    const activeItem = navigationList[selectedIndex];

    useEffect(() => setSelectedIndex(-1), [searchTerm]);

    // [NEW] RESET INDEX KHI ẨN KẾT QUẢ
    // Logic: Bất kể lý do gì làm dropdown ẩn đi (Click outside, Esc...),
    // ta đều reset vị trí chọn về -1 (không chọn gì cả).
    useEffect(() => {
      if (!showResults) {
        setSelectedIndex(-1);
      }
    }, [showResults]);

    // Reset & Focus Logic
    useEffect(() => {
      if (!isOpen) {
        setSearchTerm("");
        setSelectedIndex(-1);
      } else {
        setShowResults(true);
        // [NEW] AUTO FOCUS LOGIC
        // Dùng setTimeout nhỏ để đảm bảo Animation bắt đầu và Input đã mount vào DOM
        const timer = setTimeout(() => {
          inputRef.current?.focus();
        }, 100); // 100ms là đủ nhanh để mắt không thấy trễ, nhưng đủ chậm để React render xong
        return () => clearTimeout(timer);
      }
    }, [isOpen, setSearchTerm]);

    // Click Outside
    useEffect(() => {
      const handleClickOutsideInput = (event: MouseEvent) => {
        if (
          inputWrapperRef.current &&
          !inputWrapperRef.current.contains(event.target as Node)
        ) {
          setShowResults(false);
        }
      };
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutsideInput);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideInput);
      };
    }, [isOpen]);

    // Keyboard
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!showResults) setShowResults(true);
      if (navigationList.length === 0) {
        // [NEW] Nếu ấn Enter mà không có kết quả và input rỗng -> Đóng luôn
        if (e.key === "Enter" && !searchTerm) {
          onClose();
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === navigationList.length - 1 ? 0 : prev + 1,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? navigationList.length - 1 : prev - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && activeItem) {
          handleSelect(activeItem, isTyping ? "type" : "recent");
          onClose();
        }
      } else if (e.key === "Escape") {
        if (showResults && (isTyping || recentSearches.length > 0)) {
          setShowResults(false);
        } else {
          onClose();
        }
      }
    };

    // [NEW] HÀM XỬ LÝ SMART CLOSE
    const handleSmartClose = () => {
      // Trường hợp 1: Có chữ -> Xóa chữ & Focus lại input để gõ tiếp
      if (searchTerm) {
        setSearchTerm("");
        inputRef.current?.focus();
        setShowResults(true);
      }
      // Trường hợp 2: Rỗng -> Đóng SearchBox
      else {
        onClose();
      }
    };

    // ... (Giữ nguyên logic highlightText và ResultItem như cũ)
    const highlightText = (text: string, highlight: string) => {
      /* ... code highlight cũ ... */
      if (!text || !highlight) return text;
      const parts = text.split(new RegExp(`(${highlight})`, "gi"));
      return parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-black-primary font-bold">
            {part}
          </span>
        ) : (
          part
        ),
      );
    };

    const ResultItem = ({
      item,
      index,
      type,
    }: {
      item: any;
      index: number;
      type: "recent" | "result";
    }) => {
      /* ... code item cũ ... */
      const isActive = index === selectedIndex;
      return (
        <li
          onMouseEnter={() => setSelectedIndex(index)}
          onClick={() => {
            handleSelect(item, type === "recent" ? "recent" : "type");
            onClose();
          }}
          className={cn(
            "flex items-center justify-between px-3 py-2.5 rounded-sm cursor-pointer transition-colors",
            isActive ? "bg-[#f4f4f4]" : "hover:bg-gray-50",
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {type === "recent" ? (
              <Clock className="w-4 h-4 text-gray shrink-0" />
            ) : (
              <SearchIcon className="w-4 h-4 text-gray shrink-0 opacity-50" />
            )}
            <span className="text-t18 text-black-primary truncate block max-w-[380px]">
              {type === "result"
                ? highlightText(item.title, searchTerm)
                : item.title}
            </span>
          </div>
          {type === "recent" ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeRecent(item.uri);
              }}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4 text-gray" />
            </button>
          ) : (
            isActive && (
              <ChevronRight className="w-4 h-4 text-gray opacity-50" />
            )
          )}
        </li>
      );
    };

    return (
      <div ref={ref} className="w-full absolute top-full left-0 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white shadow-md border-t border-[#DBDBDC]"
            >
              <div className="py-4 flex flex-col items-center">
                {/* --- HEADER + INPUT --- */}
                <div className="flex gap-4 justify-center items-center w-full max-w-[640px] relative">
                  <span className="text-t16 font-heading text-black-primary font-medium whitespace-nowrap">
                    Search
                  </span>

                  {/* Input Wrapper */}
                  <div className="relative flex-1 " ref={inputWrapperRef}>
                    <div className="flex gap-2 p-3 items-center justify-between rounded-sm bg-[#F9F9F9] border border-transparent focus-within:border-gray-200 transition-colors">
                      <div className="flex gap-2 items-center w-full">
                        <SearchIcon
                          className="w-5 h-5 text-gray"
                          strokeWidth={2}
                        />
                        <input
                          ref={inputRef} // [NEW] Gắn ref để focus lại
                          autoFocus
                          type="text"
                          placeholder="Type to search..."
                          className="w-full border-none outline-none bg-transparent text-sm text-black-primary placeholder:text-gray"
                          value={searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowResults(true);
                          }}
                          onKeyDown={handleKeyDown}
                          onFocus={() => setShowResults(true)}
                        />
                      </div>

                      {/* [MODIFIED] SMART CLOSE BUTTON: Luôn hiển thị */}
                      <span
                        onClick={handleSmartClose}
                        className="cursor-pointer p-1 hover:bg-gray-200 rounded-full transition-colors"
                        title={searchTerm ? "Clear text" : "Close search"}
                      >
                        <X
                          className={cn("w-4 h-4 text-gray transition-all", {
                            "text-black-primary scale-110": !!searchTerm, // Nếu có text thì đậm hơn 1 chút để báo hiệu Clear
                            "opacity-70": !searchTerm, // Nếu không có text thì nhạt hơn chút
                          })}
                        />
                      </span>
                    </div>

                    {/* --- ABSOLUTE RESULTS DROPDOWN --- */}
                    {showResults && (isTyping || recentSearches.length > 0) && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-50 overflow-hidden z-[60] max-h-[60vh] overflow-y-auto">
                        {/* ... Phần render list giữ nguyên như cũ ... */}
                        {!isTyping && recentSearches.length > 0 && (
                          <div className="p-6">
                            <h4 className="text-[14px] font-bold text-gray uppercase mb-1 px-3 tracking-wider">
                              Recent
                            </h4>
                            <ul>
                              {recentSearches.map((item, idx) => (
                                <ResultItem
                                  key={idx}
                                  item={item}
                                  index={idx}
                                  type="recent"
                                />
                              ))}
                            </ul>
                          </div>
                        )}

                        {isTyping && (
                          <div className="p-6">
                            {sectionResults.length > 0 && (
                              <div className="mb-2">
                                <h4 className="text-[14px] font-bold text-[#C73F2E] uppercase mb-1 px-3 tracking-wider">
                                  Services
                                </h4>
                                <ul>
                                  {sectionResults.map((item) => {
                                    const realIndex = results.findIndex(
                                      (r) => r.id === item.id,
                                    );
                                    return (
                                      <ResultItem
                                        key={item.id}
                                        item={item}
                                        index={realIndex}
                                        type="result"
                                      />
                                    );
                                  })}
                                </ul>
                              </div>
                            )}

                            {pageResults.length > 0 && (
                              <div>
                                <h4 className="text-[14px] font-bold text-gray uppercase mb-1 px-3 tracking-wider">
                                  Pages & Posts
                                </h4>
                                <ul>
                                  {pageResults.map((item) => {
                                    const realIndex = results.findIndex(
                                      (r) => r.id === item.id,
                                    );
                                    return (
                                      <ResultItem
                                        key={item.id}
                                        item={item}
                                        index={realIndex}
                                        type="result"
                                      />
                                    );
                                  })}
                                </ul>
                              </div>
                            )}

                            {results.length === 0 && (
                              <div className="px-3 py-6 text-t18 text-gray text-center italic">
                                No results found for "{searchTerm}"
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* [REMOVED] Đã xóa nút X bên ngoài ở đây */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

export default SearchBox;
