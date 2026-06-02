import ButtonUI from "@/components/common/Button";
import SmartLink from "@/components/common/Link";
import Section from "@/components/common/Section";
import IconFacebookSocial from "@/components/icon/IconFacebookSocial";
import IconLinked from "@/components/icon/IconLinked";
import IconPinterest from "@/components/icon/IconPinterest";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "@/types/general";
import { useStoreContext } from "@/context/StoreContext";
interface CardProps {
  article: IteamRelatedArticleSingle;
}
const Card = ({ article }: CardProps) => {
  return (
    <SmartLink
      to={article.link.url ?? ""}
      className="flex gap-4  p-6 border border-solid border-[#908F923D] rounded-[16px]"
    >
      <div className="typo-title font-semibold text-[#130D0C]">
        {article.link.title}
      </div>
      <div className="flex items-center justify-center">
        <ChevronRightIcon size={24} className="text-[#C73F2E]" />
      </div>
    </SmartLink>
  );
};

interface IteamRelatedArticleSingle {
  link: Button;
}
interface RelatedArticleSingle {
  heading?: string;
  items?: IteamRelatedArticleSingle[];
}
interface Props {
  title?: string;
  author_name?: string;
  featured_image?: string;
  content?: string;
  related_service_single?: RelatedArticleSingle;
}
const BlogDetail = (props: Props) => {
  const {
    title,
    author_name,
    featured_image,
    content,
    related_service_single,
  } = props;
  const { currentPage } = useStoreContext();

  const handleShare = (platform: string) => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";

    const encodedUrl = encodeURIComponent(currentUrl);
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] lg:gap-8 xl:gap-12 w-full">
        <div className="flex flex-col w-full gap-14 sm:gap-16">
          <div className="w-full">
            <ButtonUI
              variant="text"
              color="orange"
              to={`/blog/?page=${currentPage ? currentPage : 1}`}
              // onClick={() => navigate(-1)}
              className="p-0 flex items-center justify-start gap-2"
            >
              <ChevronLeftIcon size={24} className="text-[#C73F2E]" />
              <p className="typo-title capitalize text-[#757D85]">Back</p>
            </ButtonUI>
          </div>
          <div>
            {title && (
              <h1
                className="text-[#1E1F20] tracking-[-2%] md:text-[48px]! font-medium text-[32px]  font-heading leading-[1.2] md:leading-normal"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}

            {author_name && (
              <p className="typo-body text-[#5D5D5D] mt-4">
                Author:{" "}
                <span className="typo-lead font-semibold text-[#121416]">
                  {author_name}
                </span>
              </p>
            )}
          </div>

          {featured_image && (
            <div className="aspect-auto sm:aspect-video lg:aspect-4/3">
              <img
                src={featured_image}
                alt={"Boy running"}
                className="object-cover w-full h-full rounded-[14.27px]"
                width={800}
                height={600}
              />
            </div>
          )}
          <div
            className="prose prose-sm md:prose-base lg:prose-lg"
            dangerouslySetInnerHTML={{ __html: content ?? "" }}
          ></div>
        </div>
        {related_service_single && (
          <div className="flex flex-col gap-16 mt-8 lg:mt-0">
            <div className="flex flex-col gap-16 sticky top-28">
              <div className="flex flex-col gap-4">
                <p className="typo-lead font-semibold text-[#1E1F20]">
                  {related_service_single.heading}
                </p>
                {related_service_single?.items?.map((item, index) => (
                  <Card key={index} article={item} />
                ))}
              </div>
              <div className="flex justify-between w-full gap-10 items-center">
                <p className="text-title font-semibold text-[#757D85]">Share</p>
                <div className="flex gap-3 justify-center items-end ">
                  <button
                    className="button-social facebook"
                    onClick={() => handleShare("facebook")}
                  >
                    <IconFacebookSocial />
                  </button>
                  <button
                    className="button-social pinterest"
                    onClick={() => handleShare("pinterest")}
                  >
                    <IconPinterest />
                  </button>
                  <button
                    className="button-social linked"
                    onClick={() => handleShare("linkedin")}
                  >
                    <IconLinked />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default BlogDetail;
