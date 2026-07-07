// import React from "react";
// import { graphql, PageProps } from "gatsby";
// import { Helmet } from "react-helmet";

// // Components
// import Layout from "@/components/common/Layout";
// import renderComponent from "@/lib/renderComponent";
// import Sidebar from "@/components/pages/sections/sidebar";
// import Discover from "@/components/pages/sections/discover_more";
// // import TourRegistrationForm from "@/components/common/TourRegistrationForm"; // <-- Import component Form đăng ký tham quan của bạn vào đây

// interface WpPageData {
//   wpCustomPage: {
//     title: string;
//     uri: string;
//     flexibleContentMain: any[];
//     pageBuilder: {
//       pagebuilderdata: any[];
//     };
//     language: {
//       code: string;
//     } | null;
//     translations: {
//       uri: string;
//       language: {
//         code: string;
//       };
//     }[] | null;
//   };
// }

// // =============================
// // COMPONENT
// // =============================
// const WPPage = ({ data, pageContext }: PageProps<WpPageData>) => {
//   const page = data.wpCustomPage;
//   const { themeOptions } = pageContext as any;
//   const currentLang = page.language?.code?.toLowerCase() || 'vi';

//   // Xác định ngôn ngữ chuyển đổi
//   const targetLang = currentLang === 'vi' ? 'en' : 'vi';
//   const translationNode = page.translations?.find(
//     (t) => t.language?.code?.toLowerCase() === targetLang
//   );
//   const switchUri = translationNode?.uri || null;

//   if (!page || !themeOptions) return null;

//   // --- 1. PHÂN LOẠI CÁC KHỐI DỮ LIỆU PAGE BUILDER ---
//   const allBlocks = page.pageBuilder?.pagebuilderdata || [];

//   const bannerBlocks = allBlocks.filter(
//     (b: any) => b.__typename === 'PageBuilderPagebuilderdataBannerLayout'
//   );

//   const sidebarBlock = allBlocks.find(
//     (b: any) => b.__typename === 'PageBuilderPagebuilderdataSidebarLayout'
//   );

//   const discoverBlock = allBlocks.find(
//     (b: any) => b.__typename === 'PageBuilderPagebuilderdataDiscoveryLayout'
//   );

//   // Lọc lấy các khối nội dung chính (Loại bỏ Banner, Sidebar, Discover ra khỏi luồng nội dung)
//   const contentBlocks = allBlocks.filter(
//     (b: any) =>
//       b.__typename !== 'PageBuilderPagebuilderdataBannerLayout' &&
//       b.__typename !== 'PageBuilderPagebuilderdataSidebarLayout' &&
//       b.__typename !== 'PageBuilderPagebuilderdataDiscoveryLayout'
//   );

//   // Kiểm tra xem trang này CÓ SIDEBAR hay không (chỉ cần có block và có dữ liệu list bên trong)
//   const hasSidebar = Boolean(sidebarBlock && sidebarBlock?.list?.length > 0);
//   console.log("Page data:", JSON.stringify(page, null, 2));
//   console.log("sidebarBlock:", sidebarBlock);
//   console.log("hasSidebar:", hasSidebar);
//   // --- 2. RENDER GIAO DIỆN ---
//   return (
//     <>
//       <Helmet htmlAttributes={{ lang: currentLang }}>
//         <title>{page.title}</title>
//         <link rel="icon" type="image/png" href="/assets/images/fav-icon/favicon.png" />
//       </Helmet>

//       <Layout
//         currentLang={currentLang}
//         switchUri={switchUri}
//         themeOption={themeOptions}
//       >
//         {/* VÙNG 1: BANNER TRÀN VIỀN (Luôn ở trên cùng) */}
//         {bannerBlocks.map((block: any, idx: number) => (
//           <React.Fragment key={`banner-${idx}`}>
//             {renderComponent(block, page)}
//           </React.Fragment>
//         ))}

//         {/* VÙNG 2: NỘI DUNG CHÍNH & SIDEBAR (Tự động co giãn theo điều kiện hasSidebar) */}
//         <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
//           <div className="row">

//             {/* CỘT TRÁI (Nội dung chính): 
//                 - Nếu CÓ sidebar -> Chiếm 9 phần (col-lg-9)
//                 - Nếu KHÔNG CÓ sidebar -> Chiếm trọn 12 phần (col-12) chạy dài 1 hàng dọc */}
//             <div className={hasSidebar ? "col-12 col-lg-9 mb-4 mb-lg-0" : "col-12"}>

//               {/* Render hệ thống cũ flexibleContentMain (nếu có) */}
//               {Array.isArray(page.flexibleContentMain) &&
//                 page.flexibleContentMain.map((section: any, index: number) => (
//                   <React.Fragment key={`old-${index}`}>
//                     {renderComponent(section)}
//                   </React.Fragment>
//                 ))}

//               {/* Render danh sách các block nội dung mới */}
//               {contentBlocks.map((block: any, idx: number) => (
//                 <React.Fragment key={`content-${idx}`}>
//                   {renderComponent(block, page)}
//                 </React.Fragment>
//               ))}
//             </div>

//             {/* CỘT PHẢI (Sidebar): CHỈ HIỂN THỊ KHI CÓ DỮ LIỆU SIDEBAR */}
//             {hasSidebar && (
//               <div className="col-12 col-lg-3">
//                 <Sidebar data={sidebarBlock} />
//               </div>
//             )}

//           </div>
//         </div>

//         {/* VÙNG 3: DISCOVER MORE (Chỉ render khi trong CMS có tạo block này) */}
//         {discoverBlock && <Discover data={discoverBlock} />}

