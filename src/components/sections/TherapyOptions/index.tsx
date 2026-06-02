import { HeadingH3, HeadingH4 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { images } from "@/lib/images";
import React from "react";

const TherapyOptions = () => {
  return (
    <Section className="bg-white">
      <div className="flex flex-col gap-14 w-full">
        <div className="flex flex-col gap-6 items-center">
          <HeadingH3 className="text-center">
            HGH Therapy Treatment Options
          </HeadingH3>
          <p className="typo-title text-[#707174] text-center max-w-[800px]">
            HGH therapy should always be individualized. There are two primary
            medical approaches used depending on lab results and patient
            response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-8 p-6 lg:p-8 bg-[#F4F4F4] rounded-[8px]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[9fr_3fr] xl:grid-cols-[10fr_1.8fr] gap-8 md:gap-4 lg:gap-8 justify-start">
                <div className="flex flex-col gap-4">
                  <HeadingH4>
                    HGH Injections (Recombinant Human Growth Hormone)
                  </HeadingH4>
                  <p className="typo-title text-[#707174]">
                    Prescription HGH injections deliver bioidentical human
                    growth hormone directly into the bloodstream.
                  </p>
                </div>
                <div className="aspect-6/3 lg:aspect-auto flex justify-start  max-h-[155px] w-full">
                  <img
                    src={images.medical}
                    alt={"Medical"}
                    className="w-full h-full object-contain"
                    width={155}
                    height={155}
                  />
                </div>
              </div>
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <p className="typo-title text-[#707174] font-semibold">
                    Pros
                  </p>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-start items-center gap-2.5"
                      >
                        <img
                          src={images.pros}
                          alt="pros"
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                        <p className="typo-body text-[#707174]">
                          Faster healing from injury or physical stress
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default TherapyOptions;
