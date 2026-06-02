import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { cn } from "@/utils/clsx";
import React from "react";

const Card = ({ icon, title }: List) => {
  return (
    <div className="flex flex-row gap-8 items-center justify-start bg-[#F4F4F4] p-6 sm:p-8 rounded-md">
      <div className="aspect-48/48 w-12 h-12">
        <img
          src={icon}
          alt={title}
          className="w-full h-full object-contain"
          width={48}
          height={48}
        />
      </div>
      <p className="typo-body text-[#505050] font-medium">{title}</p>
    </div>
  );
};

interface Props {
  acf_fc_layout: string;
  background_color: string;
  vertical_gap: string;
  title: string;
  content: string;
  image: boolean;
  title_list: string;
  list: List[];
  bottom_content: string;
}

interface List {
  icon: string;
  title: string;
}

const ServiceContentLeft = ({
  acf_fc_layout,
  background_color,
  vertical_gap,
  title,
  content,
  image,
  title_list,
  list,
  bottom_content,
}: Props) => {
  return (
    <Section className={`bg-[${background_color}]`}>
      <div
        className={cn("flex flex-col lg:px-24  xl:px-37.5 mx-auto", {
          "gap-4 sm:gap-6": vertical_gap === "default",
          "gap-12 sm:gap-16": vertical_gap !== "default",
        })}
      >
        <HeadingH3
          className={cn("", {
            "hidden!": !title,
          })}
        >
          {title}
        </HeadingH3>
        <div
          className={cn("lg:max-w-[900px] flex flex-col w-full gap-10", {
            "hidden!": !content,
          })}
        >
          <div
            className="prose prose-sm sm:prose-lg text-[#707174]"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
          <div
            className={cn("w-full h-full aspect-16/9 lg:aspect-6/3", {
              "hidden!": !image,
            })}
          >
            <img
              src={typeof image === "string" ? image : ""}
              alt="Service 1"
              className="w-full h-full object-cover rounded-[14.01px]"
              width={960}
              height={480}
            />
          </div>
        </div>
        <div
          className={cn("flex flex-col gap-4 w-full", {
            "hidden!": !list || list.length === 0,
          })}
        >
          <p
            className={cn("typo-title font-semibold", {
              "hidden!": !title_list,
            })}
          >
            {title_list}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {Array.isArray(list) &&
              list.map((item, index) => <Card {...item} key={index} />)}
          </div>
        </div>

        <div
          className={cn(
            "prose prose-sm sm:prose-lg text-[#707174] max-w-[900px]",
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

export default ServiceContentLeft;
