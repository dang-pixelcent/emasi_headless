import React from "react";
import Layout from "@/components/common/Layout";
import MainContentHandbooks from "@/components/pages/sections/main_content_handbooks";
import MainContentPeople from "@/components/pages/sections/main_content_people";
import MainContentPlus from "@/components/pages/sections/main_content_plus";
import MainContentFee from "@/components/pages/sections/main_content_fee";
import Home from "@/templates/wp-page-home";
import Program from "@/templates/wp-page-program";
import Environments from "@/components/pages/our-schools/environments";
import Events from "@/components/pages/sections/events";
import BannerPlus from "@/components/pages/sections/banner_plus";
import Map from "@/components/pages/our-schools/map";
import News from "@/components/pages/our-schools/news_events";
import Facilities from "@/components/pages/our-schools/facilities/facilities";
import ListHocBong from "@/templates/wp-hoc-bong-list";
const HomePage = () => {
  return (
    <Layout>
      {/* <MainContentHandbooks /> */}
      <ListHocBong />
      {/* <MainContentPlus /> */}
      {/* <Environments /> */}
      {/* <Events /> */}
      {/* <MainContentFee /> */}
      {/* <BannerPlus /> */}
      {/* <Map /> */}
      {/* <News /> */}
      {/* <Program /> */}
      {/* <Facilities /> */}
    </Layout>
  );
};
export default HomePage;