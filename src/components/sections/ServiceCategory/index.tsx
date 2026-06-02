import { HeadingH3, HeadingH4 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { cn } from "@/utils/clsx";
import Button from "@/components/common/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/Carousel";

const OptionCard = ({
  cate,
  active,
  handleChooseCate,
}: {
  cate: List;
  active: boolean;
  handleChooseCate?: (cate: List) => void;
}) => {
  return (
    <div
      id={cate.tab_id}
      onClick={() => handleChooseCate?.(cate)}
      className={cn(
        "flex-[0_0_236px] cursor-pointer",
        "px-3 py-4 md:px-6 md:py-4 flex items-center justify-center text-center text-[#707174] typo-title rounded-2xl",
        {
          "bg-[#F85C09] text-white border border-solid border-[#EDEDED] shadow-[3.79px_3.79px_18.96px_0px_#00000026]":
            active,
        },
      )}
    >
      <p>{cate.title}</p>
    </div>
  );
};

interface Props {
  acf_fc_layout: string;
  title: string;
  description: string;
  list: List[];
}

interface List {
  image: string;
  title: string;
  content: string;
  sub_title: string;
  tab_id: string;
  product: Product[];
}

interface Product {
  background_image: string;
  image: boolean | string;
  title: string;
  url: Url;
  description: string;
}

interface Url {
  title: string;
  url: string;
  target: string;
}

const ServiceCategory = ({
  acf_fc_layout,
  title,
  description,
  list,
}: Props) => {
  const location = useLocation();

  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(
    null,
  );

  const [chooseCate, setChooseCate] = React.useState<List | null>(
    list?.[0] ?? null,
  );

  useEffect(() => {
    const hash = location.hash ? location.hash.replace("#", "") : "";
    if (hash && list) {
      const found = list.find((item) => item.tab_id === hash);
      if (found) {
        setChooseCate(found);
      }
    }
  }, [location.hash]);

  const handleChooseCate = (cate: List) => {
    setChooseCate(cate);
    handleResetScroll();

    window.history.replaceState(null, "", `#${cate.tab_id}`);
  };

  const handleNext = () => {
    carouselApi?.scrollNext();
  };

  const handlePrev = () => {
    carouselApi?.scrollPrev();
  };

  const handleResetScroll = () => {
    carouselApi?.scrollTo(0);
  };

  return (
    <Section className="bg-white">
      <div className="flex flex-col gap-10 md:gap-20">
        <div
          className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16", {
            "hidden!": !title && !description,
          })}
        >
          <HeadingH3
            className={cn("text-[#1E1F20]", {
              "hidden!": !title,
            })}
          >
            {title}
          </HeadingH3>
          <div
            className={cn("prose prose-sm sm:prose-lg text-[#707174]", {
              "hidden!": !description,
            })}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
        <div className="flex flex-row bg-[#EDEDED99] rounded-2xl p-2 overflow-x-auto w-full justify-evenly">
          {Array.isArray(list) &&
            list.map((cate, index) => (
              <OptionCard
                key={index}
                cate={cate}
                handleChooseCate={handleChooseCate}
                active={chooseCate?.title === cate.title}
              />
            ))}
        </div>
        <div className="flex flex-col gap-8 md:gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-16 gap-8">
            <div className="w-full h-full aspect-auto md:aspect-568/449 flex justify-center items-center overflow-hidden">
              <img
                src={
                  typeof chooseCate?.image === "string" ? chooseCate?.image : ""
                }
                alt={chooseCate?.title}
                className="w-full h-full rounded-2xl object-cover"
                width={568}
                height={449}
              />
            </div>
            <div className="flex flex-col gap-6 text-[#1E1F20] justify-center">
              <HeadingH4 className="md:text-[24px]! tracking-[-3%] text-dark">
                {chooseCate?.title}
              </HeadingH4>
              <div
                className="prose prose-sm sm:prose-lg text-[#707174]"
                dangerouslySetInnerHTML={{
                  __html: chooseCate?.content || "",
                }}
              ></div>
            </div>
          </div>
          <div
            className={cn("flex flex-col gap-6 w-full", {
              "hidden!":
                !chooseCate?.product || chooseCate?.product?.length === 0,
            })}
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <p className="typo-title text-[#707174] font-semibold">
                {chooseCate?.sub_title}
              </p>
              <div className={cn("flex flex-row gap-8 justify-end")}>
                <Button
                  variant="text"
                  color="orange"
                  className="p-0"
                  onClick={handlePrev}
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </Button>
                <Button
                  variant="text"
                  color="orange"
                  className="p-0"
                  onClick={handleNext}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
            <div
              className={cn("", {
                "w-full md:w-auto":
                  chooseCate?.product && chooseCate?.product?.length > 0,
              })}
            >
              <Carousel
                options={{
                  align: "start",
                  loop: true,
                  dragFree: true,
                }}
                className=""
                setApi={setCarouselApi}
              >
                <CarouselContent className="ml-0 md:-ml-4">
                  {Array.isArray(chooseCate?.product) &&
                    chooseCate?.product?.map((item, index) => (
                      <CarouselItem
                        key={index}
                        className=" px-2 md:px-2 lg:px-4 basis-full md:basis-1/2 md:max-h-[251px]"
                      >
                        <a
                          href={item?.url?.url || "#"}
                          target={item?.url?.target || "_blank"}
                          style={{
                            backgroundImage: `url(${
                              item?.background_image || ""
                            })`,
                            backgroundSize: "cover",
                            backgroundPosition: "right",
                            backgroundRepeat: "no-repeat",
                          }}
                          className="p-6 md:p-8 rounded-lg bg-[#F4F4F4] grid grid-cols-[8fr_90px] lg:grid-cols-[8fr_125px] xl:grid-cols-[8fr_155px] gap-4 md:gap-6 h-full xl:h-[251px]"
                        >
                          <div className="flex flex-col justify-between">
                            <h5 className="font-semibold text-lg mb-2 text-primary">
                              {item.title}
                            </h5>
                            <div
                              className="prose prose-base text-[#707174]  md:max-h-[157px] md:overflow-y-auto scrollbar-main"
                              dangerouslySetInnerHTML={{
                                __html: item.description || "",
                              }}
                            ></div>
                          </div>
                          <div
                            className={cn(
                              "flex justify-center items-center  overflow-hidden aspect-square w-full h-full",
                              {
                                "hidden!": !item?.image,
                              },
                            )}
                          >
                            <img
                              src={
                                typeof item?.image === "string"
                                  ? item?.image
                                  : ""
                              }
                              alt={item.title}
                              className="w-full h-full object-contain rounded-lg"
                              width={568}
                              height={449}
                            />
                          </div>
                        </a>
                      </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ServiceCategory;
