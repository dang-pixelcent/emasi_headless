import Button from "@/components/common/Button";
import { HeadingH3 } from "@/components/common/Heading";
import SectionWithImage from "@/components/ui/SectionWithImage";
import React from "react";
import bg from "./images/bg.png";
import { Button as TypeBtn } from "@/types/general";
import { cn } from "@/utils/clsx";

interface Props {
  acf_fc_layout: string;
  image?: string;
  title?: string;
  content?: string;
  button?: TypeBtn;
  background_color?: string;
  align_right_image?: boolean;
}

const TextWithImage = ({
  acf_fc_layout,
  image,
  title,
  content,
  button,
  background_color,
  align_right_image,
}: Props) => {
  return (
    <SectionWithImage
      revertOnMobile={false}
      revert={align_right_image}
      gridColumns={align_right_image ? "6fr 6fr" : "6fr 6fr"}
      gridGap="clamp(2rem, 1.2958rem + 3.0047vw, 4rem)"
      isSection={true}
      backgroundNode={
        <>
          {title && (
            <HeadingH3 className="md:hidden block mb-8 tracking-[-0.72px] md:tracking-[-1.6px]">
              {title}
            </HeadingH3>
          )}
          {image && (
            <img
              src={image}
              alt="Background"
              className="w-full md:h-full object-cover -z-10 aspect-608/460  rounded-[16px]"
              width={608}
              height={460}
            />
          )}
        </>
      }
      oneCol={image ? true : false}
      classNameContent=" justify-center flex flex-col gap-8"
      className={`bg-[${background_color ? background_color : "#F4F4F4"}]`}
    >
      {title && (
        <HeadingH3 className="md:block hidden tracking-[-0.72px] md:tracking-[-1.6px]">
          {title}
        </HeadingH3>
      )}
      {content && (
        <div
          className="prose prose-sm md:prose-lg text-gray"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      )}
      {button?.title && (
        <div className="">
          <Button variant="outlined" to={button?.url} target={button?.target}>
            {button?.title}
          </Button>
        </div>
      )}
    </SectionWithImage>
  );
};

export default TextWithImage;
