import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React from "react";
import Button2 from "@/components/common/Button";
import { Button } from "@/types/general";
interface Props {
  title?: string;
  list: {
    title?: string;
    image?: string;
    description?: string;
    button?: Button;
  }[];
}
const AboutUsOurMedical = (props: Props) => {
  const { title, list } = props;
  return (
    <Section className="bg-[#F4F4F4] py-20 md:py-gutter-xl">
      <div className="flex flex-col gap-6 md:gap-8">
        {title && (
          <HeadingH3 className="text-[#181818] font-medium md:text-[40px] md:leading-[120%]">
            {title}
          </HeadingH3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {list?.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-solid border-[#EDF7FD] rounded-2xl grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-[253px_335px]   "
            >
              <div className="aspect-auto md:aspect-video lg:aspect-4/3 xl:aspect-253/300 w-full h-full">
                <img
                  src={item.image ?? ""}
                  alt={item?.title}
                  className="w-full h-full object-cover rounded-l-2xl"
                  width={253}
                  height={300}
                />
              </div>
              <div className="flex flex-col justify-between gap-6 px-6 py-8 xl:px-10 xl:py-8">
                <div className="flex flex-col gap-3">
                  <p className="typo-lead text-[#323232] font-medium">
                    {item?.title}
                  </p>
                  <div
                    className="prose prose-sm md:prose-lg text-[#707174]"
                    dangerouslySetInnerHTML={{ __html: item.description ?? "" }}
                  ></div>
                </div>
                <div className="w-max">
                  {item?.button && (
                    <Button2
                      color="red"
                      to={item.button?.url}
                      target={item.button?.target}
                      className="px-8 py-4"
                    >
                      {item.button?.title}
                    </Button2>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AboutUsOurMedical;
