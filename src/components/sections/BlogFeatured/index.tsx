import Section from "@/components/common/Section";
import { images } from "@/lib/images";
import React from "react";
import { HeadingH3 } from "@/components/common/Heading";
import Button from "@/components/common/Button";
import { Article } from "../BlogMore";
import { cn } from "@/utils/clsx";

interface Props {
  article: Article | null;
}

const BlogFeatured = ({ article }: Props) => {
  return (
    <Section
      className={cn("bg-[#F4F4F4]", {
        "hidden!": !article,
      })}
    >
      <img
        src={images.InfiniteBg}
        alt="bg"
        className="absolute top-0 left-0 w-full h-full z-0"
        width={1920}
        height={1080}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full relative z-1">
        <div className="aspect-4/3 lg:aspect-580/425 w-full h-full flex justify-center items-center">
          <img
            src={article?.image || ""}
            alt={article?.title || "Featured blog post"}
            className="object-cover w-full h-full rounded-[14.01px]"
            width={580}
            height={425}
          />
        </div>
        <div className="flex flex-col justify-center items-start gap-6 lg:gap-10">
          <div className="flex flex-col gap-2">
            <span className="typo-caption text-[#4C4D83] uppercase font-semibold">
              featured blog post
            </span>
            <HeadingH3 className="text-[#1E1F20]">
              {article?.title || "Risks vs Benefits of Testosterone Therapy"}
            </HeadingH3>
          </div>

          <div className="prose prose-sm sm:prose-lg text-[#707174]">
            <p
              dangerouslySetInnerHTML={{
                __html: article?.excerpt || "",
              }}
            ></p>
          </div>

          <div>
            <Button
              to={article?.link || "#"}
              variant="text"
              color="orange"
              className="p-0 cursor-pointer hover:underline text-red-500"
            >
              Continue reading
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BlogFeatured;
