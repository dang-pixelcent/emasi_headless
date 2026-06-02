import Section from "@/components/common/Section";
import React from "react";
import img from "./images/thk.png";
import { HeadingH2 } from "../../common/Heading/index";
import { cn } from "@/utils/clsx";

interface Props {
  acf_fc_layout: string;
  background_image: string;
  background_mobile: string | boolean;
  title: string;
  content: string;
}
const ThankYou = ({
  acf_fc_layout,
  background_image,
  background_mobile,
  title,
  content,
}: Props) => {
  return (
    <Section className="pb-64">
      <img
        src={img}
        alt="Thank You"
        className="absolute inset-0 w-full h-full object-cover -z-1"
        width={1920}
        height={600}
      />
      <img
        src={background_mobile as string}
        alt="Thank You mobile"
        className={cn(
          "absolute top-0 left-0 object-cover w-full h-full -z-1 sm:hidden block",
          {
            hidden: !background_mobile,
          },
        )}
        width={640}
        height={600}
      />
      <div className="max-w-200 mx-auto ">
        <HeadingH2
          className="text-center heading-span-red text-[#2E2E31]"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        ></HeadingH2>
        <div
          className="text-center mt-6 prose prose-base md:prose-xl text-[#707174]"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </Section>
  );
};

export default ThankYou;
