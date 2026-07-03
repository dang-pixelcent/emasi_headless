// import Layout from "@/components/common/Layout";
// import SEO from "@/components/common/SEO";
// import renderComponent from "@/lib/renderComponent";
// import React, { useEffect } from "react";
// import { graphql, PageProps } from "gatsby";
// import { Helmet } from "react-helmet";
// import parse from "html-react-parser";
// import Sidebar from "@/components/pages/sections/sidebar";
// import Discover from "@/components/pages/sections/discover_more";
// import { useGlobalTheme } from "@/context/GlobalThemeProvider";
// export const query = graphql`
//   query WpPageQuery($id: String!) {
//     wpCustomPage(id: { eq: $id }) {
//       title
//       uri
//       flexibleContentMain
//       pageBuilder
//       language {
//         code
//       }
//       translations {
//         uri
//         language {
//           code
//         }
//       }
//     }
//   }
// `;
// interface WpPageData {
//   wpCustomPage: {
//     title: string;
//     uri: string;
//     flexibleContentMain: any[];
//     pageBuilder: JSON;
//     getRankMathSEO: string;
//   };
// }
// const WPPage = ({ data, pageContext }: PageProps<WpPageData>) => {
//   const page = data.wpCustomPage;
//   const currentLang = page.language?.code || "null"; 

//   // 2. Xác định ngôn ngữ đích (nếu đang là vi thì đích là en)
//   const targetLang = currentLang === "vi" ? "en" : "vi";

//   // 3. Tìm URI của bản dịch tương ứng
//   const translationNode = page.translations?.find(
//     (t: any) => t.language?.code === targetLang
//   );
//   const switchUri = translationNode ? translationNode.uri : null;
//   console.log("lang hiện tại:", currentLang);
//   // const console.log("=== DEBUG PAGE DATA ===", JSON.stringify(page, null, 2));
//   const { themeOptions } = pageContext;
//   if (!page) return null;
//   if (!themeOptions) return null;

//   console.log("Đây là cục Theme tôi tự gọi:", themeOptions);

//   // console.log("=== DEBUG PAGE DATA ===", JSON.stringify(page, null, 2));
//   // 1. Lấy toàn bộ mảng dữ liệu Page Builder
//   const allBlocks = page?.pageBuilder?.pagebuilderdata || [];

//   // 3. TÁCH RIÊNG KHỐI BANNER RA
//   const bannerBlocks = allBlocks.filter(
//     (b: any) => b.__typename === 'PageBuilderPagebuilderdataBannerLayout'
//   );


//   // 4. Tách riêng khối Sidebar (Cột phải)
//   const sidebarBlock = allBlocks.find(
//     (b: any) => b.__typename === 'PageBuilderPagebuilderdataSidebarLayout'
//   );


//   // TÁCH KHỐI DISCOVER RA
//   const discoverBlock = allBlocks.find(
//     (b: any) => b.__typename === 'PageBuilderPagebuilderdataDiscoveryLayout'
//   );

//   // 5. Các khối còn lại (Content chính - Cột trái)
//   // Loại bỏ cả Banner và Sidebar ra khỏi danh sách khối nội dung chính
//   const contentBlocks = allBlocks.filter(
//     (b: any) =>
//       b.__typename !== 'PageBuilderPagebuilderdataBannerLayout' &&
//       b.__typename !== 'PageBuilderPagebuilderdataSidebarLayout' &&
//       b.__typename !== 'PageBuilderPagebuilderdataDiscoveryLayout'
//   );

//   return (
//     <>
//       <Helmet htmlAttributes={{ lang: "en" }}>{/* SEO codes */}<title>{page.title}</title><link rel="icon" type="image/png" href="/assets/images/fav-icon/favicon.png" /></Helmet>
//       <Layout currentLang={switchUri ? "VIE" : "ENG"} switchUri={switchUri} themeOption={themeOptions}>
//         {/* --- VÙNG 1: BANNER TRÀN VIỀN (Nằm ngoài container) --- */}
//         {bannerBlocks.map((block: any, idx: number) => (
//           <React.Fragment key={`banner-${idx}`}>
//             {renderComponent(block, page)}
//           </React.Fragment>
//         ))}
//         {/* --- VÙNG 2: NỘI DUNG CHIA CỘT --- */}
//         <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
//           <div className="row">
//             {/* CỘT TRÁI: Nội dung chính */}
//             {/* col-12: Mobile chiếm 100% (xếp dọc) | col-lg-8: Desktop chiếm 8/12 phần */}
//             <div className="col-12 col-lg-9 mb-4 mb-lg-0">

//               {/* Render hệ thống cũ (nếu có) */}
//               {Array.isArray(page?.flexibleContentMain) &&
//                 page.flexibleContentMain.map((section: any, index: number) => (
//                   <React.Fragment key={`old-${index}`}>
//                     {renderComponent(section)}
//                   </React.Fragment>
//                 ))}

//               {/* Render các block mới (Đã loại trừ Banner) */}
//               {contentBlocks.map((block: any, idx: number) => (
//                 <React.Fragment key={`content-${idx}`}>
//                   {renderComponent(block, page)}
//                 </React.Fragment>
//               ))}

