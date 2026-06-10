import React from "react";
import Layout from "@/components/common/Layout";
import MainContentHandbooks from "@/components/pages/sections/main_content_handbooks/main_content_handbooks";
import MainContentPeople from "@/components/pages/sections/main_content_people/main_content_people";
import MainContentPlus from "@/components/pages/sections/main_content_plus/main_content_plus";
import Home from "@/templates/wp-page-home";
import Program from "@/templates/wp-page-program";
const HomePage = () => {
  return (
    <Layout>
      {/* <MainContentHandbooks /> */}
      <MainContentPeople />
      {/* <MainContentPlus /> */}
    </Layout>
  );
};
export default HomePage;