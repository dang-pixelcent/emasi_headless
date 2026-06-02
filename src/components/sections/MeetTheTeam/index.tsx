import { HeadingH3, HeadingH4 } from "@/components/common/Heading";
import PopupDetailMeetTheTeam from "@/components/common/Popups/PopupDetailMeetTheTeam";
import Section from "@/components/common/Section";
import { images } from "@/lib/images";
import React, { useMemo, useState } from "react";

export interface Team {
  id: number;
  title: string;
  featured_image?: string;
  position?: string;
  profile_popup?: {
    featured_image: string;
    member_position?: string;
    professional_highlights?: string;
    short_description?: string;
    socials?: {
      facebook_link?: string;
      instagram_link?: string;
      twitter_link?: string;
    };
  };
}
interface Props {
  title?: string;
  description?: string;
  team_list?: Team[];
}
const MeetTheTeam = (props: Props) => {
  const { title, description, team_list } = props;
  const [team, setTeam] = useState<Team | null>(null);
  const isVisiblePopup = useMemo(() => {
    return (
      team_list && team_list?.filter((item) => item.profile_popup)?.length > 0
    );
  }, [team_list]);
  return (
    <Section className="bg-white md:py-[120px]">
      <div className="w-full text-center flex justify-center flex-col items-center gap-[12px]">
        {title && <HeadingH3 className="text-[#323232]">{title}</HeadingH3>}
        <div
          className="text-center mr-0 w-full md:max-w-[720px] prose prose-sm sm:prose-lg text-[#707174]"
          dangerouslySetInnerHTML={{ __html: description ?? "" }}
        ></div>
      </div>
      <div className="pt-[64px] flex gap-x-[24px] gap-y-[24px] md:gap-y-[64px] flex-wrap w-full justify-center">
        {team_list?.map((item) => (
          <div
            className="w-full sm:w-[calc((100%-24px*3)/2)] md:w-[calc((100%-24px*3)/4)] hover:cursor-pointer "
            key={item.id}
            onClick={() => setTeam(item)}
          >
            <div className="w-full h-auto rounded-[16px] overflow-hidden">
              <img
                className="w-full h-full"
                src={item?.featured_image ?? images.FramePeople}
                alt={item?.title}
                width={252}
                height={252}
              />
            </div>
            <HeadingH4 className="text-[#0C1311] pt-[24px]">
              {item?.title}
            </HeadingH4>
            <div className="typo-title text-[#6D6D6D] pt-[4px]">
              {item?.position}
            </div>
          </div>
        ))}
      </div>
      {isVisiblePopup && (
        <PopupDetailMeetTheTeam
          team={team}
          isOpen={!!team}
          onClose={() => setTeam(null)}
        />
      )}
    </Section>
  );
};
export default MeetTheTeam;
