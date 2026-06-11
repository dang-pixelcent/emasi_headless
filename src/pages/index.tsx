import React from "react";
import Layout from "@/components/common/Layout";
import MainContentHandbooks from "@/components/pages/sections/main_content_handbooks/main_content_handbooks";
import MainContentPeople from "@/components/pages/sections/main_content_people/main_content_people";
import MainContentPlus from "@/components/pages/sections/main_content_plus/main_content_plus";
import MainContentFee from "@/components/pages/sections/main_content_fee/main_content_fee";
import Home from "@/templates/wp-page-home";
import Program from "@/templates/wp-page-program";
import Environments from "@/components/pages/our-schools/environments/environments";
import Events from "@/components/pages/sections/events/events";
import BannerPlus from "@/components/pages/sections/banner_plus/banner_plus";
import Map from "@/components/pages/our-schools/map/map";

const HomePage = () => {
  return (
    <Layout>
      <MainContentHandbooks />
      {/* <MainContentPeople /> */}
      {/* <MainContentPlus /> */}
      {/* <Environments /> */}
      {/* <Events /> */}
      {/* <MainContentFee /> */}
      {/* <BannerPlus /> */}
      {/* <Map /> */}
    </Layout>
  );
};
export default HomePage;