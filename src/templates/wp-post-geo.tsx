// src/templates/wp-post-geo.tsx
import React from "react";
import { graphql, PageProps } from "gatsby";

import { GEO_PAGE_COMPONENT } from "../types/general";
import Layout from "@/components/common/Layout";
import renderComponentGeo from "@/lib/renderComponentGeo";
import SEO from "@/components/common/SEO";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";

// GraphQL Query - Lấy Geo Location và Theme Options
export const query = graphql`
  query WpGeoLocationQuery($id: String!, $themeOptionsId: String!) {
    wpGeoLocation(id: { eq: $id }) {
      title
      uri
      slug
      flexibleContentMain
      getRankMathSEO
      isGeosite
      customPath
    }
    wpThemeOptions(id: { eq: $themeOptionsId }) {
      headerGroup
      footerGroup
      headerFooterTracking
    }
  }
`;

interface WpGeoLocationData {
  wpGeoLocation: {
    title: string;
    uri: string;
    slug: string;
    flexibleContentMain: any[];
    getRankMathSEO: string;
    isGeosite: boolean;
    customPath: string;
  };
  wpThemeOptions: {
    headerGroup: any;
    footerGroup: any;
    headerFooterTracking: any;
  };
}

const GeoPostTemplate = ({ data }: PageProps<WpGeoLocationData>) => {
  const post = data.wpGeoLocation;
  const themeOptions = data.wpThemeOptions;

  if (!post) {
    console.warn("No geo location content found");
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
        {Array.isArray(post.flexibleContentMain)
          ? post.flexibleContentMain.map((section: any, index: number) => (
              <React.Fragment key={index}>
                {renderComponentGeo(section)}
              </React.Fragment>
            ))
          : null}
      </Layout>
    </>
  );
};

// export const Head = ({ data }: PageProps<WpGeoLocationData>) => {
//   const post = data.wpGeoLocation;
//   return <SEO metaHtml={post?.getRankMathSEO} />;
// };

export default GeoPostTemplate;
