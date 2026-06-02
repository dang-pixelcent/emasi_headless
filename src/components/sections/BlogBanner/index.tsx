import { HeadingH1 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React from "react";

const BLogBanner = () => {
  return (
    <Section
      style={{
        background:
          "linear-gradient(11.48deg, #BAC4CA -4.75%, rgba(255, 255, 255, 0) 62.67%, #FBFDFE 62.67%)",
      }}
    >
      <div className="w-full flex justify-center items-center gap-10 max-w-[821px] flex-col mx-auto">
            <HeadingH1 className="text-center text-[#2E2E31]">Blog</HeadingH1>
        <p className="typo-lead text-center text-[#707174]">
          Lorem ipsum dolor sit amet consectetur. Nunc nulla elit neque commodo
          quis diam dolor sagittis eget.
        </p>
      </div>
    </Section>
  );
};

export default BLogBanner;
