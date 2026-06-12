import React from "react";
import Layout from "@/components/common/Layout";
import MainContentHandbooks from "@/components/pages/sections/main_content_handbooks/main_content_handbooks";
import MainContentPeople from "@/components/pages/sections/main_content_people/main_content_people";
import MainContentPlus from "@/components/pages/sections/main_content_plus/index.tsx";
import Home from "@/templates/wp-page-home";
import Program from "@/templates/wp-page-program";
import HocBong from "@/templates/wp-page-hoc-bong";
import HocBongList from "@/templates/wp-hoc-bong-list";
const HomePage = () => {
  return (
    <Layout>
      {/* <MainContentHandbooks /> */}
      <HocBongList />
      {/* <MainContentPlus /> */}
    </Layout>
  );
};
export default HomePage;