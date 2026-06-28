// import Layout from "@/components/common/Layout";
// import SEO from "@/components/common/SEO";
// import renderComponent from "@/lib/renderComponent";
// import React from "react";
// import { graphql, PageProps } from "gatsby";
// import { Helmet } from "react-helmet";
// import parse from "html-react-parser";

// // GraphQL Query - Dùng đúng tên Type từ GraphiQL
// export const query = graphql`
//   query WpPageQuery($id: String!, $themeOptionsId: String!) {
//     wpCustomPage(id: { eq: $id }) {
//       title
//       uri
//       flexibleContentMain
//       pageBuilder {
//         pagebuilderdata {
//           __typename
//           ... on PageBuilderPagebuilderdataContentEditorLayout {
//             articleBlocks {
//               __typename
//               ... on PageBuilderPagebuilderdataArticleBlocksTextContentLayout {
//                 textContent
//               }
//             }
//           }
//         }
//       }
//       getRankMathSEO
//     }
//     wpThemeOptions(id: { eq: $themeOptionsId }) {
//       headerGroup
//       footerGroup
//       headerFooterTracking
//     }
//   }
// `;

// interface WpPageData {
//   wpCustomPage: {
//     title: string;
//     uri: string;
//     flexibleContentMain: any[];
//     pageBuilder: {
//       pagebuilderdata: any[];
//     };
//     getRankMathSEO: string;
//   };
//   wpThemeOptions: {
//     headerGroup: any;
//     footerGroup: any;
//     headerFooterTracking: any;
//   };
// }

// const WPPage = ({ data }: PageProps<WpPageData>) => {
//   const page = data.wpCustomPage;
//   const themeOptions = data.wpThemeOptions;
//   console.log("page data", page);

//   if (!page) {
//     console.warn("No page content found");
//     return null;
//   }

//   const seoHtml = page?.getRankMathSEO || "";
//   const scriptRegex =
//     /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
//   const jsonLdScripts: string[] = [];
//   let scriptMatch;
//   while ((scriptMatch = scriptRegex.exec(seoHtml)) !== null) {
//     jsonLdScripts.push(scriptMatch[1]);
//   }
//   const seoWithoutScripts = seoHtml.replace(scriptRegex, "");

//   return (
//     <>
//       <Helmet htmlAttributes={{ lang: "en" }}>
//         {parse(seoWithoutScripts)}
//         {jsonLdScripts.map((json, i) => (
//           <script key={`ld-${i}`} type="application/ld+json">
//             {json}
//           </script>
//         ))}
//       </Helmet>

//       <Layout themeOption={themeOptions}>

//         {/* HỆ THỐNG CŨ (CẦN GIỮ LẠI CHO CÁC TRANG CHƯA LÀM) */}
//         {Array.isArray(page?.flexibleContentMain) &&
//           page.flexibleContentMain.map((section: any, index: number) => (
//             <React.Fragment key={`old-${index}`}>
//               {renderComponent(section)}
//             </React.Fragment>
//           ))}

//         {/* HỆ THỐNG MỚI: PAGE BUILDER */}
//         {page?.pageBuilder?.pagebuilderdata?.map((data: any, idx: number) => (
//           <React.Fragment key={`new-${idx}`}>

//             {/* KIỂM TRA ĐÚNG TYPE CONTENT EDITOR */}
//             {data.__typename === 'PageBuilderPagebuilderdataContentEditorLayout' && 
//              data.articleBlocks && 
//              data.articleBlocks.map((block: any, i: number) => (

//                /* KIỂM TRA ĐÚNG TYPE TEXT CONTENT */
//                block.__typename === 'PageBuilderPagebuilderdataArticleBlocksTextContentLayout' ? (
//                  <div 
//                    key={i} 
//                    className="wp-content-wrapper p-8" // class mẫu
//                    dangerouslySetInnerHTML={{ __html: block.textContent }} 
//                  />
//                ) : null

//             ))}

//           </React.Fragment>
//         ))}

//       </Layout>
//     </>
//   );
// };
// export default WPPage;
import Layout from "@/components/common/Layout";
import SEO from "@/components/common/SEO";
import renderComponent from "@/lib/renderComponent";
import React, { useEffect } from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import Sidebar from "@/components/pages/sections/sidebar";
import Discover from "@/components/pages/sections/discover_more";
import { useStoreContext } from "@/context/StoreContext";
// GraphQL Query - Lấy thẳng trường dữ liệu, bỏ các type (... on) của WPGraphQL
export const query = graphql`
  query WpPageQuery($id: String!) {
    wpCustomPage(id: { eq: $id }) {
      title
      uri
      flexibleContentMain
      pageBuilder
    }
  }
`;

interface WpPageData {
  wpCustomPage: {
    title: string;
    uri: string;
    flexibleContentMain: any[];
    pageBuilder: JSON;
    getRankMathSEO: string;
  };
  wpThemeOptions: {
    headerGroup: any;
    footerGroup: any;
    headerFooterTracking: any;
  };
}

// const WPPage = ({ data }: PageProps<WpPageData>) => {
//   const page = data.wpCustomPage;
//   // const themeOptions = data.wpThemeOptions;
//   console.log("page data", page);


//   // 2. Kiểm tra dữ liệu data
//   console.log("🔥 Data từ GraphQL:", data);

