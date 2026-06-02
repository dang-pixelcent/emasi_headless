import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { images } from "@/lib/images";
import { HeadingH3 } from "../../Heading";
import IconX from "@/components/icon/IconX";
import IconFacebook from "@/components/icon/IconFacebook";
import { Team } from "@/components/sections/MeetTheTeam";
import IconLinked from "@/components/icon/IconLinked";
import IconLinkedV2 from "@/components/icon/IconLinkedV2";
interface Props {
  team?: Team | null;
  isOpen: boolean;
  onClose: () => void;
}
const PopupDetailMeetTheTeam = ({ team, isOpen, onClose }: Props) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} className="relative z-99999">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="
              relative transform overflow-hidden rounded-lg
              bg-[#f4f4f4] shadow-xl
              transition-all
              w-full max-w-[1200px]"
            >
              <div className="w-full">
                <div className="w-full md:flex items-stretch">
                  <div className=" md:flex-1 flex justify-center">
                    <img
                      src={team?.featured_image ?? images.FramePeople}
                      alt={team?.title}
                      className=" w-[50vw] md:w-full h-full object-cover"
                      width={600}
                      height={400}
                    />
                  </div>
                  <div className="md:w-[55%] h-full">
                    <div className="p-[20px] md:p-[40px]">
                      <div className="flex gap-[10px] justify-between items-center">
                        <HeadingH3 className="text-[#323232]">
                          {team?.title}
                        </HeadingH3>
                        {team?.profile_popup?.member_position && (
                          <div className="w-max pt-[7.5px] pb-[7.5px] pl-[5px] pr-[16px] flex items-center gap-[8.68px] bg-[#F6FBFE] rounded-[39.65px]">
                            <div className="w-[28px] h-[28px] rounded-full bg-[#E6E0D9] flex items-center justify-center">
                              <img
                                src={images.InfiniteIcon}
                                alt="logo"
                                className="w-[23px] h-[14px]"
                                width={23}
                                height={14}
                              />
                            </div>
                            <div className="typo-caption font-[600] text-[#2F4C78]">
                              {team?.profile_popup?.member_position}
                            </div>
                          </div>
                        )}
                      </div>
                      <div
                        className=" prose prose-sm sm:prose-lg text-[#707174] pt-[16px] md:pt-[32px] text-left"
                        dangerouslySetInnerHTML={{
                          __html: team?.profile_popup?.short_description ?? "",
                        }}
                      ></div>
                      {team?.profile_popup?.socials?.facebook_link ||
                        team?.profile_popup?.socials?.instagram_link ||
                        (team?.profile_popup?.socials?.twitter_link && (
                          <div className="flex gap-[12px] pt-[12px]">
                            {team?.profile_popup?.socials?.instagram_link && (
                              <div
                                onClick={() =>
                                  window.open(
                                    `${team?.profile_popup?.socials?.instagram_link}`,
                                    "_blank",
                                  )
                                }
                                className="w-[40px] h-[40px] bg-white border border-[#8F92923D] rounded-full flex items-center justify-center hover:cursor-pointer"
                              >
                                <IconLinkedV2 />
                              </div>
                            )}
                            {team?.profile_popup?.socials?.facebook_link && (
                              <div
                                onClick={() =>
                                  window.open(
                                    `${team?.profile_popup?.socials?.facebook_link}`,
                                    "_blank",
                                  )
                                }
                                className="w-[40px] h-[40px] bg-white border border-[#8F92923D] rounded-full flex items-center justify-center hover:cursor-pointer"
                              >
                                <IconFacebook />
                              </div>
                            )}
                            {team?.profile_popup?.socials?.twitter_link && (
                              <div
                                onClick={() =>
                                  window.open(
                                    `${team?.profile_popup?.socials?.twitter_link}`,
                                    "_blank",
                                  )
                                }
                                className="w-[40px] h-[40px] bg-white border border-[#8F92923D] rounded-full flex items-center justify-center hover:cursor-pointer"
                              >
                                <IconX />
                              </div>
                            )}
                          </div>
                        ))}
                      {team?.profile_popup?.professional_highlights && (
                        <div className=" mt-[16px] md:mt-[32px] pt-[20px] pb-[20px] pl-[24px] pr-[24px] bg-[#EDEDED] rounded-[8px]">
                          <div className="typo-title text-[#1D1D1D] text-left font-[600]">
                            Professional Highlights
                          </div>
                          <div
                            className="w-full pt-[30px] text-[#707174] text-left professional-highlights"
                            dangerouslySetInnerHTML={{
                              __html:
                                team?.profile_popup?.professional_highlights ??
                                "",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default PopupDetailMeetTheTeam;
