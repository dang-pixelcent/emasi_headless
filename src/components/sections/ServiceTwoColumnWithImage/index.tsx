import { HeadingH3, HeadingH4 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import IconPills from "@/components/icon/IconPills";
import { images } from "@/lib/images";
import React from "react";

const ServiceTwoColumnWithImage = () => {
  return (
    <Section className="bg-white">
      <div className="flex flex-col gap-10 sm:gap-[56px]">
        <div className="flex flex-col gap-4 sm:gap-6 max-w-[820px] mx-auto">
          <HeadingH3 className="text-[#1E1F20] text-center">
            Sermorelin vs HGH Injections
          </HeadingH3>
          <div className="prose prose-sm sm:prose-lg text-[#707174] text-center">
            <p>
              Both Sermorelin and HGH therapy address growth hormone decline,
              but they work differently.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-[#F4F4F4] p-6 sm:p-8 rounded-md flex flex-col md:flex-row w-full">
            <div className="w-full md:w-[74.42%] order-2 md:order-1">
              <HeadingH4 className="text-[#1E1F20]">Sermorelin</HeadingH4>
              <div className="prose prose-sm sm:prose-base text-[#707174 pt-[40px]">
                <ul>
                  <li>Support for bone density</li>
                  <li>Joint and connective tissue recovery</li>
                  <li>Faster healing from injury or physical stress</li>
                </ul>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end md:items-end order-1 md:order-2">
              <div className="w-full max-w-[72px] h-auto pb-[9px]">
                <img
                  className="w-full h-full"
                  src={images.medical}
                  alt="medical"
                  width={72}
                  height={72}
                />
              </div>
            </div>
          </div>
          <div className="bg-[#F4F4F4] p-6 sm:p-8 rounded-md flex flex-col md:flex-row w-full">
            <div className=" w-full md:w-[74.42%] order-2 md:order-1">
              <HeadingH4 className="text-[#1E1F20]">Sermorelin</HeadingH4>
              <div className="prose prose-sm sm:prose-base text-[#707174] pt-[40px]">
                <ul>
                  <li>Support for bone density</li>
                  <li>Joint and connective tissue recovery</li>
                  <li>Faster healing from injury or physical stress</li>
                </ul>
              </div>
            </div>
            <div className="flex-1 flex justify-center md:justify-end md:items-end order-1 md:order-2">
              <div className="w-full max-w-[72px] h-auto pb-[9px]">
                <img
                  className="w-full h-full"
                  src={images.medical}
                  alt="medical"
                  width={72}
                  height={72}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="prose prose-sm sm:prose-lg text-[#707174] max-w-[900px] text-center mx-auto">
          <p>
            Both Sermorelin and HGH therapy address growth hormone decline, but
            they work differently.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ServiceTwoColumnWithImage;