//         {/* VÙNG 4: FORM ĐĂNG KÝ THAM QUAN (Luôn nằm ở dưới cùng, trước Footer của Layout) */}
//         {/* <TourRegistrationForm /> */}

//       </Layout>
//     </>
//   );
// };

// export default WPPage;

// // =============================
// // GRAPHQL QUERY
// // =============================
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
import React from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

// Components
import Layout from "@/components/common/Layout";
import renderComponent from "@/lib/renderComponent";
import Sidebar from "@/components/pages/sections/sidebar";
import Discover from "@/components/pages/sections/discover_more";
// import TourRegistrationForm from "@/components/common/TourRegistrationForm"; // <-- Import component Form đăng ký tham quan của bạn vào đây

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

  // Xác định ngôn ngữ chuyển đổi
  const targetLang = currentLang === 'vi' ? 'en' : 'vi';
  const translationNode = page.translations?.find(
    (t) => t.language?.code?.toLowerCase() === targetLang
  );
  const switchUri = translationNode?.uri || null;

  if (!page || !themeOptions) return null;

  // --- 1. PHÂN LOẠI CÁC KHỐI DỮ LIỆU PAGE BUILDER ---
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

  // Lọc lấy các khối nội dung chính (Loại bỏ Banner, Sidebar, Discover ra khỏi luồng nội dung)
  const contentBlocks = allBlocks.filter(
    (b: any) =>
      b.__typename !== 'PageBuilderPagebuilderdataBannerLayout' &&
      b.__typename !== 'PageBuilderPagebuilderdataSidebarLayout' &&
      b.__typename !== 'PageBuilderPagebuilderdataDiscoveryLayout'
  );

  // Kiểm tra xem trang này CÓ SIDEBAR hay không (chỉ cần có block và có dữ liệu list bên trong)
  const hasSidebar = Boolean(sidebarBlock && sidebarBlock?.list?.length > 0);
  console.log("Page data:", JSON.stringify(page, null, 2));
  console.log("sidebarBlock:", sidebarBlock);
  console.log("hasSidebar:", hasSidebar);
  // --- 2. RENDER GIAO DIỆN ---
  return (
    <>
      <Helmet htmlAttributes={{ lang: currentLang }}>
        <title>{page.title}</title>
        <link rel="icon" type="image/png" href="/assets/images/fav-icon/favicon.png" />
      </Helmet>

      <Layout
        currentLang={currentLang}
        switchUri={switchUri}
        themeOption={themeOptions}
      >
        {/* VÙNG 1: BANNER TRÀN VIỀN (Luôn ở trên cùng) */}
        {bannerBlocks.map((block: any, idx: number) => (
          <React.Fragment key={`banner-${idx}`}>
            {renderComponent(block, page)}
          </React.Fragment>
        ))}

        {/* <div className={hasSidebar ? "container" : "container-fluid"} style={{ marginTop: '50px', marginBottom: '50px' }}>
          <div className="row">
            <div className={hasSidebar ? "col-12 col-lg-9 mb-4 mb-lg-0" : "col-12"}>

              {Array.isArray(page.flexibleContentMain) &&
                page.flexibleContentMain.map((section: any, index: number) => (
                  <React.Fragment key={`old-${index}`}>
                    {renderComponent(section, page)}
                  </React.Fragment>
                ))}

              {contentBlocks.map((block: any, idx: number) => (
                <React.Fragment key={`content-${idx}`}>
                  {renderComponent(block, page)}
                </React.Fragment>
              ))}
            </div>

            {hasSidebar && (
              <div className="col-12 col-lg-3">
                <Sidebar data={sidebarBlock} />
              </div>
            )}

          </div>
        </div> */}
        {/* VÙNG 2: NỘI DUNG CHÍNH & SIDEBAR */}
        {hasSidebar ? (
          /* TRƯỜNG HỢP 1: CÓ SIDEBAR -> Dùng Container & Row để chia cột 9 - 3 */
          <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
            <div className="row">
              <div className="col-12 col-lg-9 mb-4 mb-lg-0">
                {Array.isArray(page.flexibleContentMain) &&
                  page.flexibleContentMain.map((section: any, index: number) => (
                    <React.Fragment key={`old-${index}`}>
                      {renderComponent(section, page)}
                    </React.Fragment>
                  ))}

                {contentBlocks.map((block: any, idx: number) => (
                  <React.Fragment key={`content-${idx}`}>
                    {renderComponent(block, page)}
                  </React.Fragment>
                ))}
              </div>

              <div className="col-12 col-lg-3">
                <Sidebar data={sidebarBlock} />
              </div>
            </div>
          </div>
        ) : (
          /* TRƯỜNG HỢP 2: KHÔNG CÓ SIDEBAR -> Render trực tiếp các Section ra ngoài */
          /* Bỏ hoàn toàn container-fluid, row, col-12 và khoảng trống 50px ép buộc */
          <div className="main-sections-wrapper">
            {Array.isArray(page.flexibleContentMain) &&
              page.flexibleContentMain.map((section: any, index: number) => (
                <React.Fragment key={`old-${index}`}>
                  {renderComponent(section, page)}
                </React.Fragment>
              ))}

            {contentBlocks.map((block: any, idx: number) => (
              <React.Fragment key={`content-${idx}`}>
                {renderComponent(block, page)}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* VÙNG 3: DISCOVER MORE (Chỉ render khi trong CMS có tạo block này) */}
        {discoverBlock && <Discover data={discoverBlock} />}

        {/* VÙNG 4: FORM ĐĂNG KÝ THAM QUAN (Luôn nằm ở dưới cùng, trước Footer của Layout) */}
        {/* <TourRegistrationForm /> */}

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