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

export const TEMPLATES = {
  PAGE: path.resolve("./src/templates/wp-page.tsx"),
  POST: path.resolve("./src/templates/wp-post.tsx"),
};

// 3. CẤU HÌNH POST TYPES CHO MAIN SITE
export const CONTENT_TYPES_CONFIG = [
  {
    typeLabel: "POST",
    graphqlTypes: ["POST"],
    urlPrefix: "blog",
    template: TEMPLATES.POST,
    fragment: `
    `,
  },
];
