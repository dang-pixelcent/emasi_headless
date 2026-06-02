import Section from "@/components/common/Section";
import SectionWithImage from "@/components/ui/SectionWithImage";
import React from "react";
import { HeadingH1 } from "../../common/Heading/index";
import { TextLead } from "@/components/common/Text";
import Button from "@/components/common/Button";
import iconSmall from "./images/icon-small.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { Button as TypeBtn } from "@/types/general";
import { cn } from "@/utils/clsx";
import AutoScroll from "embla-carousel-auto-scroll";

interface Props {
  acf_fc_layout: string;
  background_image: string;
  background_mobile: string;
  sub_title: string;
  title: string;
  description: string;
  button: TypeBtn;
  gallery: string[];
  focal_point?: {
    focal_point?: string;
  };
}

const BannerHome = ({
  acf_fc_layout,
  background_image,
  background_mobile,
  sub_title,
  title,
  description,
  button,
  gallery,
  focal_point,
}: Props) => {
  return (
    <section
      className="relative w-full overflow-hidden py-20 pb-7.5 md:pb-20"
      style={{
        background:
          "linear-gradient(11deg, #BAC4CA -4.75%, rgba(255, 255, 255, 0.00) 62.67%, #FBFDFE 62.67%)",
      }}
    >
      {background_image && (
        <img
          src={background_image}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 hidden sm:block"
          style={{
            objectPosition: focal_point?.focal_point || "center",
          }}
          width={1920}
          height={1080}
        />
      )}
      {(background_mobile || background_image) && (
        <img
          src={background_mobile || background_image || ""}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 sm:hidden block"
          width={1920}
          height={1080}
        />
      )}
      <div className="section-container-lg max-w-body mx-auto">
        <SectionWithImage
          revert={true}
          gridColumns="10fr 8fr"
          isSection={false}
          classNameContent="col-span-1 items-center md:items-start"
        >
          <div className=" w-full md:px-0 px-[32.66px] text-center md:text-left">
            <Button
              to="/"
              className="text-left inline-flex pl-1.25 pr-6.25 py-2 gap-2 font-heading tracking-[3%] min-w-auto md:min-w-[438px] md:max-h-[43px] justify-start bg-[#EDEDED] border-none text-[#707174] md:text-t14 text-[12px]"
            >
              <img src={iconSmall} alt="Icon Small" width={23} height={14} />
              {sub_title}
            </Button>
          </div>
          <HeadingH1
            className="md:uppercase font-medium md:font-normal text-center sm:text-left mt-8 heading-span-red md:leading-tight leading-[1.2]"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          ></HeadingH1>
          <div>
            <TextLead className="mt-8 text-center sm:text-left">
              {description}
            </TextLead>
          </div>
          <div
            className={cn("w-full md:w-auto", {
              "hidden!": !button?.title,
            })}
          >
            <Button
              to={button?.url}
              target={button?.target}
              className="w-full mt-12 text-t20 "
            >
              {button?.title}
            </Button>
          </div>
        </SectionWithImage>
      </div>
      <div className="w-full">
        <Carousel
          plugins={[
            AutoScroll({
              speed: 1.5,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          options={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          className="md:mt-20 mt-15 text-blue-500"
        >
          <CarouselContent classNameRef="overflow-visible">
            {gallery.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:pl-10 lg:pl-16 pl-[31.42px] basis-[39.829%] md:basis-1/3 lg:basis-[21.704%] "
              >
                <div className="p-0">
                  <div className="p-0 bg-transparent">
                    <img
                      src={item}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover rounded-[16px] aspect-252/252"
                      draggable="false"
                      width={252}
                      height={252}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default BannerHome;
