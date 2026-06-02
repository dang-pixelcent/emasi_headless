import Section from "@/components/common/Section";
import React from "react";
import SectionWithImage from "@/components/ui/SectionWithImage";
import Button from "@/components/common/Button";
import { HeadingH3 } from "@/components/common/Heading";
import { cn } from "@/utils/clsx";

interface Props {
  acf_fc_layout: string;
  cta?: {
    background_image?: string;
    background_mobile?: string;
    title?: string;
    description?: string;
    button?: {
      title: string;
      url: string;
      target: string;
    };
    text_style?: "light" | "dark";
  };
}

const Contact = ({ acf_fc_layout, cta }: Props) => {
  return (
    <Section className="py-17.5">
      <div className="flex items-center relative overflow-hidden rounded-[16px] h-full w-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] px-6 py-13.5 md:px-4 lg:px-4">
        {cta?.background_image && (
          <img
            src={cta.background_image}
            alt="Contact"
            className="absolute object-right top-0 left-0 object-cover w-full h-full -z-1 sm:block hidden"
            width={1920}
            height={1080}
          />
        )}
        {cta?.background_mobile && (
          <img
            src={cta.background_mobile}
            alt="Contact"
            className="absolute top-0 left-0 object-cover w-full h-full -z-1 sm:hidden block"
            width={1920}
            height={1080}
          />
        )}
        <SectionWithImage
          isSection={false}
          revert={true}
          gridColumns="6fr 4fr"
          className="md:p-10"
          classNameContent="col-span-1"
        >
          {cta?.title && (
            <HeadingH3
              className={cn("md:text-hs40", {
                "text-white ": cta?.text_style === "light",
                "text-[#101010]": cta?.text_style == "dark",
              })}
            >
              {cta?.title}
            </HeadingH3>
          )}
          {cta?.description && (
            <div
              className={cn("mt-8  prose prose-sm md:prose-lg", {
                "prose-p:text-gray-100": cta?.text_style === "light",
                "prose-p:text-[#606060]": cta?.text_style == "dark",
              })}
              dangerouslySetInnerHTML={{ __html: cta?.description }}
            ></div>
          )}

          {cta?.button && (
            <div className="w-full md:w-auto">
              <Button
                to={cta?.button?.url || "#"}
                target={cta?.button?.target || "_blank"}
                className="w-full mt-12 "
              >
                {cta?.button?.title}
              </Button>
            </div>
          )}
          <div className="h-100 sm:hidden block"></div>
        </SectionWithImage>
      </div>
    </Section>
  );
};

export default Contact;
