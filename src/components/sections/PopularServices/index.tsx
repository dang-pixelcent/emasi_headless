import { TextBody, TextTitle } from "@/components/common/Text";
import SectionWithImage from "@/components/ui/SectionWithImage";
import React, { useState } from "react";
import { HeadingH2, HeadingH3 } from "../../common/Heading/index";
import { ArrowRight } from "lucide-react";
import Section from "@/components/common/Section";
import iconBox from "./images/icon-box.png";
import { cn } from "@/utils/clsx";
import Button from "@/components/common/Button";
import { Button as TypeBtn } from "@/types/general";
import SmartLink from "@/components/common/Link";

const AccordionItem = ({
  isOpen,
  item,
  ...rest
}: React.ComponentProps<"div"> & { isOpen: boolean; item: Item2 }) => {
  if (!item.child_link && !item.item) {
    return (
      <SmartLink
        to={item?.link?.url || ""}
        target={item?.link?.target || "_self"}
        className="cursor-pointer transition-all duration-600 group hover:bg-gray-50 border-b border-gray-200 last:border-b-0 px-4 md:px-6 py-5 "
      >
        <div className="flex justify-between items-center bg-transparent">
          <TextTitle
            className={cn(
              "font-semibold",
              isOpen ? "text-primary" : "text-gray group-hover:text-primary",
            )}
            dangerouslySetInnerHTML={{ __html: item?.link?.title || "" }}
          />
          <div
            className={cn(
              "transition-transform duration-300",
              isOpen ? "block" : "hidden group-hover:block",
            )}
          >
            <ArrowRight />
          </div>
        </div>
      </SmartLink>
    );
  }

  return (
    <div
      className={cn(
        "cursor-pointer transition-all duration-600 group hover:bg-gray-50 border-b border-gray-200 last:border-b-0",
        isOpen
          ? "flex flex-col px-4 md:px-6 py-5 bg-gray-50 rounded-[8px]"
          : " px-4 md:px-6 py-5 ",
      )}
      {...rest}
    >
      <div className="flex justify-between items-center bg-transparent">
        <TextTitle
          className={cn(
            "font-semibold",
            isOpen ? "text-primary" : "text-gray group-hover:text-primary",
          )}
        >
          {item?.link?.title || ""}
        </TextTitle>
        <div
          className={cn(
            "transition-transform duration-300",
            isOpen ? "block" : "hidden group-hover:block",
          )}
        >
          <ArrowRight />
        </div>
      </div>
      <div
        className={cn(
          "grid transition-[grid-template-rows,margin] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] mt-7.5 " : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="content inline-flex flex-col gap-2">
            {item?.item &&
              Array.isArray(item.item) &&
              item.item.map((v, index) => (
                <SmartLink
                  key={index}
                  to={v.link?.url}
                  target={v.link?.target || "_self"}
                  className="px-2 py-1 flex items-center gap-2.5 group hover:bg-[#E0E1F0] hover:rounded-sm"
                >
                  <div className="shrink-0">
                    <img
                      src={iconBox}
                      alt="Icon Box"
                      className="inline-block w-[21px] h-[21px]"
                      width={21}
                      height={21}
                    />
                  </div>
                  <TextBody>{v.link?.title}</TextBody>
                </SmartLink>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  acf_fc_layout: string;
  title: string;
  description: string;
  list: List[];
}

interface List {
  content_left: boolean;
  image: string;
  image_mobile: string;
  title: string;
  description: string;
  item: Item2[];
  button: TypeBtn;
}

interface Item2 {
  link: TypeBtn;
  child_link: boolean;
  item: Item[] | boolean | boolean;
}

interface Item {
  link: TypeBtn;
}

const PopularServices = ({
  acf_fc_layout,
  title,
  description,
  list,
}: Props) => {
  // Thay đổi kiểu dữ liệu thành Record<string, boolean> để dùng key duy nhất dạng "i-j"
  const [isOpen, setIsOpen] = useState<Record<string, boolean>>({});

  const handleOpen = (id: string) => {
    setIsOpen((prev) => {
      return { [id]: !prev[id] };
    });
  };
  return (
    <Section className="py-15 md:py-gutter-xl">
      <SectionWithImage
        revert={true}
        revertOnMobile={true}
        isSection={false}
        gridColumns="10fr 13fr"
        gridGap="clamp(2rem, -0.0467rem + 8.7324vw, 7.8125rem)"
        backgroundNode={
          <div
            className="prose prose-sm md:prose-lg text-gray"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        }
      >
        <HeadingH2>{title}</HeadingH2>
      </SectionWithImage>

      {list.map((item, sectionIndex) => (
        <SectionWithImage
          gridColumns={!item.content_left ? "10fr 13fr" : "13fr 10fr"}
          gridGap="0"
          isSection={false}
          backgroundNode={
            <img
              src={item.image}
              alt="Image Left"
              className={cn(
                "object-cover w-full h-full shrink-0 aspect-540/640 ",
                {
                  "object-left": !item.content_left,
                  "object-right": item.content_left,
                },
              )}
            />
          }
          classNameContent="px-6 md:px-[40px] py-[40px]  flex flex-col justify-between gap-8"
          className="md:mt-20 mt-15 rounded-[16px] bg-[#F4F4F4]"
          key={sectionIndex}
          revert={!item.content_left ? false : true}
          revertOnMobile={true}
        >
          <div className="w-full ">
            <HeadingH3 className="tracking-[-0.72px] md:tracking-[-1.6px]">
              {item.title}
            </HeadingH3>
            <TextTitle className="mt-3">{item.description}</TextTitle>
            <div className="mt-8 w-full flex flex-col">
              {item?.item &&
                item.item.map((v, itemIndex) => {
                  const uniqueKey = `${sectionIndex}-${itemIndex}`;
                  return (
                    <AccordionItem
                      item={v}
                      key={uniqueKey}
                      isOpen={!!isOpen[uniqueKey]}
                      onClick={() => handleOpen(uniqueKey)}
                    />
                  );
                })}
            </div>
          </div>
          <Button
            to={item.button?.url}
            target={item.button?.target}
            className={cn("px-[30.5px] py-4 md:w-auto w-full", {
              "hidden!": !item.button?.title,
            })}
          >
            {item.button?.title}
          </Button>
        </SectionWithImage>
      ))}
    </Section>
  );
};

export default PopularServices;
