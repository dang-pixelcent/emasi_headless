import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import IconBolt from "@/components/icon/IconBolt";
import React from "react";

const TherapyFor = () => {
  return (
    <Section className="bg-[#F4F4F4]">
      <div className="flex flex-col gap-16 items-start xl:px-37.5">
        <HeadingH3>Who is Peptide Therapy For?</HeadingH3>
        <div className="typo-title text-[#707174]">
          Peptide therapy may be appropriate for adults who want additional
          support with aging, recovery, weight management, cognitive
          performance, or overall wellness. Many patients who explore peptide
          therapy are simply looking for a more personalized, medically guided
          approach to their health.
        </div>

        <div className="flex flex-col gap-4 w-full">
          <p className="typo-title font-semibold">
            You may be a candidate if you:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-[8px] p-6 bg-white w-full justify-start"
              >
                <div className="p-3.75 bg-white border border-[#8F92923D] rounded-full flex items-center justify-center">
                  <IconBolt />
                </div>
                <p className="typo-body text-[#505050]">
                  Have noticed changes in energy, recovery, or metabolism
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="typo-title text-[#707174] space-y-4">
          <p>
            All peptide therapies are prescribed only after a comprehensive
            medical evaluation to ensure they are appropriate and safe. If
            you’re unsure whether peptide therapy is right for you, scheduling a
            consultation is often the easiest place to start.
          </p>
          <p>
            Peptide therapy may be appropriate for adults who are looking to
            support specific health goals such as healthy aging, body
            composition, recovery, cognitive performance, or overall wellness.
          </p>
          <p>
            All peptide therapies are prescribed only after a comprehensive
            medical evaluation to determine appropriateness, safety, and
            alignment with individual health needs.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default TherapyFor;
