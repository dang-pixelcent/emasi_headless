import Section from "@/components/common/Section";
import React from "react";
import { HeadingH3 } from "@/components/common/Heading";
import { cn } from "@/utils/clsx";

interface Props {
  acf_fc_layout: string;
  background_image: string;
  icon: string;
  title: string;
  image: string;
  content: string;
}

const ServiceFullTextBg = ({
  acf_fc_layout,
  background_image,
  icon,
  title,
  image,
  content,
}: Props) => {
  return (
    <Section className="bg-[#F4F4F4] ">
      <img
        src={background_image}
        alt="bg"
        className={cn("absolute top-0 left-0 w-full h-full object-cover z-0", {
          "hidden!": !background_image,
        })}
        width={1920}
        height={1080}
      />
      <div className="flex flex-col xl:px-37.5 gap-16 w-full relative z-1">
        <div
          className={cn("flex justify-center w-full", {
            "hidden!": !icon,
          })}
        >
          <img src={icon} alt="icon" width={48} height={48} />
        </div>
        <div className="flex flex-col gap-10 justify-center items-center w-full">
          <HeadingH3
            className={cn("text-center w-full max-w-[830px]", {
              "hidden!": !title,
            })}
          >
            {title}
          </HeadingH3>
          <div
            className={cn("w-full h-auto aspect-16/9 lg:aspect-auto", {
              "hidden!": !image,
            })}
          >
            <img
              src={image}
              alt="test"
              className="w-full h-full rounded-[16px] object-cover lg:object-contain"
              width={960}
              height={540}
            />
          </div>
          <div
            className="prose prose-sm sm:prose-lg text-[#6F6F6F]"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </div>
      </div>
    </Section>
  );
};

export default ServiceFullTextBg;
