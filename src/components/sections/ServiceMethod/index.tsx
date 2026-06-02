import { HeadingH3, HeadingH4 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { images } from "@/lib/images";
import { cn } from "@/utils/clsx";
import React from "react";

const MethodItem = ({ data, type }: { data: Pros; type: "pros" | "cons" }) => {
  return (
    <div
      className={cn("flex flex-col gap-3", {
        "hidden!":
          !data ||
          (data && !data.title && (!data.list || data.list.length === 0)),
      })}
    >
      <p className="typo-title text-[#707174] font-semibold">{data.title}</p>
      <div className="grid grid-cols-1 gap-1">
        {Array.isArray(data.list) &&
          data.list.map((v, index) => (
            <div
              className="flex flex-row gap-2.5 items-start justify-start"
              key={index}
            >
              <img
                src={type === "pros" ? images.pros : images.cons}
                alt={type}
                className="w-6 h-6"
                width={24}
                height={24}
              />
              <p className="typo-title text-[#707174]">{v.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

const Method = ({
  cons,
  info,
  pros,
  backgroundType,
}: List2 & { backgroundType: string }) => {
  return (
    <div
      className={cn(
        " p-6 sm:p-8 rounded-md grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 xl:gap-14 ",
        {
          "bg-white": backgroundType === "grey",
          "bg-[#F4F4F4]": backgroundType !== "grey",
        },
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center justify-start">
          <div
            className={cn("w-12 h-12 shrink-0", {
              "hidden!": !info?.icon || typeof info?.icon !== "string",
            })}
          >
            <img
              src={info?.icon || ""}
              alt={info?.title}
              width={48}
              height={48}
            />
          </div>
          <HeadingH4 className="text-[#1E1F20]  text-2xl! tracking-[-3%]">
            {info?.title}
          </HeadingH4>
        </div>
        <div
          className={cn("prose prose-sm sm:prose-base text-[#707174]", {
            "hidden!": !info?.description,
          })}
          dangerouslySetInnerHTML={{ __html: info?.description || "" }}
        />
      </div>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 xl:gap-x-8 xl:gap-y-6",
          {
            "hidden!":
              (!pros && !cons) ||
              (pros &&
                !pros.title &&
                (!pros.list || pros.list.length === 0) &&
                cons &&
                !cons.title &&
                (!cons.list || cons.list.length === 0)),
          },
        )}
      >
        <MethodItem data={pros} type="pros" />
        <MethodItem data={cons} type="cons" />
      </div>
    </div>
  );
};

const BoxList = ({
  cons,
  info,
  pros,
  backgroundType,
}: List2 & { backgroundType: string }) => {
  return (
    <div
      className={cn("flex flex-col gap-8 p-6 lg:p-8  rounded-[8px]", {
        "bg-white": backgroundType === "grey",
        "bg-[#F4F4F4]": backgroundType !== "grey",
      })}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[9fr_3fr] xl:grid-cols-[10fr_1.8fr] gap-8 md:gap-4 lg:gap-8 justify-start">
        <div className={cn("flex flex-col gap-4")}>
          <HeadingH4
            className={cn(
              "text-[#1E1F20] min-h-[52px]  text-2xl! tracking-[-3%]",
              {
                "hidden!": !info.title,
              },
            )}
          >
            {info.title}
          </HeadingH4>
          <p
            className={cn("typo-title text-[#707174]", {
              "hidden!": !info.description,
            })}
          >
            {info.description}
          </p>
          {info?.item && (
            <div className="flex flex-col gap-3">
              {info.item.length > 0 &&
                info.item.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row gap-2.5 items-center justify-start"
                  >
                    <img
                      src={images.circleLi}
                      alt={"circle"}
                      width={24}
                      height={24}
                    />
                    <p className="text-[#707174] typo-title">{item.title}</p>
                  </div>
                ))}
            </div>
          )}
        </div>
        <div className="aspect-6/3 lg:aspect-auto flex justify-start  max-h-[155px] w-full">
          <img
            src={info?.image}
            alt={"Medical"}
            className="w-full h-full object-contain"
            width={240}
            height={155}
          />
        </div>
      </div>
      <div
        className={cn("grid grid-cols-1 gap-8 w-full", {
          "hidden!":
            (!pros && !cons) ||
            (pros &&
              !pros.title &&
              (!pros.list || pros.list.length === 0) &&
              cons &&
              !cons.title &&
              (!cons.list || cons.list.length === 0)),
        })}
      >
        <MethodItem data={pros} type="pros" />
        <MethodItem data={cons} type="cons" />
      </div>
    </div>
  );
};

interface Props {
  acf_fc_layout: string;
  background_style: string;
  title: string;
  description: string;
  list_type: string;
  list: List2[] | boolean;
  box_list: List2[] | boolean;
  bottom_content: string;
}

interface List2 {
  info: Info;
  pros: Pros;
  cons: Pros;
}

interface Pros {
  title: string;
  list: List[];
}

interface List {
  title: string;
}

interface Info {
  icon?: string;
  title: string;
  description?: string;
  image?: string;
  item: Info[];
}

const ServiceMethod = ({
  acf_fc_layout,
  background_style,
  bottom_content,
  box_list,
  description,
  list,
  list_type,
  title,
}: Props) => {
  return (
    <Section
      className={cn("", {
        "bg-[#F4F4F4]": background_style === "grey",
        "bg-white": background_style !== "grey",
      })}
    >
      <div className="flex flex-col gap-8 sm:gap-[56px]">
        <div
          className={cn(
            "flex flex-col w-full gap-6  justify-center items-center",
            {
              "hidden!": !title && !description,
            },
          )}
        >
          <HeadingH3
            className={cn("max-w-[800px] text-center tracking-[-5%]", {
              "hidden!": !title,
            })}
          >
            {title}
          </HeadingH3>
          <div
            className={cn("max-w-[800px]!", {
              "hidden!": !description,
            })}
          >
            <div className="prose prose-sm sm:prose-lg text-[#707174]  text-center">
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div
          className={cn("grid grid-cols-1 gap-1 w-full", {
            "hidden!":
              !list || Array.isArray(list) === false || list.length === 0,
          })}
        >
          {Array.isArray(list) &&
            list.map((item, index) => (
              <Method key={index} {...item} backgroundType={background_style} />
            ))}
        </div>

        <div
          className={cn("grid grid-cols-1  gap-8 w-full", {
            "md:grid-cols-1": Array.isArray(box_list) && box_list.length === 1,
            "md:grid-cols-2": Array.isArray(box_list) && box_list.length === 2,
            "md:grid-cols-2 lg:grid-cols-3":
              Array.isArray(box_list) && box_list.length >= 3,
            "hidden!":
              !box_list ||
              Array.isArray(box_list) === false ||
              box_list.length === 0,
          })}
        >
          {Array.isArray(box_list) &&
            box_list.map((v, index) => (
              <BoxList key={index} {...v} backgroundType={background_style} />
            ))}
        </div>

        <div
          className={cn(
            "prose prose-sm sm:prose-lg text-[#707174] max-w-[900px] text-center mx-auto",
            {
              "hidden!": !bottom_content,
            },
          )}
          dangerouslySetInnerHTML={{
            __html: bottom_content,
          }}
        ></div>
      </div>
    </Section>
  );
};

export default ServiceMethod;
