import React from "react";
import BannerService from "./images/banner_service.png";
import { HeadingH1, HeadingH2 } from "@/components/common/Heading";
import Button2 from "@/components/common/Button";
import { Button } from "@/types/general";
import { cn } from "@/utils/clsx";
import Section from "@/components/common/Section";
interface Props {
  background_image?: string;
  background_mobile?: string;
  button?: Button;
  description?: string;
  sub_title?: string;
  title: string;
  focal_point?: {
    focal_point?: string;
  };
}
const ServiceBanner = (props: Props) => {
  const {
    background_image,
    background_mobile,
    button,
    description,
    sub_title,
    title,
    focal_point,
  } = props;
  return (
    <Section className="md:py-gutter-xl">
      {background_image && (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 md:block hidden"
          src={background_image ?? ""}
          alt={title || "Service Banner"}
          style={{
            objectPosition: focal_point?.focal_point || "center",
          }}
          width={1920}
          height={1080}
        />
      )}
      {(background_mobile || background_image) && (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 md:hidden block"
          src={background_mobile || background_image || ""}
          alt={title || "Service Banner"}
          width={1920}
          height={1080}
        />
      )}
      <div className="relative z-10 w-full m-w-[1140px] flex flex-col items-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            {title && (
              <HeadingH1 className="text-[#2E2E31] font-[500] font-heading text-center md:text-hs48 text-[32px]">
                {title}
              </HeadingH1>
            )}
            {sub_title && (
              <div className="text-hs24 text-red uppercase font-heading font-medium leading-[1.1] text-center">
                {sub_title}
              </div>
            )}
          </div>
          {description && (
            <div
              className="text-t20! prose prose-sm prose-p:text-t20 sm:prose-lg w-full text-[#2E2E31] text-center leading-normal"
              dangerouslySetInnerHTML={{ __html: description ?? "" }}
            ></div>
          )}
        </div>
        {button && (
          <Button2
            variant="contained"
            to={button?.url ?? ""}
            target={button?.target ?? ""}
            className="w-full md:w-auto uppercase mt-10"
          >
            {button.title}
          </Button2>
        )}
      </div>
    </Section>
  );
};
export default ServiceBanner;
