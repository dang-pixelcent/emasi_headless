import type { GatsbyConfig } from "gatsby";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
//nơi lấy dữ liệu từ GraphQL
const WPGRAPHQL_URL = process.env.GATSBY_WPGRAPHQL_URL;
const MAIN_SITE_URL = process.env.GATSBY_MAIN_SITE_URL;
const PRODUCTION = process.env.NODE_ENV === "production";
if (!WPGRAPHQL_URL) {
  console.error(`GATSBY_WPGRAPHQL_URL must be set in .env file`);
  process.exit(1);
}

const config: GatsbyConfig = {
  flags: {
    // DEV_SSR: false,
    // FAST_DEV: true,
    // PARALLEL_SOURCING: true,
    // PRESERVE_FILE_DOWNLOAD_CACHE: true,
    // PRESERVE_WEBPACK_CACHE: true,
    // IMAGE_CDN: false,
    // PARALLEL_QUERY_RUNNING: true,
    // FAST_REFRESH: true,
    // PARALLEL_SOURCING: true,
  },
  siteMetadata: {
    title: `prcpb`,
    siteUrl: MAIN_SITE_URL,
  },

  graphqlTypegen: true,
  plugins: [
    "@vercel/gatsby-plugin-vercel-builder",
    "gatsby-plugin-tsconfig-paths",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    // "gatsby-theme-material-ui",

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => MAIN_SITE_URL,
        excludes: [
          `/dev-404-page/`,
          `/404`,
          `/404.html`,
          `/preview/`,
          `/locations/*`,
          `/locations/**/*`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: MAIN_SITE_URL,
        // 👇 Chỉ trỏ đến sitemap chính, KHÔNG trỏ sitemap geo
        sitemap: `${MAIN_SITE_URL}/sitemap/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `PRCPB`,
        short_name: `PRCPB`,
        start_url: `/`,
        display: `standalone`,
        icon: `static/favicon.ico`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          // Lưu ý: Tên font ở đây phải chuẩn theo Google Fonts
          `Montserrat\:300,300i,400,400i,500,500i,600,600i,700,700i`,
          `Raleway\:300,300i,400,400i,500,500i,600,600i,700,700i`,
          `Inter\:300,300i,400,400i,500,500i,600,600i,700,700i`,
          `Crimson Pro\:300,300i,400,400i,500,500i,600,600i,700,700i`,
        ],

        display: "swap",
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#c73f2e`,
        showSpinner: false,
      },
    },
    ...(PRODUCTION ? ["gatsby-plugin-preact"] : []),
  ],
};

export default config;
