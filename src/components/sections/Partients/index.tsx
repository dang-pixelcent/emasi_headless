import Button from "@/components/common/Button";
import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { TextTitle } from "@/components/common/Text";
import { cn } from "@/utils/clsx";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import avt from "./images/shanecollins1.png";
import star from "./images/Star.png";
import AvatarFromName from "@/components/ui/AvatarFromName";

interface Props {
  acf_fc_layout: string;
  background_image: string;
  title: string;
  description: string;
  button: Button;
  testimonials_list: Testimonialslist[];
}

interface Testimonialslist {
  star: number;
  image: string;
  name: string;
  description: string;
}

interface Button {
  title: string;
  url: string;
  target: string;
}

const Partients = ({
  acf_fc_layout,
  background_image,
  title,
  description,
  button,
  testimonials_list,
}: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <Section className="bg-[#FAFAFA] z-0">
      <img
        src={background_image}
        alt="Hero"
        className="absolute top-0 left-0 object-cover w-full h-full -z-1 "
        width={1920}
        height={1080}
      />
      <div className=" flex flex-col gap-8">
        <div className="md:flex md:items-end gap-25">
          <div>
            <HeadingH3 className="tracking-[-0.72px] md:tracking-[-1.6px]">
              {title}
            </HeadingH3>
            <div className="typo-title mt-[24px]">
              <p>{description}</p>
            </div>
            <div
              className={cn("mt-[24px] ", {
                "hidden!": !button?.title,
              })}
            >
              <Button
                variant="contained"
                className="w-full md:w-max"
                to={button.url || "#"}
                target={button.target || "_self"}
              >
                {button.title}
              </Button>
            </div>
          </div>
          <div className="md:flex gap-8 mt-8 hidden">
            <Button
              variant="text"
              className="py-1.5 px-2.25 cursor-pointer"
              onClick={scrollPrev}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="text"
              className="py-1.5 px-2.25 cursor-pointer"
              onClick={scrollNext}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* bottom */}
        <div className="">
          <Carousel
            setApi={setApi}
            options={{
              align: "center",
              loop: true,
              dragFree: false,
            }}
            className="mt-1 w-screen max-w-none md:w-auto"
          >
            <CarouselContent
              classNameRef="!overflow-visible"
              className="-ml-12 md:-ml-0"
            >
              {Array.isArray(testimonials_list) &&
                testimonials_list.map((v, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-0 py-0 px-4 xs:px-10 sm:px-6 md:px-8 lg:px-10 basis-[85%] sm:basis-1/2 md:basis-1/2 lg:basis-[44%] 2xl:basis-[50%] md:py-10"
                  >
                    <div
                      className={cn(
                        "flex flex-col justify-between md:gap-11.25 gap-8 bg-white md:p-8.5 p-6.25 rounded-[16px] h-full transition-all duration-300 ease-in-out border border-transparent",
                        index === current
                          ? "md:scale-120 relative z-10" // Active
                          : "md:scale-100",
                      )}
                    >
                      <div className="flex gap-0.5">
                        {Array.from({ length: v.star || 0 }).map((_, index) => (
                          <img
                            key={index}
                            src={star}
                            alt="star"
                            className="w-3 h-2.85 md:w-4 md:h-3.85"
                            width={16}
                            height={15}
                          />
                        ))}
                      </div>
                      <div
                        className={cn(
                          "prose prose-sm max-h-[168px] md:max-h-[120px] overflow-y-auto scrollbar-main",
                          index === current
                            ? "md:prose-lg text-primary"
                            : "md:prose-base text-gray",
                        )}
                        dangerouslySetInnerHTML={{
                          __html: v?.description,
                        }}
                      ></div>
                      <div className="flex md:gap-5 gap-[15px] items-center">
                        <div>
                          {v?.image ? (
                            <img
                              src={v?.image}
                              alt="avatar"
                              className="w-8 h-8 md:w-11 md:h-11"
                              width={44}
                              height={44}
                            />
                          ) : (
                            <AvatarFromName
                              name={v?.name}
                              className="md:h-[44px] md:w-[44px] h-[32px] w-[32px] text-[14px] md:text-[18px] "
                            />
                          )}
                        </div>
                        <div>
                          <TextTitle className="font-semibold text-[#000000]">
                            {v?.name}
                          </TextTitle>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-1.25 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1.75 rounded-full transition-all duration-300",
                  index === current
                    ? "w-1.75 bg-red" // Active dot: Dài hơn, màu đậm (tạm dùng sky-900, bạn có thể đổi màu brand)
                    : "w-1.75 bg-red-200 hover:bg-gray-400",
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Partients;
