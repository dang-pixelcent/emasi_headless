import React from "react";
import Layout from "@/components/common/Layout";
import About from "@/components/pages/our-schools/about/about";
import Badgets from "@/components/pages/our-schools/badgets/badgets";
import News from "@/components/pages/our-schools/news_events/news_events";
import Projects from "@/components/pages/our-schools/projects/projects";
import Achievement from "@/components/pages/our-schools/academic_achievement/academic_achievement";
import Fees from "@/components/pages/our-schools/tuition_fees/tuition_fees";
import Banner from "@/components/pages/our-schools/banner/banner";
import Discover from "@/components/pages/sections/discover_more/discover_more";

const HomePage = () => {
  return (
    <Layout>
      <About />
      <Badgets />  
      <Projects />
      <Achievement />
      <News />
      <Fees />
      <Banner />
      <Discover />
    </Layout>
  );
};
export default HomePage;