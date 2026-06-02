import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React from "react";
import { cn } from "@/utils/clsx";

interface Props {
  acf_fc_layout: string;
  title: string;
  description: string;
  list: List[];
}

interface List {
  title: string;
  content: string;
}

const ServiceTextWithText = ({
  acf_fc_layout,
  description,
  list,
  title,
}: Props) => {
  return (
    <Section className="bg-[#F4F4F4] ">
      <div className="flex flex-col gap-10 md:gap-20">
        <div
          className={cn(
            "flex flex-col gap-4 md:gap-6 items-center text-center justify-center",
            {
              "hidden!": !title && !description,
            },
          )}
        >
          {title && <HeadingH3 className="text-[#1E1F20]">{title}</HeadingH3>}
          <div className={cn("max-w-[900px]!", { "hidden!": !description })}>
            <div className="prose prose-sm md:prose-lg text-[#707174]">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-12 w-full">
          {list &&
            list.length > 0 &&
            list.map((item, index) => (
              <div className="flex flex-col gap-4" key={index}>
                {item.title && (
                  <p className="text-[#1E1F20] font-medium typo-lead">
                    {item.title}
                  </p>
                )}
                {item.content && (
                  <div
                    className="prose prose-sm md:prose-lg text-[#707174]"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

export default ServiceTextWithText;
