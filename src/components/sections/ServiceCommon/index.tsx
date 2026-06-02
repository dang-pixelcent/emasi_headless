import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { cn } from "@/utils/clsx";
import React, { Fragment } from "react";

interface Props {
  acf_fc_layout: string;
  background_color: string;
  title: string;
  description: string;
  list: List[];
  bottom_content: string;
  vertical_alignment?: {
    align_items: string;
  };
}

interface List {
  title: string;
  content: string;
}

const ServiceCommon = ({
  acf_fc_layout,
  background_color,
  title,
  description,
  list,
  bottom_content,
  vertical_alignment,
}: Props) => {
  return (
    <Section className={`bg-[${background_color}]`}>
      <div className="flex flex-col gap-20 w-full justify-center items-center ">
        <div
          className={cn(
            "flex flex-col max-w-[800px] justify-center items-center w-full gap-6",
            {
              "hidden!": !title && !description,
            },
          )}
        >
          <HeadingH3
            className={cn("text-center", {
              "hidden!": !title,
            })}
          >
            {title}
          </HeadingH3>
          <div
            className={cn(
              "prose sm:prose-lg prose-sm text-center text-[#707174]",
              {
                "hidden!": !description,
              },
            )}
          >
            <p>{description}</p>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full">
          {Array.isArray(list) &&
            list.map((v, index) => (
              <Fragment key={index}>
                <div
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 justify-center gap-4 sm:gap-0",
                    {
                      "items-center":
                        vertical_alignment?.align_items === "center",
                      "items-start":
                        vertical_alignment?.align_items === "flex-start",
                      "items-end":
                        vertical_alignment?.align_items === "flex-end",
                    },
                  )}
                >
                  <p className="typo-lead font-medium text-[#1E1F20]">
                    {v.title}
                  </p>
                  <div
                    className="prose prose-sm sm:prose-lg text-[#707174]"
                    dangerouslySetInnerHTML={{ __html: v.content }}
                  ></div>
                </div>
                <div
                  className={cn("border border-solid border-[#DBDBDC]", {
                    hidden:
                      index === Array.from({ length: list.length }).length - 1,
                  })}
                />
              </Fragment>
            ))}
        </div>
      </div>
    </Section>
  );
};

export default ServiceCommon;
