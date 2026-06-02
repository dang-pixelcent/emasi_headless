import Layout from "@/components/common/Layout";
import SEO from "@/components/common/SEO";
import renderComponent from "@/lib/renderComponent";
import React from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

// GraphQL Query - Chỉ lấy fields cần thiết
export const query = graphql`
  query WpPageQuery($id: String!, $themeOptionsId: String!) {
    wpCustomPage(id: { eq: $id }) {
      title
      uri
      flexibleContentMain
      getRankMathSEO
    }
    wpThemeOptions(id: { eq: $themeOptionsId }) {
      headerGroup
      footerGroup
      headerFooterTracking
    }
  }
`;

interface WpPageData {
  wpCustomPage: {
    title: string;
    uri: string;
    flexibleContentMain: any[];
    getRankMathSEO: string;
  };
  wpThemeOptions: {
    headerGroup: any;
    footerGroup: any;
    headerFooterTracking: any;
  };
}

const WPPage = ({ data }: PageProps<WpPageData>) => {
  const page = data.wpCustomPage;
  const themeOptions = data.wpThemeOptions;
  console.log("page data", page);

  if (!page) {
    console.warn("No page content found");
    return null;
  }

  // Separate JSON-LD scripts from other SEO tags so react-helmet can render both
  const seoHtml = page?.getRankMathSEO || "";
  const scriptRegex =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const jsonLdScripts: string[] = [];
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(seoHtml)) !== null) {
    jsonLdScripts.push(scriptMatch[1]);
  }
  const seoWithoutScripts = seoHtml.replace(scriptRegex, "");

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      >
        {parse(seoWithoutScripts)}
        {jsonLdScripts.map((json, i) => (
          <script key={`ld-${i}`} type="application/ld+json">
            {json}
          </script>
        ))}
      </Helmet>
      <Layout themeOption={themeOptions}>
        {Array.isArray(page?.flexibleContentMain)
          ? page.flexibleContentMain.map((section: any, index: number) => (
              <React.Fragment key={index}>
                {renderComponent(section)}
              </React.Fragment>
            ))
          : null}
      </Layout>
    </>
  );
};
export default WPPage;

// export const Head = ({ data }: PageProps<WpPageData>) => {
//   const page = data.wpCustomPage;
//   return <SEO metaHtml={page?.getRankMathSEO} />;
// };
