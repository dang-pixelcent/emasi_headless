import Section from "@/components/common/Section";
import BlogCard from "@/components/ui/BlogCard";
import PaginationBlog from "@/components/ui/Pagination";
import { cn } from "@/utils/clsx";
import React, { useMemo, useState } from "react";
import { Article } from "../BlogMore";
import BlogFeatured from "../BlogFeatured";
import { useLocation } from "@reach/router";

interface Props {
  acf_fc_layout: string;
  heading: string;
  blog_list_posts: Article[];
}

const BlogList = ({ acf_fc_layout, heading, blog_list_posts }: Props) => {
  const { search } = useLocation();
  const initialPage = Number(new URLSearchParams(search).get("page")) || 1;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const limit = 6;

  const firstArticle = useMemo(() => {
    if (!Array.isArray(blog_list_posts) || blog_list_posts.length === 0)
      return null;
    return blog_list_posts[0];
  }, [blog_list_posts]);

  const listBlog = useMemo(() => {
    if (!Array.isArray(blog_list_posts)) return [];
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return blog_list_posts
      .filter((item) => item.id !== firstArticle?.id)
      .slice(startIndex, endIndex);
  }, [blog_list_posts, currentPage, firstArticle]);

  const totalPages = useMemo(() => {
    if (!Array.isArray(blog_list_posts)) return 0;
    return Math.ceil(blog_list_posts.length / limit);
  }, [blog_list_posts, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <BlogFeatured article={firstArticle} />
      <Section>
        <div className="flex flex-col gap-7.5 w-full">
          <div className="flex flex-col gap-8 w-full">
            <p
              className={cn("font-semibold typo-heading text-[#1D1D1D]", {
                "hidden!": !heading,
              })}
            >
              {heading}
            </p>
            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 w-full gap-y-12",
                {
                  "hidden!": !blog_list_posts || blog_list_posts.length === 0,
                },
              )}
            >
              {listBlog.map((post, index) => (
                <BlogCard key={post?.id || index} article={post} />
              ))}
            </div>
          </div>
          <div>
            <PaginationBlog
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      </Section>
    </>
  );
};

export default BlogList;
