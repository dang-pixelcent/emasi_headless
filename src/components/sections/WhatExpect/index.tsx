import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React from "react";
import service1 from "./images/service1.png";
const WhatExpect = () => {
  return (
    <Section className="bg-white">
      <div className="flex flex-col xl:px-37.5 gap-16 w-full">
        <HeadingH3>What to Expect</HeadingH3>
        <div className="flex flex-col gap-10 w-full">
          <div className="prose prose-sm sm:prose-lg text-[#6F6F6F]">
            <p>
              During your visit, our medical team will take time to understand
              your health history, current concerns, and goals. When
              appropriate, lab testing may be recommended to help guide
              treatment decisions.
            </p>
            <p>
              From there, a personalized plan is created. This may include
              peptide therapy on its own or in combination with hormone therapy,
              weight loss services, or other supportive care.
            </p>
            <p>
              Follow-up visits allow our medical team to monitor progress,
              answer questions, and make adjustments as needed  -  keeping your
              care both effective and aligned with your goals.
            </p>
            <p>
              Your peptide therapy journey begins with a consultation and
              clinical assessment. This may include a review of medical history,
              current symptoms, goals, and, when appropriate, laboratory
              testing.
            </p>
            <p>
              Based on this evaluation, your provider will develop a
              personalized treatment plan that may include one or more peptide
              therapies, dosing guidance, and ongoing monitoring. Follow-up
              visits are used to assess progress, adjust protocols, and ensure
              therapy remains safe and effective.
            </p>
            <p>
              Peptide therapy is typically part of a broader wellness strategy
              that may also include lifestyle guidance, nutritional support, and
              other medical services.
            </p>
          </div>
          <div className="w-full h-full aspect-16/9 lg:aspect-6/3">
            <img
              src={service1}
              alt="Service 1"
              className="w-full h-full"
              width={608}
              height={460}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default WhatExpect;