//             </div>

//             {/* CỘT PHẢI: SIDEBAR */}
//             {/* col-12: Mobile chiếm 100% (rớt xuống dưới) | col-lg-4: Desktop chiếm 4/12 phần */}
//             <div className="col-12 col-lg-3">
//               {/* <Sidebar /> */}
//               <Sidebar data={sidebarBlock} />
//             </div>

//           </div>
//         </div>
//         {/* <Discover /> */}
//         <Discover data={discoverBlock} />
//       </Layout>
//     </>
//   );
// };

// export default WPPage;

import React from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

// Components
import Layout from "@/components/common/Layout";
import renderComponent from "@/lib/renderComponent";
import Sidebar from "@/components/pages/sections/sidebar";
import Discover from "@/components/pages/sections/discover_more";
// import SEO from "@/components/common/SEO"; 
// import parse from "html-react-parser"; 
interface WpPageData {
  wpCustomPage: {
    title: string;
    uri: string;
    flexibleContentMain: any[];
    pageBuilder: {
      pagebuilderdata: any[];
    };
    language: {
      code: string;
    } | null;
    translations: {
      uri: string;
      language: {
        code: string;
      };
    }[] | null;
  };
}

// =============================
// COMPONENT
// =============================
const WPPage = ({ data, pageContext }: PageProps<WpPageData>) => {
  const page = data.wpCustomPage;
  const { themeOptions } = pageContext as any;
  const currentLang = page.language?.code?.toLowerCase() || 'vi';

  // 2. Xác định ngôn ngữ đích
  const targetLang = currentLang === 'vi' ? 'en' : 'vi';

  // 3. Tìm URI của bản dịch tương ứng trong mảng translations
  const translationNode = page.translations?.find(
    (t) => t.language?.code?.toLowerCase() === targetLang
  );

  const switchUri = translationNode?.uri || null;

  // 4. In log kiểm tra
  console.log("=== DEBUG NGÔN NGỮ ===");
  console.log("Ngôn ngữ hiện tại:", currentLang);
  console.log("Ngôn ngữ đích:", targetLang);
  console.log("URI chuyển đổi:", switchUri);
  console.log("Mảng translations thô:", page.translations);
  if (!page || !themeOptions) return null;
  // --- 2. XỬ LÝ DỮ LIỆU PAGE BUILDER ---
  const allBlocks = page.pageBuilder?.pagebuilderdata || [];

  const bannerBlocks = allBlocks.filter(
    (b: any) => b.__typename === 'PageBuilderPagebuilderdataBannerLayout'
  );

  const sidebarBlock = allBlocks.find(
    (b: any) => b.__typename === 'PageBuilderPagebuilderdataSidebarLayout'
  );

  const discoverBlock = allBlocks.find(
    (b: any) => b.__typename === 'PageBuilderPagebuilderdataDiscoveryLayout'
  );

  const contentBlocks = allBlocks.filter(
    (b: any) =>
      b.__typename !== 'PageBuilderPagebuilderdataBannerLayout' &&
      b.__typename !== 'PageBuilderPagebuilderdataSidebarLayout' &&
      b.__typename !== 'PageBuilderPagebuilderdataDiscoveryLayout'
  );

  // --- 3. RENDER ---
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{page.title}</title>
        <link rel="icon" type="image/png" href="/assets/images/fav-icon/favicon.png" />
      </Helmet>

      <Layout
        currentLang={currentLang}
        switchUri={switchUri}
        themeOption={themeOptions}
      >
        {/* VÙNG 1: BANNER TRÀN VIỀN */}
        {bannerBlocks.map((block: any, idx: number) => (
          <React.Fragment key={`banner-${idx}`}>
            {renderComponent(block, page)}
          </React.Fragment>
        ))}

        {/* VÙNG 2: NỘI DUNG CHIA CỘT */}
        <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <div className="row">

            {/* CỘT TRÁI: Nội dung chính */}
            <div className="col-12 col-lg-9 mb-4 mb-lg-0">
              {Array.isArray(page.flexibleContentMain) &&
                page.flexibleContentMain.map((section: any, index: number) => (
                  <React.Fragment key={`old-${index}`}>
                    {renderComponent(section)}
                  </React.Fragment>
                ))}

              {contentBlocks.map((block: any, idx: number) => (
                <React.Fragment key={`content-${idx}`}>
                  {renderComponent(block, page)}
                </React.Fragment>
              ))}
            </div>

            {/* CỘT PHẢI: SIDEBAR */}
            <div className="col-12 col-lg-3">
              <Sidebar data={sidebarBlock} />
            </div>

          </div>
        </div>

        {/* VÙNG 3: DISCOVER MORE */}
        <Discover data={discoverBlock} />
      </Layout>
    </>
  );
};

export default WPPage;

// =============================
// GRAPHQL QUERY
// =============================
export const query = graphql`
  query WpPageQuery($id: String!) {
    wpCustomPage(id: { eq: $id }) {
      title
      uri
      flexibleContentMain
      pageBuilder
      language {
        code
      }
      translations {
        uri
        language {
          code
        }
      }
    }
  }
`;