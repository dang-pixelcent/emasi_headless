import Section from "@/components/common/Section";
import SectionWithImage from "@/components/ui/SectionWithImage";
import React from "react";
import img from "./images/imgleft.png";
import { HeadingH3 } from "@/components/common/Heading";
import { RichTextRaleway } from "@/components/common/RickText";
import iconBox from "./images/icon-box.png";

const ServiceTextWithImageRevert = () => {
  return (
    <Section>
      <SectionWithImage
        isSection={false}
        revert={false}
        backgroundNode={
          <img
            src={img}
            alt="Service Image"
            className="w-full h-full object-cover rounded-[16px]"
            width={960}
            height={480}
          />
        }
      >
        <HeadingH3>Sexual Health Support Through Hormone Therapy</HeadingH3>
        <RichTextRaleway
          className="mt-6 prose-p:text-t16 md:prose-p:text-t18 font-body"
          iconBullet={iconBox} // Truyền icon vào đây
        >
          <p>
            Hormonal imbalance is a common underlying cause of changes in
            libido, arousal, and sexual satisfaction for both men and women.
          </p>
          <p>Hormone Replacement Therapy may help improve:</p>
          <ul>
            <li>Tendons and ligaments</li>
            <li>Tendons and ligaments</li>
            <li>Tendons and ligaments</li>
          </ul>
          <p>
            When appropriate, we may also incorporate advanced sexual wellness
            therapies, including FDA-approved medications and peptide-based
            options, always under medical supervision.
          </p>
        </RichTextRaleway>
      </SectionWithImage>
    </Section>
  );
};

export default ServiceTextWithImageRevert;
