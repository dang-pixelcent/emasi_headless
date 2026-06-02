import Section from "@/components/common/Section";
import BlogCard from "@/components/ui/BlogCard";
import React from "react";

export interface Article{
  id: number,
  date: string,
  excerpt: string,
  image: string,
  link?: string,
  title?:string
}
interface Props{
  heading: string
  items?: Article[]
}
const BlogMore = (props: Props) => {
  const {heading, items} = props
  return (
    <Section className="bg-[#F4F4F4]">
      <div className="flex flex-col w-full gap-8">
        <h5 className="typo-heading font-semibold text-[#1D1D1D]">
          {heading}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {items?.map((item) => (
            <BlogCard key={item.id} article={item} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BlogMore;
