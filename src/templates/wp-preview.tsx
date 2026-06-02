import React, { useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";

import PostService from "@/services/postService";
import { navigate } from "gatsby";
import Layout from "@/components/common/Layout";
import renderComponent from "@/lib/renderComponent";

const IndexPage = ({
  location,
  pageContext,
}: {
  location: any;
  pageContext: any;
}) => {
  // Query theme options at build time (static)
  const staticData = useStaticQuery(graphql`
    query PreviewThemeOptionsQuery {
      mainTheme: wpThemeOptions(siteId: { eq: "main" }) {
        headerGroup
        footerGroup
        headerFooterTracking
      }
      geoTheme: wpThemeOptions(siteId: { eq: "geo" }) {
        headerGroup
        footerGroup
        headerFooterTracking
      }
    }
  `);

  // Determine which theme to use based on page type
  const isGeoPreview = pageContext?.type === "preview-geo";
  const themeOptions = isGeoPreview
    ? staticData.geoTheme
    : staticData.mainTheme;

  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const id =
      searchParams.get("preview_id") ||
      searchParams.get("p") ||
      searchParams.get("id");

    const rawType =
      searchParams.get("typeName") || searchParams.get("type") || "post";

    const toCamelCase = (str: string): string => {
      return str.charAt(0).toLowerCase() + str.slice(1);
    };

    if (!id) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        let graphqlType = "post";

        switch (rawType) {
          case "Page":
            graphqlType = "page";
            break;
          case "Post":
            graphqlType = "post";
            break;
          case "Services":
            graphqlType = "services";
            break;
          default:
            graphqlType = toCamelCase(rawType);
        }

        console.log(`Fetching Preview: ID=${id}, Type=${graphqlType}`);

        const response = await PostService.getPreviewById(id, graphqlType);
        const postData = response?.data?.[graphqlType];

        if (postData) {
          setData(postData);
        } else {
          console.error("Không tìm thấy data trong response", response);
        }
      } catch (error: any) {
        console.error("Error fetching preview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const flexibleContentMain = React.useMemo(() => {
    const rawContent = data?.flexibleContentMain;

    if (!rawContent) return [];

    if (typeof rawContent === "object") {
      return Array.isArray(rawContent) ? rawContent : [rawContent];
    }

    if (typeof rawContent === "string") {
      try {
        return JSON.parse(rawContent);
      } catch {
        return [];
      }
    }

    return [];
  }, [data]);

  return (
    <Layout themeOption={themeOptions}>
      {loading && (
        <div style={{ textAlign: "center", padding: "150px 0" }}>
          <p style={{ fontSize: "24px", color: "#666" }}>
            Loading preview...
            <br />
            <small style={{ fontSize: "14px" }}>
              Loading draft from WordPress
            </small>
          </p>
        </div>
      )}

      {!loading && !data && (
        <div style={{ textAlign: "center", padding: "100px 0", color: "red" }}>
          <h2>Could not load Preview data</h2>
          <p>Please check the post ID or access permissions.</p>
        </div>
      )}

      {!loading &&
        data &&
        flexibleContentMain?.map((section: any, index: number) => (
          <React.Fragment key={index}>
            {renderComponent(section)}
          </React.Fragment>
        ))}
    </Layout>
  );
};

export default IndexPage;