//   if (!page) {
//     console.warn("No page content found");
//     return null;
//   }

//   const seoHtml = page?.getRankMathSEO || "";
//   const scriptRegex =
//     /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
//   const jsonLdScripts: string[] = [];
//   let scriptMatch;
//   while ((scriptMatch = scriptRegex.exec(seoHtml)) !== null) {
//     jsonLdScripts.push(scriptMatch[1]);
//   }
//   const seoWithoutScripts = seoHtml.replace(scriptRegex, "");

//   return (
//     <>
//       <Helmet htmlAttributes={{ lang: "en" }}>
//         {parse(seoWithoutScripts)}
//         {jsonLdScripts.map((json, i) => (
//           <script key={`ld-${i}`} type="application/ld+json">
//             {json}
//           </script>
//         ))}
//       </Helmet>

//       <Layout >
//         {/* {page?.pageBuilder?.pagebuilderdata?.map((sectionData: any, idx: number) => (
//           <React.Fragment key={`builder-${idx}`}>

//             {renderComponent(sectionData, page)}
//           </React.Fragment>
//         ))} */}
//         <div style={{ display: 'flex', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>

//           {/* CỘT NỘI DUNG CHÍNH (Chiếm tỉ lệ lớn) */}
//           <div style={{ flex: 1 }}>
//             {/* Render Page Builder Content */}
//             {page?.pageBuilder?.pagebuilderdata?.map((sectionData: any, idx: number) => (
//               <React.Fragment key={`builder-${idx}`}>
//                 {renderComponent(sectionData, page)}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* CỘT SIDEBAR (Fix cứng bên phải) */}
//           <div style={{ width: '300px', flexShrink: 0 }}>
//             <Sidebar />
//           </div>

//         </div>
//       </Layout>
//     </>
//   );
// };
const WPPage = ({ data }: PageProps<WpPageData>) => {
  const page = data.wpCustomPage;
  const { currentPage, setCurrentPage } = useStoreContext();
  useEffect(() => {
  }, []);

  if (!page) return null;

  // 1. Lấy toàn bộ mảng dữ liệu Page Builder
  const allBlocks = page?.pageBuilder?.pagebuilderdata || [];

  // 2. TÁCH RIÊNG KHỐI BANNER RA
  const bannerBlocks = allBlocks.filter(
    (b: any) => b.__typename === 'PageBuilderPagebuilderdataBannerLayout'

  );

  // 3. Tách riêng khối Sidebar (Cột phải)
  const sidebarBlock = allBlocks.find(
    (b: any) => b.__typename === 'PageBuilderPagebuilderdataSidebarLayout'
  );
  // TÁCH KHỐI DISCOVER RA
  const discoverBlock = allBlocks.find(
    (b: any) => b.__typename === 'PageBuilderPagebuilderdataDiscoveryLayout'
  );

  // 4. Các khối còn lại (Content chính - Cột trái)
  // Loại bỏ cả Banner và Sidebar ra khỏi danh sách khối nội dung chính
  const contentBlocks = allBlocks.filter(
    (b: any) =>
      b.__typename !== 'PageBuilderPagebuilderdataBannerLayout' &&
      b.__typename !== 'PageBuilderPagebuilderdataSidebarLayout' &&
      b.__typename !== 'PageBuilderPagebuilderdataDiscoveryLayout'
  );

  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>{/* SEO codes */}<title>{page.title}</title><link rel="icon" type="image/png" href="/assets/images/fav-icon/favicon.png" /></Helmet>
      <Layout>
        {/* --- VÙNG 1: BANNER TRÀN VIỀN (Nằm ngoài container) --- */}
        {bannerBlocks.map((block: any, idx: number) => (
          <React.Fragment key={`banner-${idx}`}>
            {renderComponent(block, page)}
          </React.Fragment>
        ))}
        {/* --- VÙNG 2: NỘI DUNG CHIA CỘT --- */}
        <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <div className="row">
            {/* CỘT TRÁI: Nội dung chính */}
            {/* col-12: Mobile chiếm 100% (xếp dọc) | col-lg-8: Desktop chiếm 8/12 phần */}
            <div className="col-12 col-lg-9 mb-4 mb-lg-0">

              {/* Render hệ thống cũ (nếu có) */}
              {Array.isArray(page?.flexibleContentMain) &&
                page.flexibleContentMain.map((section: any, index: number) => (
                  <React.Fragment key={`old-${index}`}>
                    {renderComponent(section)}
                  </React.Fragment>
                ))}

              {/* Render các block mới (Đã loại trừ Banner) */}
              {contentBlocks.map((block: any, idx: number) => (
                <React.Fragment key={`content-${idx}`}>
                  {renderComponent(block, page)}
                </React.Fragment>
              ))}

            </div>

            {/* CỘT PHẢI: SIDEBAR */}
            {/* col-12: Mobile chiếm 100% (rớt xuống dưới) | col-lg-4: Desktop chiếm 4/12 phần */}
            <div className="col-12 col-lg-3">
              {/* <Sidebar /> */}
              <Sidebar data={sidebarBlock} />
            </div>

          </div>
        </div>
        {/* <Discover /> */}
        <Discover data={discoverBlock} />
      </Layout>
    </>
  );
};

export default WPPage;