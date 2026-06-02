import React from "react";
import Button from "@/components/common/Button";
import { Article } from "@/components/sections/BlogMore";
interface Props {
  article: Article;
}
const BlogCard = ({ article }: Props) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full aspect-auto sm:aspect-378/284 h-full md:max-h-[280px]">
        <img
          src={article?.image ?? ""}
          alt="boysit"
          className="w-full h-full object-cover rounded-[14.01px] "
          width={378}
          height={284}
        />
      </div>
      <div className="flex flex-col gap-6 w-full grow">
        <div className="flex flex-col gap-3 grow justify-between">
          <p className="typo-lead font-medium text-[#1A1A1A] line-clamp-2">
            {article?.title}
          </p>
          <div
            className="prose sm:prose-lg line-clamp-3 text-[#667085] "
            dangerouslySetInnerHTML={{ __html: article?.excerpt ?? "" }}
          ></div>
        </div>

        <div className="w-max">
          <Button
            to={article?.link || "#"}
            variant="text"
            color="orange"
            className="hover:underline text-[#C73F2E] typo-lead p-0 cursor-pointer"
          >
            Read more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
