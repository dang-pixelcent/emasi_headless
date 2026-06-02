import { images } from "@/lib/images";
import React from "react";
import Button from "../Button";
import SmartLink from "../Link";
import { FooterData } from "@/types/general";
import { cn } from "@/utils/clsx";
import IconFacebook from "@/components/icon/IconFacebook";
import IconX from "@/components/icon/IconX";

const IconLocal = {
  facebook: <IconFacebook />,
  twitter: <IconX />,
};
interface Props {
  footerGroup: FooterData;
}

const Footer = ({ footerGroup }: Props) => {
  return (
    <footer className="w-full bg-[#191A50] px-6 py-10 md:p-12 lg:p-16 flex items-center justify-center">
      <div className="flex flex-col gap-12 w-full max-w-body mx-auto  ">
        <div className="flex flex-col xl:flex-row justify-between w-full gap-10">
          <div className="flex flex-col gap-10 grow">
            <div className="flex flex-col sm:flex-row gap-10 justify-between items-center">
              <img
                src={footerGroup?.logo || images.logoWhite}
                alt="logo"
                width={140}
                height={78}
                className="h-[78px]"
              />
              <div className="flex flex-col gap-4 md:items-center justify-end sm:flex-row sm:gap-6 w-full">
                <Button
                  to={footerGroup?.medical_history_form?.url || "#"}
                  target={footerGroup?.medical_history_form?.target || "_self"}
                  variant="contained"
                  color="red"
                  className="px-[44px] py-4 w-full sm:w-auto"
                >
                  {footerGroup?.medical_history_form?.title ||
                    "Medical History Form"}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[56px] md:gap-10 justify-between w-full">
              <div
                className={cn("flex flex-col gap-3 md:gap-6", {
                  "hidden!": !footerGroup?.our_location,
                })}
              >
                <span className="text-white typo-small font-medium uppercase">
                  location
                </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: footerGroup?.our_location,
                  }}
                  className="prose prose-sm md:prose-lg text-[#FFFFFF99] footer-link"
                ></div>
              </div>

              <div
                className={cn("flex flex-col gap-3 md:gap-6", {
                  "hidden!": !footerGroup?.opening_hours,
                })}
              >
                <span className="text-white typo-small font-medium uppercase">
                  We’re open
                </span>
                {footerGroup?.opening_hours &&
                  footerGroup?.opening_hours.map((hour, index) => (
                    <p key={index} className="typo-title text-[#FFFFFF99]">
                      {hour?.day}
                    </p>
                  ))}
              </div>

              <div
                className={cn("flex flex-col gap-3 md:gap-6", {
                  "hidden!":
                    !footerGroup?.menu_footer ||
                    footerGroup?.menu_footer.length === 0,
                })}
              >
                <span className="text-white typo-small font-medium uppercase">
                  services
                </span>
                <div className="flex flex-col gap-2">
                  {footerGroup?.menu_footer &&
                    footerGroup?.menu_footer.map((service, index) => (
                      <SmartLink
                        key={index}
                        to={service?.item?.url || "#"}
                        target={service?.item?.target || "_self"}
                        className="text-[#FFFFFF99] typo-title hover:underline hover:text-orange transition-all duration-300 ease-in-out"
                      >
                        {service?.item?.title}
                      </SmartLink>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 ">
            <div
              className="iframe-map"
              dangerouslySetInnerHTML={{ __html: footerGroup?.maps }}
            />
          </div>
        </div>
        <div className="border-t border-[#F4D9D5] pt-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 ">
            <div
              className={cn(
                "typo-caption text-t14 text-white text-center md:text-start self-center",
                {
                  "hidden!": !footerGroup?.copyright,
                },
              )}
            >
              {footerGroup?.copyright || ""}
            </div>
            <div className="flex flex-col md:flex-row md:gap-4  lg:gap-10 md:justify-end ">
              <div
                className={cn(
                  "flex gap-6 mb-4 md:mb-0 justify-center items-center",
                  {
                    "hidden!":
                      !footerGroup?.quick_link ||
                      footerGroup?.quick_link?.length === 0,
                  },
                )}
              >
                {footerGroup?.quick_link &&
                  footerGroup?.quick_link?.map((item, index) => (
                    <SmartLink
                      key={item?.item?.url || item?.item?.title || index}
                      to={item?.item?.url || "#"}
                      target={item?.item?.target || "_self"}
                      className="text-white typo-caption text-t14 hover:text-orange hover:underline transition-all duration-300 ease-in-out"
                    >
                      {item?.item?.title}
                    </SmartLink>
                  ))}
              </div>
              <div className="flex gap-4 justify-center items-center">
                {footerGroup?.socials &&
                  Object.keys(footerGroup?.socials).length > 0 &&
                  Object.keys(footerGroup?.socials).map((key) => {
                    const socialUrl = (footerGroup?.socials as any)[key];
                    if (!socialUrl) return null;
                    const SocialIcon = IconLocal[key as keyof typeof IconLocal];
                    const socialLabels: Record<string, string> = {
                      facebook: "Visit us on Facebook",
                      twitter: "Visit us on Twitter",
                    };
                    return (
                      <Button
                        key={key}
                        to={socialUrl}
                        color="white"
                        target="_blank"
                        aria-label={
                          socialLabels[key] || `Visit our ${key} page`
                        }
                        className="p-[7.2px] flex justify-center items-center "
                      >
                        {SocialIcon}
                      </Button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
