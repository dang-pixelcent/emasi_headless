import { Actions, CreatePagesArgs } from "gatsby";
import fs from "fs";
import path from "path";
import {
  API_CONFIG,
  TEMPLATES,
  CONTENT_TYPES_CONFIG,
  GEO_TYPES_CONFIG,
} from "./config";
import {
  getAllPages,
  getContentNodes,
  getThemeOptions,
  normalizePath,
} from "./helpers";
import { WPNode } from "./types";

// =============================
// V2: GraphQL-based createPages (NEW - OPTIMIZED)
// =============================
export const runCreatePagesV2 = async ({
  actions,
  graphql,
  reporter,
}: CreatePagesArgs) => {
  const { createPage } = actions;
  const activity = reporter.activityTimer(
    "📄 Creating Pages from Gatsby Nodes",
  );
  activity.start();

  console.log("\n🚀 --- CREATE PAGES V2 (OPTIMIZED MODE) ---");

  // =============================
  // 1. QUERY ALL CONTENT NODES
  // =============================
  const result = await graphql<{
    allWpCustomPage: { nodes: any[] };
    allWpCustomPost: { nodes: any[] };
    allWpCustomService: { nodes: any[] };
    allWpCustomTeam: { nodes: any[] };
    allWpGeoLocation: { nodes: any[] };
    allWpThemeOptions: { nodes: any[] };
  }>(`
    query AllContentNodes {
      allWpCustomPage {
        nodes {
          id
          wpId
          uri
          slug
          title
          pageBuilder
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("❌ Error querying content nodes", result.errors);
    return;
  }

  const data = result.data!;
  // Dùng fallback an toàn (|| { nodes: [] })
  const pages = data.allWpCustomPage?.nodes || [];
  // const posts = data.allWpCustomPost?.nodes || []; // Nếu không query Post, nó sẽ lấy mảng rỗng
  // const services = data.allWpCustomService?.nodes || [];
  // const teams = data.allWpCustomTeam?.nodes || [];
  const geoLocations = data.allWpGeoLocation?.nodes || [];
  const themeOptionsNodes = data.allWpThemeOptions?.nodes || [];

  // Get theme options node IDs
  const mainThemeId = themeOptionsNodes.find((n) => n.siteId === "main")?.id;
  const geoThemeId = themeOptionsNodes.find((n) => n.siteId === "geo")?.id;

  console.log(`📊 NODES from Gatsby Data Layer:`);
  console.log(`   - Pages: ${pages.length}`);
  console.log(`   - Geo Locations: ${geoLocations.length}`);

  // =============================
  // 2. GENERATE SEARCH INDEX
  // =============================
  console.log("🔍 Generating Local Search Index...");
  const allSearchNodes = [...pages];

  const searchIndex = allSearchNodes
    .filter((node) => node.title && (node.uri || node.slug))
    .map((node) => {
      let type = "Page";
      return {
        id: node.wpId,
        title: node.title,
        uri: node.uri || `/${node.slug}/`,
        type: type,
        s: `${node.title} ${type}`.toLowerCase(),
      };
    });

  try {
    const publicDir = path.resolve("./public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
    fs.writeFileSync(
      path.join(publicDir, "search-data.json"),
      JSON.stringify(searchIndex),
    );
    console.log(`✅ Search Index Created: ${searchIndex.length} items.`);
  } catch (error) {
    console.error("❌ Failed to write search index:", error);
  }

  // =============================
  // 3. CREATE PAGES
  // =============================

  // --- STATIC PAGES ---
  pages.forEach((page) => {
    let pagePath = page.uri || `/${page.slug}/`;
    pagePath = normalizePath(pagePath);

    if (!pagePath) {
      console.warn(`⚠️ Skipping Page: ${page.title} (empty path)`);
      return;
    }

    createPage({
      path: pagePath,
      component: TEMPLATES.PAGE,
      context: {
        // 👇 CHỈ TRUYỀN ID - Template sẽ query full data
        id: page.id,
        themeOptionsId: mainThemeId,
        type: "page",
        pageBuilder: page.pageBuilder,
      },
      defer: false,
    });
  });
  console.log(`✅ Created ${pages.length} Pages`);

  // // --- POSTS ---
  // posts.forEach((node) => {
  //   const nodePath = normalizePath(node.uri);
  //   if (!nodePath) return;

  //   createPage({
  //     path: nodePath,
  //     component: TEMPLATES.POST,
  //     context: {
  //       id: node.id,
  //       themeOptionsId: mainThemeId,
  //       type: "post",
  //     },
  //     defer: false,
  //   });
  // });
  // console.log(`✅ Created ${posts.length} Posts`);

  // // --- SERVICES ---
  // services.forEach((node) => {
  //   const nodePath = normalizePath(node.uri);
  //   if (!nodePath) return;

  //   createPage({
  //     path: nodePath,
  //     component: TEMPLATES.POST,
  //     context: {
  //       id: node.id,
  //       themeOptionsId: mainThemeId,
  //       type: "service",
  //     },
  //     defer: false,
  //   });
  // });
  // console.log(`✅ Created ${services.length} Services`);

  // // --- TEAMS ---
  // teams.forEach((node) => {
  //   const nodePath = normalizePath(node.uri);
  //   if (!nodePath) return;

  //   createPage({
  //     path: nodePath,
  //     component: TEMPLATES.POST,
  //     context: {
  //       id: node.id,
  //       themeOptionsId: mainThemeId,
  //       type: "team",
  //     },
  //     defer: false,
  //   });
  // });
  // console.log(`✅ Created ${teams.length} Teams`);

  // --- GEO LOCATIONS ---
  if (API_CONFIG.GEO_SITE.enabled && geoLocations.length > 0) {
    geoLocations.forEach((node) => {
      const geoPath = normalizePath(node.customPath || node.uri);
      if (!geoPath) return;

      createPage({
        path: geoPath,
        component: TEMPLATES.GEO_POST,
        context: {
          id: node.id,
          themeOptionsId: geoThemeId,
          type: "geolocation",
          isGeosite: true,
        },
        defer: false,
      });
    });
    console.log(`✅ Created ${geoLocations.length} Geo Locations`);
  }

  // --- PREVIEW PAGES ---
  createPage({
    path: "/preview",
    matchPath: "/preview/*",
    component: TEMPLATES.PREVIEW,
    context: { themeOptionsId: mainThemeId, type: "preview" },
  });

  if (API_CONFIG.GEO_SITE.enabled) {
    createPage({
      path: "/locations/preview",
      matchPath: "/locations/preview/*",
      component: TEMPLATES.PREVIEW,
      context: {
        themeOptionsId: geoThemeId,
        type: "preview-geo",
        geoApiUrl: API_CONFIG.GEO_SITE.url,
      },
    });
    console.log("✅ Created Geosite Preview at /locations/preview");
  }

  activity.end();
  console.log("✅ FINISHED creating all pages (V2 Optimized).\n");
};

// =============================
// V1: LEGACY createPages (Kept for reference)
// =============================

export const runCreatePages = async ({ actions }: { actions: Actions }) => {
  const { createPage } = actions;

  console.log("\n🚀 --- START MULTI-BE FETCHING (ENGINE MODE) ---");
  console.log(`📡 Main API: ${API_CONFIG.MAIN_SITE.url}`);
  console.log(
    `🌍 Geo API: ${API_CONFIG.GEO_SITE.enabled ? API_CONFIG.GEO_SITE.url : "DISABLED"
    }`,
  );

  const startTime = Date.now();

  // 1. PREPARE FRAGMENTS MAPS
  const mainFragmentsMap = CONTENT_TYPES_CONFIG.reduce((acc, item) => {
    item.graphqlTypes.forEach((t) => (acc[t] = item.fragment));
    return acc;
  }, {} as Record<string, string>);

  const geoFragmentsMap = GEO_TYPES_CONFIG.reduce((acc, item) => {
    item.graphqlTypes.forEach((t) => (acc[t] = item.fragment));
    return acc;
  }, {} as Record<string, string>);

  // 2. PARALLEL FETCHING
  const [mainData, geoData] = await Promise.all([
    Promise.all([
      getAllPages(API_CONFIG.MAIN_SITE.url),
      ...CONTENT_TYPES_CONFIG.map((config) =>
        getContentNodes(
          API_CONFIG.MAIN_SITE.url,
          config.graphqlTypes,
          mainFragmentsMap,
        ),
      ),
      getThemeOptions(API_CONFIG.MAIN_SITE.url),
    ]),

    // Geo Site
    API_CONFIG.GEO_SITE.enabled
      ? Promise.all([
        ...GEO_TYPES_CONFIG.map((config) =>
          getContentNodes(
            API_CONFIG.GEO_SITE.url,
            config.graphqlTypes,
            geoFragmentsMap,
          ),
        ),
        getThemeOptions(API_CONFIG.GEO_SITE.url),
      ])
      : Promise.resolve([[], {}]),
  ]);

  // Destructure Data
  const pages = mainData[0] as WPNode[];

  const themeOptions = mainData[mainData.length - 1];

  // Extract Dynamic Nodes (Posts, Services, Teams...)
  const mainDynamicNodes: WPNode[] = [];

  CONTENT_TYPES_CONFIG.forEach((config, idx) => {
    const nodes = mainData[idx + 1] as WPNode[];
    mainDynamicNodes.push(...nodes);
  });
  // Extract Geo Nodes
  let geoLocations: WPNode[] = [];
  let geoThemeOptions: any = {};

  if (API_CONFIG.GEO_SITE.enabled) {
    // GeoData structure depends on Promise.all above
    geoThemeOptions = geoData[geoData.length - 1];
    // Collect all location nodes
    GEO_TYPES_CONFIG.forEach((_, idx) => {
      const nodes = geoData[idx] as WPNode[];
      if (nodes) geoLocations.push(...nodes);
    });
  }

  console.log(`\n📊 SUMMARY (Time: ${(Date.now() - startTime) / 1000}s):`);
  console.log(`   - Main Pages: ${pages.length}`);
  console.log(`   - Main Dynamic Nodes: ${mainDynamicNodes.length}`);
  console.log(`   - Geosite Locations: ${geoLocations.length}`);

  // 3. GENERATE SEARCH INDEX
  console.log("🔍 Generating Local Search Index...");
  const allSearchNodes = [...pages, ...mainDynamicNodes]; // Có thể add geoLocations vào đây nếu muốn search

  const searchIndex = allSearchNodes
    .filter((node) => node.title && (node.uri || node.slug))
    .map((node) => {
      let type = "Page";
      const rawType = (node.__typename || "").toLowerCase();

      // Mapping type for search based on keyword
      if (rawType.includes("service")) type = "Services";
      else if (rawType.includes("team")) type = "Teams";
      else if (rawType.includes("post")) type = "Post";

      let uri = normalizePath(node.uri);
      // Check if it's geo node to add prefix (if included in search)
      if (geoLocations.find((g) => g.id === node.id)) {
        uri = normalizePath(`/locations/${node.slug}`);
      }

      return {
        id: String(node.id),
        title: node.title,
        uri: uri,
        type: type,
        s: `${node.title} ${type}`.toLowerCase(),
      };
    });

  try {
    const publicDir = path.resolve("./public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
    fs.writeFileSync(
      path.join(publicDir, "search-data.json"),
      JSON.stringify(searchIndex),
    );
    console.log(`✅ Search Index Created: ${searchIndex.length} items.`);
  } catch (error) {
    console.error("❌ Failed to write search index:", error);
  }

  // 4. CREATE PAGES (MAIN SITE)

  // Static Pages
  pages.forEach((page) => {
    // --- FIX START: Xử lý trường hợp uri bị null ---
    let pagePath = page.uri;

    // Nếu uri bị null (thường gặp ở trang Blog hoặc Home set trong Reading Settings)
    // thì fallback sang dùng slug
    if (!pagePath && page.slug) {
      pagePath = `/${page.slug}/`;
    }

    // Chuẩn hóa đường dẫn
    pagePath = normalizePath(pagePath);

    // Kiểm tra lần cuối, nếu vẫn rỗng thì bỏ qua không tạo trang này để tránh crash
    if (!pagePath) {
      console.warn(
        `⚠️ [CreatePages] Skipping Page ID: ${page.id} ("${page.title}") because path is empty.`,
      );
      return;
    }
    // --- FIX END ---

    createPage({
      path: pagePath,
      component: TEMPLATES.PAGE,
      context: { ...page, type: "page", themeOptions },
      defer: false,
    });
  });

  // Dynamic Pages (Services, Posts, Teams...)
  CONTENT_TYPES_CONFIG.forEach((config, idx) => {
    const nodes = mainData[idx + 1] as WPNode[];
    if (!nodes) return;

    nodes.forEach((node) => {
      if (!node.uri) {
        console.warn(
          `⚠️ [CreatePages] Skipping ${config.typeLabel} ID: ${node.id} ("${node.title}") because uri is empty.`,
        );
        return;
      }

      const nodePath = normalizePath(node.uri);

      createPage({
        path: nodePath,
        component: config.template,
        context: {
          ...node,
          type: config.typeLabel.toLowerCase(),
          themeOptions,
        },
        defer: false,
      });
    });

    console.log(`✅ Created ${nodes.length} ${config.typeLabel} pages`);
  });

  // 5. CREATE PAGES (GEO SITE)
  if (API_CONFIG.GEO_SITE.enabled) {
    GEO_TYPES_CONFIG.forEach((config, idx) => {
      const nodes = geoData[idx] as WPNode[];
      if (!nodes) return;
      nodes.forEach((node) => {
        if (!node.uri) return;
        // Force Prefix logic (như code cũ)
        const geoPath = normalizePath(`/${node.uri}`);

        createPage({
          path: geoPath,
          component: config.template,
          context: {
            ...node,
            customPath: geoPath,
            defer: false,
            themeOptions: geoThemeOptions,
            isGeosite: true,
          },
        });
      });
    });
  }

  // 6. PREVIEW PAGES
  createPage({
    path: "/preview",
    matchPath: "/preview/*",
    component: TEMPLATES.PREVIEW,
    context: { themeOptions, type: "preview" },
  });

  if (API_CONFIG.GEO_SITE.enabled) {
    createPage({
      path: "/locations/preview",
      matchPath: "/locations/preview/*",
      component: TEMPLATES.PREVIEW,
      context: {
        themeOptions: geoThemeOptions,
        type: "preview-geo",
        geoApiUrl: API_CONFIG.GEO_SITE.url,
      },
    });
    console.log("✅ Created Geosite Preview at /locations/preview");
  }

  console.log("✅ FINISHED creating all pages.\n");
};

// --- SITEMAP LOGIC (Moved here) ---
export const generateGeoSitemap = async ({ graphql, reporter }: any) => {
  if (!API_CONFIG.GEO_SITE.enabled) return;

  reporter.info("🕵️‍♀️ Generating Secret Geosite Sitemap...");
  const result = await graphql(`
    {
      allSitePage(filter: { path: { regex: "/^/locations//" } }) {
        nodes {
          path
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("❌ Error while running GraphQL for Geosite Sitemap");
    return;
  }

  const { nodes } = (result.data as any).allSitePage;

  // Lọc bỏ các path không hợp lệ (ví dụ trang preview)
  const validNodes = nodes.filter((node: any) => {
    return !node.path.includes("/preview");
  });

  const rawUrl =
    API_CONFIG.MAIN_SITE_URL || "https://www.hydrologywellness.com";
  // Cắt bỏ dấu / ở cuối URL nếu có để tránh double slash
  const siteUrl = rawUrl.replace(/\/+$/, "");

  // Tạo nội dung XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${validNodes
      .map((node: any) => {
        return `  <url>
      <loc>${siteUrl}${node.path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`;
      })
      .join("\n")}
  </urlset>`;

  // Xác định đường dẫn output: public/locations/sitemap-index.xml
  const outputDir = path.resolve("public", "locations");
  const outputPath = path.join(outputDir, "sitemap-index.xml");

  try {
    // Kiểm tra và tạo folder nếu chưa tồn tại
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Ghi file
    fs.writeFileSync(outputPath, sitemapXml);
    reporter.success(
      `✅ Secret Sitemap generated at: ${siteUrl}/locations/sitemap-index.xml`,
    );
  } catch (err) {
    reporter.error("❌ Could not write secret sitemap file", err as Error);
  }
};
