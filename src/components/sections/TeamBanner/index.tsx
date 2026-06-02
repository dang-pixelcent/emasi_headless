import Button from "@/components/common/Button";
import { HeadingH1, HeadingH2 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { TextLead } from "@/components/common/Text";
import SectionWithImage from "@/components/ui/SectionWithImage";
import React from "react";
interface Props {
  acf_fc_layout: string;
  background_image?: string;
  background_mobile?: string;
  sub_title: string;
  title: string;
  description: string;
  button: Button;
  focal_point?: {
    focal_point?: string;
  };
}

interface Button {
  title: string;
  url: string;
  target: string;
}
const TeamBanner = ({
  acf_fc_layout,
  background_image,
  background_mobile,
  sub_title,
  title,
  description,
  button,
  focal_point,
}: Props) => {
  return (
    <Section className="md:py-[187px]">
      {background_image && (
        <img
          src={background_image}
          alt="Team Banner Background"
          className="absolute top-0 left-0 w-full h-full -z-1 object-cover md:block hidden"
          style={{
            objectPosition: focal_point?.focal_point || "center",
          }}
          width={1920}
          height={600}
        />
      )}
      {(background_mobile || background_image) && (
        <img
          src={background_mobile || background_image || ""}
          alt="Team Banner Background"
          className="absolute top-0 left-0 w-full h-full -z-1 object-cover md:hidden block"
          width={640}
          height={600}
        />
      )}
      <SectionWithImage
        isSection={false}
        gridColumns="5fr 4fr"
        gridGap="0"
        oneCol={true}
        revert={true}
      >
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-6">
            {title && (
              <HeadingH1 className="tracking-[-0.96px] leading-[1.4] md:text-hs48 text-[32px] font-medium">
                {title}{" "}
              </HeadingH1>
            )}
            {sub_title && (
              <p className="text-t16 text-primary-600 font-semibold mb-3">
                {sub_title}
              </p>
            )}
            {description && (
              <TextLead className="font-interface text-gray max-w-126">
                {description}
              </TextLead>
            )}
          </div>
          {button && (
            <Button to={button.url} target={button.target} className="mt-10">
              {button.title}
            </Button>
          )}
        </div>
      </SectionWithImage>
    </Section>
  );
};

export default TeamBanner;
