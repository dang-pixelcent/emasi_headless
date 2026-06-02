import Button from "@/components/common/Button";
import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { TextTitle } from "@/components/common/Text";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import stepcardbg from "./images/StepsCard.png";
import SmartLink from "@/components/common/Link";

interface Props {
  acf_fc_layout: string;
  background_color: string;
  title: string;
  services_list: Serviceslist[];
}

interface Serviceslist {
  id: number;
  title: string;
  link: string;
}

const ServiceRelated = ({
  acf_fc_layout,
  background_color,
  title,
  services_list,
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

  const extendedServicesList = useMemo(() => {
    if (!services_list || services_list.length === 0) {
      return [];
    }
    // Nhân đôi mảng dịch vụ để tránh khoảng trống khi cuộn
    return [...services_list, ...services_list];
  }, [services_list]);

  return (
    <Section className={`flex flex-col gap-12 bg-[${background_color}]`}>
      <div className="flex flex-col gap-12">
        <div className="flex justify-between">
          <HeadingH3 className="text-[#0C1311]">{title}</HeadingH3>
          <div className="md:flex gap-8 hidden">
            <Button variant="text" className="py-0 px-0" onClick={scrollPrev}>
              <ChevronLeftIcon />
            </Button>
            <Button variant="text" className="py-0 px-0" onClick={scrollNext}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        {/* bottom slide */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            options={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            //
            className="mt-1 w-screen max-w-none"
          >
            {/* THAY ĐỔI 2: Đổi thành overflow-visible để nội dung được phép tràn ra */}
            <CarouselContent classNameRef="" className="-ml-0">
              {Array.isArray(extendedServicesList) &&
                extendedServicesList.map((service, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-0 py-0 pr-2 xs:pr-2 sm:px-2 md:px-2 lg:px-2 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/4"
                  >
                    <SmartLink
                      to={service?.link || ""}
                      className="flex justify-between h-full items-center relative overflow-clip p-6 rounded-[16px] border border-[rgba(144,143,146,0.24)]"
                    >
                      <img
                        src={stepcardbg}
                        alt="Step Card Background"
                        className="absolute inset-0 w-full h-full -z-1"
                        width={240}
                        height={155}
                      />
                      <TextTitle className="text-neutral-500 font-semibold">
                        {service.title}
                      </TextTitle>

                      <div>
                        <Button variant="text" className="py-1.5 px-2.25">
                          <ChevronRightIcon />
                        </Button>
                      </div>
                    </SmartLink>
                  </CarouselItem>
                ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};

export default ServiceRelated;
