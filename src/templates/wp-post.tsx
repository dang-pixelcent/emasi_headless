import React from "react";
import { graphql, PageProps } from "gatsby";
import SEO from "@/components/common/SEO";
import renderComponent from "@/lib/renderComponent";
import Layout from "@/components/common/Layout";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
// GraphQL Query - Query nhiều node types, chỉ 1 cái sẽ có data
export const query = graphql`
  query WpPostQuery($id: String!, $themeOptionsId: String!) {
    # Post
    wpCustomPost(id: { eq: $id }) {
      title
      uri
      flexibleContentMain
      getRankMathSEO
    }
    # Service
    wpCustomService(id: { eq: $id }) {
      title
      uri
      flexibleContentMain
      getRankMathSEO
    }
    # Team
    wpCustomTeam(id: { eq: $id }) {
      title
      uri
      flexibleContentMain
      getRankMathSEO
    }
    # Theme Options
    wpThemeOptions(id: { eq: $themeOptionsId }) {
      headerGroup
      footerGroup
      headerFooterTracking
    }
  }
`;

interface ContentNode {
  title: string;
  uri: string;
  flexibleContentMain: any[];
  getRankMathSEO: string;
}

interface WpPostData {
  wpCustomPost: ContentNode | null;
  wpCustomService: ContentNode | null;
  wpCustomTeam: ContentNode | null;
  wpThemeOptions: {
    headerGroup: any;
    footerGroup: any;
    headerFooterTracking: any;
  };
}

const IndexPage = ({ data }: PageProps<WpPostData>) => {
  // Lấy node đầu tiên có data (chỉ 1 trong 3 sẽ có)
  const post = data.wpCustomPost || data.wpCustomService || data.wpCustomTeam;
  const themeOptions = data.wpThemeOptions;
  console.log("post data", post);
  console.log("seo data", post?.getRankMathSEO);

  if (!post) {
    console.warn("No content found for this page");
    return null;
  }

  // Separate JSON-LD scripts from other SEO tags so react-helmet can render both
  const seoHtml = post?.getRankMathSEO || "";
  const scriptRegex =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const jsonLdScripts: string[] = [];
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(seoHtml)) !== null) {
    jsonLdScripts.push(scriptMatch[1]);
  }
  const seoWithoutScripts = seoHtml.replace(scriptRegex, "");

  const relatedServiceSingle = Array.isArray(post?.flexibleContentMain)
    ? post.flexibleContentMain.find(
        (item: any) => item.acf_fc_layout === "related_services_single",
      )
    : null;

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
        {Array.isArray(post?.flexibleContentMain)
          ? post.flexibleContentMain
              .map((item: any) =>
                item.acf_fc_layout === "content_wrap"
                  ? {
                      ...item,
                      related_service_single: relatedServiceSingle,
                    }
                  : item,
              )
              .map((section: any, index: number) => (
                <React.Fragment key={index}>
                  {renderComponent(section)}
                </React.Fragment>
              ))
          : null}
      </Layout>
    </>
  );
};
export default IndexPage;

// export const Head = ({ data }: PageProps<WpPostData>) => {
//   const post = data.wpCustomPost || data.wpCustomService || data.wpCustomTeam;
//   return <SEO metaHtml={post?.getRankMathSEO} />;
// };
