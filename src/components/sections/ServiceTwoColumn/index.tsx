import { HeadingH3, HeadingH4 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { images } from "@/lib/images";
import { cn } from "@/utils/clsx";
import React, { useMemo } from "react";

interface Props {
  acf_fc_layout: string;
  background_color: string;
  title: string;
  description: string;
  flexible_card: Flexiblecard[];
  bottom_content: string;
}

interface Flexiblecard {
  acf_fc_layout: string;
  background_box_color: string;
  list: List[];
  item?: List[];
  title_layout?: string;
}

interface List {
  icon: string;
  title: string;
  content: string;
}

const ServiceTwoColumnBenefit = ({
  acf_fc_layout,
  background_color,
  title,
  description,
  flexible_card,
  bottom_content,
}: Props) => {
  const checkList = useMemo(() => {
    return flexible_card.map((item) => item.acf_fc_layout).includes("list");
  }, [flexible_card]);

  return (
    <Section className={`bg-[${background_color}]`}>
      <div
        className={cn("flex flex-col gap-10 sm:gap-[56px]", {
          "gap-0 sm:gap-0": checkList,
        })}
      >
        <div
          className={cn("flex flex-col gap-4 sm:gap-6 max-w-[900px] mx-auto", {
            "hidden!": !title && !description,
          })}
        >
          <HeadingH3
            className={cn("text-[#1E1F20] text-center tracking-[-5%]", {
              "hidden!": !title,
            })}
          >
            {title}
          </HeadingH3>
          <div
            className={cn(
              "prose prose-sm sm:prose-lg text-[#707174] text-center",
              {
                "hidden!": !description,
              },
            )}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8", {
            "max-w-[900px] w-full mx-auto gap-2 sm:gap-2 mt-6 mb-6 sm:mb-[56px]":
              checkList,
          })}
        >
          {Array.isArray(flexible_card) &&
            flexible_card.map((v, index) => {
              switch (v.acf_fc_layout) {
                case "card_box_with_non_icon":
                  return v.list.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col gap-8 md:gap-10 bg-[${v.background_box_color}] p-6 sm:p-8 rounded-md`}
                    >
                      <div className="flex flex-col gap-4 ">
                        <HeadingH4
                          className={cn("text-[#1E1F20]", {
                            "hidden!": !item.title,
                          })}
                        >
                          {item.title}
                        </HeadingH4>
                        <div
                          className={cn(
                            "prose prose-sm sm:prose-base text-[#707174]",
                            {
                              "hidden!": !item.content,
                            },
                          )}
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        ></div>
                      </div>
                    </div>
                  ));
                case "card_box_with_icon":
                  return v.list.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: v.background_box_color,
                      }}
                      className={`flex flex-col gap-8 md:gap-10 bg-[${v.background_box_color}]! p-6 sm:p-8 rounded-md`}
                    >
                      <div
                        className={cn(
                          "flex flex-row gap-4 items-center w-full",
                          {
                            "hidden!": !item.title && !item.icon,
                          },
                        )}
                      >
                        <div
                          className={cn("aspect-square h-[48px] w-[48px]", {
                            "hidden!": !item.icon,
                          })}
                        >
                          <img
                            src={item.icon}
                            alt={item.title}
                            className="w-full h-full object-contain"
                            width={48}
                            height={48}
                          />
                        </div>
                        <HeadingH4
                          className={cn("text-[#1E1F20] text-base", {
                            "hidden!":
                              !item.title || v?.title_layout !== "inline",
                          })}
                        >
                          {item.title}
                        </HeadingH4>
                      </div>
                      <div className="flex flex-col gap-4 ">
                        <HeadingH4
                          className={cn("text-[#1E1F20]", {
                            "hidden!":
                              !item.title || v?.title_layout === "inline",
                          })}
                        >
                          {item.title}
                        </HeadingH4>
                        <div
                          className={cn(
                            "prose prose-sm sm:prose-base text-[#707174] ml-0 md:ml-2",
                            {
                              "hidden!": !item.content,
                            },
                          )}
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        ></div>
                      </div>
                    </div>
                  ));
                case "list":
                  return v.item?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row gap-2.5 items-start justify-start"
                    >
                      <img
                        src={images.circleLi}
                        alt={"circle"}
                        className="mt-0.5"
                        width={24}
                        height={24}
                      />
                      <p className="text-[#707174] typo-title">{item.title}</p>
                    </div>
                  ));
                default:
                  return null;
              }
            })}
        </div>
        <div
          className={cn(
            "prose prose-sm sm:prose-lg text-[#707174] max-w-[900px] text-center mx-auto",
            {
              "hidden!": !bottom_content,
            },
          )}
          dangerouslySetInnerHTML={{
            __html: bottom_content,
          }}
        ></div>
      </div>
    </Section>
  );
};

export default ServiceTwoColumnBenefit;
