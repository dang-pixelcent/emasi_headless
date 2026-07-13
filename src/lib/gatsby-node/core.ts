import { Actions, CreatePagesArgs } from "gatsby";
import fs from "fs";
import path from "path";
import {
  API_CONFIG,
  TEMPLATES,
  CONTENT_TYPES_CONFIG,
} from "./config";
import {
  getAllPages,
  getAllPosts,
  getThemeOptions,
  getAllMembers,
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
    allWpCustomMember: { nodes: any[] };
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
          language {
            code
          }
          # PHẢI CÓ SUBFIELDS Ở ĐÂY
          translations {
            uri
            language {
              code
            }
          }
        }
      }
      allWpThemeOptions {
        nodes {
          siteId
          header
          footer
          topMenu
          leftPanel
        }
      }
      allWpCustomPost {
        nodes {
          id
          wpId
          uri
          slug
          title
          language { code }
           translations {
            uri
            language {
              code
            }
          }
        }
      }
      allWpCustomMember {
        nodes {
          id
          wpId
          uri
          slug
          title
          language { code }
           translations {
            uri
            language {
              code
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("❌ Error querying content nodes", result.errors);
    return;
  }

  const data = result.data!;
  const pages = data.allWpCustomPage?.nodes || [];
  const posts = data.allWpCustomPost?.nodes || [];
  const members = data.allWpCustomMember?.nodes || [];
  const themeOptionsNodes = data.allWpThemeOptions?.nodes || [];

  const globalThemeData = themeOptionsNodes.find((n) => n.siteId === "main") || null;

  console.log(`📊 NODES loaded from Gatsby Data Layer:`);
  console.log(`   - Pages:   ${pages.length}`);
  console.log(`   - Posts:   ${posts.length}`);
  console.log(`   - Members: ${members.length}`);

  // =============================
  // 2. GENERATE SEARCH INDEX
  // =============================
  console.log("🔍 Generating Local Search Index...");
  const allSearchNodes = [...pages, ...posts, ...members];

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
        id: page.id,
        themeOptions: globalThemeData,
        type: "page",
        pageBuilder: page.pageBuilder,
      },
      defer: false,
    });
  });
  console.log(`✅ Created ${pages.length} Pages`);
  // console.log("page: " + JSON.stringify(pages, null, 2));
  activity.end();
  console.log("✅ FINISHED creating all pages (V2 Optimized).\n");

  posts.forEach((post) => {
    const postPath = normalizePath(post.uri || `/tin-tuc/${post.slug}/`);
    createPage({
      path: postPath,
      component: TEMPLATES.POST, // Đảm bảo trong config.ts của bạn đã định nghĩa TEMPLATES.POST
      context: {
        id: post.id,
        themeOptions: globalThemeData,
        type: "post",
      },
      defer: false,
    });
  });
  console.log(`✅ Created ${posts.length} Post pages`);

  // --- B. TẠO MEMBER PAGES (Nhân sự) ---
  // Giả sử bạn đã có file template tại src/templates/MemberTemplate.tsx
  members.forEach((member) => {
    const memberPath = normalizePath(member.uri || `/nhan-su/${member.slug}/`);
    createPage({
      path: memberPath,
      component: TEMPLATES.MEMBER, // Đảm bảo trong config.ts của bạn đã định nghĩa TEMPLATES.MEMBER
      context: {
        id: member.id,
        themeOptions: globalThemeData,
        type: "member",
      },
      defer: false,
    });
  });
  console.log(`✅ Created ${members.length} Member pages`);
};

// =============================
// V1: LEGACY createPages (Kept for reference)
// =============================

export const runCreatePages = async ({ actions }: { actions: Actions }) => {
  const { createPage } = actions;

  console.log("\n🚀 --- START MULTI-BE FETCHING (ENGINE MODE) ---");
  console.log(`📡 Main API: ${API_CONFIG.MAIN_SITE.url}`);

  const startTime = Date.now();

  // 1. PREPARE FRAGMENTS MAPS
  const mainFragmentsMap = CONTENT_TYPES_CONFIG.reduce((acc, item) => {
    item.graphqlTypes.forEach((t) => (acc[t] = item.fragment));
    return acc;
  }, {} as Record<string, string>);

  // 2. PARALLEL FETCHING
  const [mainData] = await Promise.all([
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
    ])
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

  console.log(`\n📊 SUMMARY (Time: ${(Date.now() - startTime) / 1000}s):`);
  console.log(`   - Main Pages: ${pages.length}`);
  console.log(`   - Main Dynamic Nodes: ${mainDynamicNodes.length}`);

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
