import React, { useState } from "react";
import { cn } from "@/utils/clsx";
import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { Plus, X } from "lucide-react";
// import IconAdd from "../../icon/iconAdd";
// import IconClose2 from "../../icon/iconClose2";

interface Props {
  acf_fc_layout: string;
  title: string;
  list: List[];
}
interface List {
  faq: string;
  answer: string;
}

const FaqsServices = ({ acf_fc_layout, list, title }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Section>
      <div className="">
        {/* --- HEADING --- */}
        {title && <HeadingH3 className="text-black-primary">{title}</HeadingH3>}

        {/* --- CONTENT --- */}
        <div className="flex flex-col w-full mt-20">
          {list &&
            list?.map((item, index) => {
              const isOpen = openIndex === index;
              const hideBorderTop =
                index === 0 || isOpen || index === (openIndex ?? -1) + 1;

              const displayIndex =
                index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

              return (
                <div
                  key={index}
                  className={cn(
                    "w-full transition-[grid-template-rows] duration-300 ease-in-out",
                    // Logic Border Top
                    !hideBorderTop && "border-t border-[#D9DBE9]",
                    // Active State Styles
                    isOpen
                      ? "bg-[#F4F4F4] rounded-2xl md:rounded-3xl"
                      : "bg-transparent",
                  )}
                >
                  {/* --- QUESTION HEADER (Clickable) --- */}
                  <button
                    onClick={() => handleToggle(index)}
                    className={cn(
                      "w-full grid md:inline-flex justify-between items-center cursor-pointer text-left bg-transparent border-none outline-none",
                      // Layout Grid: [Số] [Câu hỏi] [Icon]
                      // Mobile: Gap nhỏ, padding nhỏ
                      "grid-cols-[auto_1fr_auto] gap-3 px-6 py-6",
                      // Tablet/Desktop: Gap lớn, padding lớn
                      "md:grid-cols-[80px_1fr_auto] md:gap-4 md:px-10 md:py-[44.21px]",
                    )}
                  >
                    {/* 1. Number */}
                    <div
                      className={cn(
                        "font-accent font-medium text-2xl md:text-hs32 leading-none tracking-[-0.3px] text-hydrology-dark-1",
                        isOpen ? "text-[#0C1311]" : "text-secondary",
                      )}
                    >
                      {displayIndex}
                    </div>

                    {/* 2. Question Text */}
                    <div className="md:max-w-122.5 md:w-122.5">
                      <span className="font-body font-semibold text-[#0C1311] md:text-lg lg:text-t18 leading-[1.4] text-hydrology-dark-1 block">
                        {item.faq}
                      </span>
                    </div>

                    {/* 3. Icon */}
                    <div className="flex justify-end">
                      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-red-500 p-1 text-red-500 ">
                        {isOpen ? (
                          <X
                            className="w-full h-full text-hydrology-dark-1"
                            strokeWidth={1}
                          />
                        ) : (
                          <Plus
                            className="w-full h-full text-hydrology-dark-1"
                            strokeWidth={1}
                          />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* --- ANSWER (Accordion Animation) --- */}
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden flex justify-center px-6 md:px-6">
                      <div
                        className={cn(
                          "md:max-w-122.5 md:w-122.5 pb-6 md:pb-8 ", // Padding nội dung
                          // Logic căn lề cho answer thẳng hàng với question ở Desktop
                          // Question column là 80px + gap 16px = ~96px padding left
                        )}
                      >
                        {item.answer && (
                          <div
                            className="typo-title font-normal text-[#6D6D6D] leading-relaxed ck-content"
                            dangerouslySetInnerHTML={{ __html: item.answer }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Section>
  );
};

export default FaqsServices;
