import path from "path";

// 1. CẤU HÌNH API
export const API_CONFIG = {
  MAIN_SITE: {
    url: process.env.GATSBY_WPGRAPHQL_URL || "",
  },
  GEO_SITE: {
    url: process.env.GATSBY_WPGRAPHQL_URL_2 || "",
    enabled: process.env.ENABLE_GEOSITE === "true",
  },
  MAIN_SITE_URL: process.env.GATSBY_MAIN_SITE_URL,
};

// 2. ĐƯỜNG DẪN TEMPLATE
export const TEMPLATES = {
  PAGE: path.resolve("./src/templates/wp-page.tsx"),
  POST: path.resolve("./src/templates/wp-post.tsx"),
  GEO_POST: path.resolve("./src/templates/wp-post-geo.tsx"),
  PREVIEW: path.resolve("./src/templates/wp-preview.tsx"),
};

// 3. CẤU HÌNH POST TYPES CHO MAIN SITE
export const CONTENT_TYPES_CONFIG = [
  {
    typeLabel: "POST",
    graphqlTypes: ["POST"],
    urlPrefix: "blog",
    template: TEMPLATES.POST,
    fragment: `
      ... on Post {
        title
        flexibleContentMain
        getRankMathSEO
      }
    `,
  },
  {
    typeLabel: "SERVICE",
    graphqlTypes: ["SERVICES"],
    urlPrefix: "services",
    template: TEMPLATES.POST,
    fragment: `
        ... on Services {
          title
          flexibleContentMain
          getRankMathSEO
        }
      `,
  },
  {
    typeLabel: "TEAM",
    graphqlTypes: ["TEAM"],
    urlPrefix: "teams",
    template: TEMPLATES.POST,
    fragment: `
      ... on Team {
        title
        flexibleContentMain
        getRankMathSEO
      }
    `,
  },
];

// 4. CẤU HÌNH CHO GEO SITE
export const GEO_TYPES_CONFIG = [
  {
    typeLabel: "LOCATION",
    graphqlTypes: ["SERVICE_AREA", "LOCATION_AREA"],
    urlPrefix: "locations", // Force prefix
    template: TEMPLATES.GEO_POST,
    fragment: `
      ... on ServicesArea {
        title
        flexibleContentMain
      }
      ... on LocationsArea {
        title
        flexibleContentMain
      }
    `,
  },
];
