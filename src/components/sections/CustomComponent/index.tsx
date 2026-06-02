import { HeadingH2 } from "@/components/common/Heading";
import Section from "@/components/common/Section";
import { cn } from "@/utils/clsx";
import React from "react";
export interface CustomComponentProps {
  background_image?: string;
  background_mobile: boolean;
  content?: string;
  title?: string;
}
const CustomComponent = (props: CustomComponentProps) => {
  const { background_image, background_mobile, content, title } = props;

  React.useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://brandassets.app/external/integration/ff65e1f478a333f61e143f756c3fee63";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className=" relative w-full bg-[linear-gradient(11.48deg,_#BAC4CA_-4.75%,_rgba(255,255,255,0)_62.67%,_#FBFDFE_62.67%)] overflow-hidden">
      {background_image && (
        <div
          className={cn("absolute w-full h-full z-0 md:block", {
            hidden: background_mobile,
          })}
        >
          <img
            className="w-full h-full object-cover"
            src={background_image ?? ""}
            alt="#"
            width={1920}
            height={1080}
          />
        </div>
      )}
      <Section className="relative z-10 ">
        {title && (
          <div className="w-full text-center">
            <HeadingH2 className="text-[#2E2E31] font-[500]">{title}</HeadingH2>
          </div>
        )}
        <div className="w-full flex justify-center">
          <div className="mt-[24px] p-[64px] border border-[#CDE0EC] bg-[#FFFFFF] rounded-[16px] max-w-[960px] w-full min-h-[771px]">
            <div
              className="prose prose-sm sm:prose-lg w-full"
              dangerouslySetInnerHTML={{ __html: content ?? "" }}
            ></div>
          </div>
        </div>
      </Section>
    </div>
  );
};
export default CustomComponent;
