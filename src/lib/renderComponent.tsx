
import { PAGE_COMPONENT } from "@/types/general";
// import MainTitle from "../components/pages/program/main_title";
import MainContentPlus from "@/components/pages/sections/main_content_plus";
import React from "react";
// import Banner from "@/components/pages/home/banner";
import Banner from "@/components/pages/our-schools/banner";
import MainContentPeople from "@/components/pages/sections/main_content_people";
import Badgets from "@/components/pages/our-schools/badgets";
import Facilities from "@/components/pages/our-schools/facilities/facilities";
import EducationRoute from "@/components/pages/our-schools/education_route";
import Environments from "@/components/pages/our-schools/environments";
import News from "@/components/pages/our-schools/news_events";
import Fees from "@/components/pages/our-schools/tuition_fees";
import PublicShare from "@/components/pages/our-schools/public_share";
import Map from "@/components/pages/our-schools/map";
import EmasiAbout from "@/components/pages/home/emasi_about";
import SchoolList from "@/components/pages/home/school_list";
import Values from "@/components/pages/home/values";
import BannerPlus from "@/components/pages/sections/banner_plus";
import HocHieu from "@/components/pages/program/hoc_hieu";
import AllProgramSection from "@/components/pages/program/all_program";
import Educational from "@/components/pages/program/educational";
import Fee from "@/components/pages/sections/fee";
import Careers from "@/components/pages/sections/careers";
// import Events from "@/components/pages/sections/events";
const renderComponent = (data: any, page: any) => {
  // Kiểm tra __typename từ Page Builder
  const type = data?.__typename;

  switch (type) {
    case 'PageBuilderPagebuilderdataContentEditorLayout':
      return (
        <MainContentPlus data={{ title: page.title, uri: page.uri, lang: page.language.code }}>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </MainContentPlus>
      );

    // Thêm các case khác khi bạn có thêm các layout mới từ Page Builder
    case 'PageBuilderPagebuilderdataBannerLayout':
      console.log("Đã vào case Banner!", data.bannergallery);

      // 1. Tách mảng nodes ra một biến riêng để chắc chắn không sai chính tả
      const rawNodes = data.bannergallery?.nodes || [];

      // 2. Map dữ liệu với cú pháp return rõ ràng (tránh lỗi arrow function)
      const bannerItems = rawNodes.map((item: any) => {
        return {
          type: item.sourceUrl?.match(/\.(mp4|webm|ogv)$/i) ? "video" : "image",
          url: item.sourceUrl,
          alt: item.altText || "Hệ thống Trường EMASI"
        };
      });

      console.log("Banner truyền vào component:", bannerItems);
      // return <Banner items={bannerItems} />;
      return <Banner data={data} />;
    // return <BannerPlus></BannerPlus>


    case 'PageBuilderPagebuilderdataTeacherLayout':
      console.log("Đã vào case Teacher Layout!", data.teamTeach);
      // Truyền trực tiếp data (chứa teamTeach) sang component MainContentPeople
      return <MainContentPeople data={data} />;

    case 'PageBuilderPagebuilderdataBadgetsLayout':
      console.log("Đã vào case Badgets Layout!", data.listItem);
      // Xử lý dữ liệu cho layout Badgets
      return <Badgets data={data} />;
    case 'PageBuilderPagebuilderdataFacilitiesLayout':
      console.log("Đã vào case Facilities Layout!", data.listItem);
      return <Facilities lang={page.language?.code} />;
    case 'PageBuilderPagebuilderdataEducationRouteLayout':
      console.log("Đã vào case Education Route Layout!", data);
      // Xử lý dữ liệu cho layout Education Route
      return <EducationRoute data={data} />;
    case 'PageBuilderPagebuilderdataEnviromentsLayout':
      console.log("Đã vào case Environment Layout!", data);
      return <Environments data={data} />;
    case 'PageBuilderPagebuilderdataNewEventLayout':
      console.log("Đã vào case New Event Layout!", data);
      return <News data={data} />;
    case 'PageBuilderPagebuilderdataTuitionFeeLayout':
      console.log("Đã vào case Tuition Fee Layout!", data);
      return <Fees data={data} />;
    case 'PageBuilderPagebuilderdataSharePublicLayout':
      console.log("Đã vào case Share layout!", data);
      return <PublicShare data={data} />;
    case 'PageBuilderPagebuilderdataMapLayout':
      console.log("Map: ", data);
      return <Map data={data} />;
    case 'PageBuilderPagebuilderdataProgramEmasiAboutLayout':
      console.log("About: ", data);
      return <EmasiAbout data={data} />
    case 'PageBuilderPagebuilderdataSchoolListLayout':
      console.log('school list: ', data);
      return <SchoolList data={data} />;
    case 'PageBuilderPagebuilderdataValuesLayout':
      console.log('values: ', data);
      return <Values data={data} />;
    case 'PageBuilderPagebuilderdataProgramHocHieuEmasiLayout':
      console.log("hoc hieu: ", data);
      return <HocHieu data={data} />;
    case 'PageBuilderPagebuilderdataProgramAllLayout':
      console.log("pro all: ", data);
      return <AllProgramSection data={data} />;
    case 'PageBuilderPagebuilderdataProgramEducationalAspectsLayout':
      console.log("expect: ", data);
      return <Educational data={data} />;
    case 'PageBuilderPagebuilderdataFeeLayout':
      console.log("fee: ", data);
      return <Fee data={data} />
    case 'PageBuilderPagebuilderdataCareerLayout':
    default:
      console.warn("⚠️ Chưa có component cho layout:", type);
      return null;
  }
};

export default renderComponent;
