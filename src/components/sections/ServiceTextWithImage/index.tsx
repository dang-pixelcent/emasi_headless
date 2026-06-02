import Section from "@/components/common/Section";
import SectionWithImage from "@/components/ui/SectionWithImage";
import React from "react";
import img from "./images/imgleft.png";
import { HeadingH3 } from "@/components/common/Heading";
import { RichTextRaleway } from "@/components/common/RickText";
import iconBox from "@/assets/images/icon-box.png";

const ServiceTextWithImage = () => {
  return (
    <Section>
      <SectionWithImage
        isSection={false}
        revert={true}
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
        <HeadingH3>Injury Recovery and Regenerative Support</HeadingH3>
        <RichTextRaleway
          className="mt-6 prose-p:text-t16 md:prose-p:text-t18 font-body"
          iconBullet={iconBox} // Truyền icon vào đây
        >
          <p>
            Hormonal balance and peptide therapy can play a role in recovery
            from injuries and chronic inflammation.
          </p>
          <p>Certain regenerative therapies may help support healing in:</p>
          <ul>
            <li>Tendons and ligaments</li>
            <li>Tendons and ligaments</li>
            <li>Tendons and ligaments</li>
          </ul>
          <p>
            These therapies are often used alongside hormone optimization to
            support overall recovery and physical resilience.
          </p>
        </RichTextRaleway>
      </SectionWithImage>
    </Section>
  );
};

export default ServiceTextWithImage;
