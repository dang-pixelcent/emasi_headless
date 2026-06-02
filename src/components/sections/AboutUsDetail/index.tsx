import { HeadingH2, HeadingH3, HeadingH4 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React from "react";

interface Props {
  bottom_content?: string;
  content?: string;
  title?: string;
  list?: {
    background_image?: string;
    description?: string;
    icon?: string;
    title?: string;
  }[];
}

const AboutUsDetail = (props: Props) => {
  const { bottom_content, content, title, list } = props;
  return (
    <Section className="bg-[#F4F4F4]">
      <div className="flex flex-col gap-6 md:gap-8 xl:px-37.5 w-full">
        {title && (
          <HeadingH3 className="text-[#181818] md:text-[40px] md:leading-[120%]">
            {title}
          </HeadingH3>
        )}

        <div
          className="prose prose-sm md:prose-xl prose-p:text-[#6D6D6D]!  w-full"
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        ></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
          {list?.map((it, index) => (
            <div
              key={index}
              className=" border border-solid border-[#8F92923D] overflow-hidden shadow-[0px_0px_0px_2px_#FFFFFF]  rounded-2xl flex flex-col gap-4 md:gap-6 relative"
            >
              <div className="absolute w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={it.background_image}
                  alt={it?.title}
                  width={600}
                  height={400}
                />
              </div>
              <div className="z-1 relative p-6 md:p-8">
                {it?.icon && (
                  <div className="w-[64px] h-[64px]">
                    <img
                      className="w-full h-full"
                      src={it.icon}
                      width={64}
                      height={64}
                      alt={it?.title}
                    />
                  </div>
                )}
                <HeadingH2 className="text-[#2E2E31] pt-[12px] md:pt-[24px]">
                  {it?.title}
                </HeadingH2>
                <HeadingH4 className="text-[#0C1311] pt-[12px] md:pt-[24px]">
                  {it?.description}
                </HeadingH4>
              </div>
            </div>
          ))}
        </div>
        {bottom_content && (
          <div
            className="prose prose-sm md:prose-xl text-[#6D6D6D] w-full"
            dangerouslySetInnerHTML={{ __html: bottom_content ?? "" }}
          ></div>
        )}
      </div>
    </Section>
  );
};

export default AboutUsDetail;
