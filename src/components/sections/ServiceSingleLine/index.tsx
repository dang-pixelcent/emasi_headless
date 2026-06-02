import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { cn } from "@/utils/clsx";
import React from "react";

interface Props {
  acf_fc_layout: string;
  background_color: string;
  icon: boolean;
  title: string;
  image: boolean;
  content: string;
  text_center?: boolean;
}
const ServiceSingleLine = ({
  acf_fc_layout,
  background_color,
  icon,
  title,
  image,
  content,
  text_center,
}: Props) => {
  return (
    <Section className={`bg-[${background_color}]`}>
      <div className="flex flex-col gap-6 w-full justify-center items-center">
        <HeadingH3
          className={cn("text-center max-w-[800px] text-[#1E1F20]", {
            "hidden!": !title,
          })}
        >
          {title}
        </HeadingH3>
        <div
          className={cn(" max-w-[800px]", {
            "hidden!": !content,
          })}
        >
          <div
            className={cn(
              "prose sm:prose-lg prose-sm text-[#707174]",
              {
                "text-center": text_center,
                "text-left": !text_center,
              },
            )}
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      </div>
    </Section>
  );
};

export default ServiceSingleLine;
