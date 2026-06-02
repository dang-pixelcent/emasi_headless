import AboutUsCeo from "@/components/sections/AboutUsCeo";
import AboutUsDetail from "@/components/sections/AboutUsDetail";
import AboutUsOurMedical from "@/components/sections/AboutUsOurMedical";
import BannerHome from "@/components/sections/BannerHome";
import Contact from "@/components/sections/Contact";
import FaqsServices from "@/components/sections/Faq";
import CustomComponent from "@/components/sections/CustomComponent";
import Partients from "@/components/sections/Partients";
import ServiceCommon from "@/components/sections/ServiceCommon";
import ServiceContentLeft from "@/components/sections/ServiceContentLeft";
import ServiceContentTwoColumnText from "@/components/sections/ServiceContentTwoColumnText";
import ServiceFullTextBg from "@/components/sections/ServiceFullTextBg";
import ServiceRelated from "@/components/sections/ServiceRelated";
import ServiceSingleLine from "@/components/sections/ServiceSingleLine";
import ServiceTextWithText from "@/components/sections/ServiceTextWithText";
import TextWithImage from "@/components/sections/TextWithImage";
import ThankYou from "@/components/sections/ThankYou";
import MeetTheTeam from "@/components/sections/MeetTheTeam";
import ServiceBanner from "@/components/sections/ServiceBanner";
import { PAGE_COMPONENT } from "@/types/general";

import React from "react";
import ServiceTwoColumnBenefit from "@/components/sections/ServiceTwoColumn";
import ServiceMethod from "@/components/sections/ServiceMethod";
import BlogDetail from "@/components/sections/BlogDetail";
import BlogMore from "@/components/sections/BlogMore";
import BlogList from "@/components/sections/BlogList";
import ServiceCategory from "@/components/sections/ServiceCategory";
import TeamBanner from "@/components/sections/TeamBanner";
import PopularServices from "@/components/sections/PopularServices";

const renderComponent = (data: any) => {
  switch (data?.acf_fc_layout) {
    case PAGE_COMPONENT.HERO_BANNER:
      return <BannerHome {...data} />;
    case PAGE_COMPONENT.POPULAR_SERVICES:
      return <PopularServices {...data} />;
    case PAGE_COMPONENT.CONTENT_WITH_IMAGE:
      return <TextWithImage {...data} />;
    case PAGE_COMPONENT.TESTIMONIALS:
      return <Partients {...data} />;
    case PAGE_COMPONENT.CTA:
      return <Contact {...data} />;
    case PAGE_COMPONENT.THANK_YOU_CONTENT:
      return <ThankYou {...data} />;
    case PAGE_COMPONENT.COMMON_EFFECTS:
      return <ServiceCommon {...data} />;
    case PAGE_COMPONENT.RELATED_SERVICES:
      return <ServiceRelated {...data} />;
    case PAGE_COMPONENT.FAQS:
      return <FaqsServices {...data} />;
    case PAGE_COMPONENT.CONTENT_FULL_TEXT_BG:
      return <ServiceFullTextBg {...data} />;
    case PAGE_COMPONENT.CONTENT_TWO_COLUMN_TEXT_OTHER:
      return <ServiceTextWithText {...data} />;
    case PAGE_COMPONENT.CONTENT_ALIGN_LEFT:
      return <ServiceContentLeft {...data} />;
    case PAGE_COMPONENT.CONTENT_TWO_COLUMN_TEXT:
      return <ServiceContentTwoColumnText {...data} />;
    case PAGE_COMPONENT.CONTENT_FULL_TEXT:
      return <ServiceSingleLine {...data} />;
    case PAGE_COMPONENT.CUSTOM_CONTENT:
      return <CustomComponent {...data} />;
    case PAGE_COMPONENT.BANNER:
      return <ServiceBanner {...data} />;
    case PAGE_COMPONENT.OUR_JOURNEY:
      return <AboutUsDetail {...data} />;
    case PAGE_COMPONENT.CONTENT_WITH_IMAGE_OTHER:
      return <AboutUsCeo {...data} />;
    case PAGE_COMPONENT.OUR_MEIDCAL:
      return <AboutUsOurMedical {...data} />;
    case PAGE_COMPONENT.MEET_THE_TEAM:
      return <MeetTheTeam {...data} />;
    case PAGE_COMPONENT.BENEFITS:
      return <ServiceTwoColumnBenefit {...data} />;
    case PAGE_COMPONENT.METHODS:
      return <ServiceMethod {...data} />;
    case PAGE_COMPONENT.CONTENT_WRAP:
      return <BlogDetail {...data} />;
    case PAGE_COMPONENT.RELATED_ARTICLES:
      return <BlogMore {...data} />;
    case PAGE_COMPONENT.BLOG_LISTS:
      return <BlogList {...data} />;
    case PAGE_COMPONENT.CONTENT_WITH_TABS:
      return <ServiceCategory {...data} />;
    case PAGE_COMPONENT.TEAM_BANNER:
      return <TeamBanner {...data} />;
    default:
      return null;
  }
};

export default renderComponent;
