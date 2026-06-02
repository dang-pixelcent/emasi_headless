import { HeadingH3 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import React from "react";
import ContentVideo from "./component/ContentVideo";
interface Props {
  background_image?: string;
  content?: string;
  title?: string;
  image?: string;
  video_code?: string;
  video_url?: string;
  youtube_link?: string;
  type?: string;
}
const AboutUsCeo = (props: Props) => {
  const {
    background_image,
    content,
    title,
    video_code,
    youtube_link,
    image,
    video_url,
    type,
  } = props;

  return (
    <Section className="py-[80px] md:py-[120px] bg-[#F4F4F4] lg:bg-white">
      <div className=" w-full bg-transparent lg:bg-[#F4F4F4] relative overflow-hidden">
        <div className="absolute w-full h-full z-0">
          <img
            className="w-full h-full object-cover"
            src={background_image ?? ""}
            alt="#"
            width={1920}
            height={1080}
          />
        </div>
        <div className="w-full h-full relative z-1 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex justify-center p-4 py-6 xl:pt-[41px] xl:pr-[84px] xl:pb-[43px] xl:pl-[84px]">
            <ContentVideo
              type={type}
              video_code={video_code}
              youtube_link={youtube_link}
              image={image}
              video_url={video_url}
            />
          </div>
          <div className="p-0 md:p-5 lg:p-10 ">
            <div className="py-[34.5px] flex flex-col gap-8 ">
              {title && <HeadingH3>{title}</HeadingH3>}
              <div
                className="prose prose-sm md:prose-lg text-[#707174] w-full italic "
                dangerouslySetInnerHTML={{ __html: content ?? "" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutUsCeo;
