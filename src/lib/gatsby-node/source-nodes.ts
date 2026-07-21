
import { SourceNodesArgs, NodeInput } from "gatsby";
import { createContentDigest } from "gatsby-core-utils";
import { API_CONFIG } from "./config";
import {
  getAllMembers,
  getAllPages,
  getAllPosts,
  getThemeOptions,
  normalizePath,
  normalizeWpData,
  safeParseFlexibleContent,
} from "./helpers";
import { WPNode } from "./types";

// 1. Cập nhật Node type mapping: Thêm Member
const NODE_TYPE_MAP: Record<string, string> = {
  Page: "WpCustomPage",
  Post: "WpCustomPost",       // Cho bài viết tin tức
  Member: "WpCustomMember",   // Cho nhân sự / giáo viên
  Team: "WpCustomTeam",       // Fallback cho nhân sự nếu schema cũ dùng Team
  Theme: "WpThemeOptions",    // Cho theme settings
  Register: "WpRegister"      // Cho dữ liệu đăng ký
};

/**
 * Helper: Xác định node type từ __typename hoặc chuỗi truyền vào
 */
const getNodeType = (typename: string = ""): string => {
  for (const [key, value] of Object.entries(NODE_TYPE_MAP)) {
    if (typename.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return "WpCustomPage"; // fallback an toàn
};

/**
 * sourceNodes: Fetch dữ liệu từ WordPress và tạo Gatsby Nodes
 * Đây là hook chạy TRƯỚC createPages
 */
export const runSourceNodes = async ({
  actions,
  createNodeId,
  reporter,
}: SourceNodesArgs) => {
  const { createNode } = actions;
  const activity = reporter.activityTimer("🚀 Sourcing WP Custom Nodes");
  activity.start();

  console.log("\n📦 --- START SOURCING MULTI-BE DATA ---");
  console.log(`📡 Main API: ${API_CONFIG.MAIN_SITE.url}`);

  const startTime = Date.now();
  const apiUrl = API_CONFIG.MAIN_SITE.url;

  // 2. PARALLEL FETCHING: Gọi song song toàn bộ dữ liệu từ WordPress
  const [pages, themeOptions, posts, members] = await Promise.all([
    getAllPages(apiUrl),
    getThemeOptions(apiUrl),
    getAllPosts(apiUrl),
    getAllMembers(apiUrl),
  ]);

  console.log(`\n📊 FETCH SUMMARY (Time: ${(Date.now() - startTime) / 1000}s):`);
  console.log(`   - Pages loaded:   ${pages.length}`);
  console.log(`   - Posts loaded:   ${posts.length}`);
  console.log(`   - Members loaded: ${members.length}`);

  // =============================
  // 3. CREATE GATSBY NODES
  // =============================
  let nodeCount = 0;

  // Helper function to create nodes
  const createContentNode = (
    node: WPNode | any,
    contentType: string,
    extras: Record<string, any> = {},
  ) => {
    // Xác định đúng Type (e.g., WpCustomPage, WpCustomPost, WpCustomMember)
    const nodeType = getNodeType(node.__typename || contentType);
    const gatsbyNodeId = createNodeId(`${nodeType}-${node.id}`);

    // Parse flexibleContentMain nếu là string
    let parsedContent = safeParseFlexibleContent(node.flexibleContentMain);
    parsedContent = normalizeWpData(parsedContent);

    // Gom các trường đặc thù của Post & Member (nếu có) vào extras
    const customFields: Record<string, any> = {
      content: node.content || "",
      excerpt: node.excerpt || "",
      featuredImage: node.featuredImage || null,
      memberInfo: node.memberInfo || null,
      jobTitle: node.jobTitle || "",
      ...extras,
    };

    const nodeData: NodeInput = {
      id: gatsbyNodeId,
      parent: null,
      children: [],
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(node),
        description: `WordPress ${contentType}: ${node.title || "Untitled"}`,
      },
      wpId: String(node.databaseId || node.id),
      uri: normalizePath(node.uri),
      slug: node.slug || "",
      title: node.title || "",
      nodeType: contentType,
      flexibleContentMain: parsedContent,
      seo: node.seo ? JSON.stringify(node.seo) : (node.getRankMathSEO || ""),
      getRankMathSEO: node.getRankMathSEO || "",
      pageBuilder: node.pageBuilder ? node.pageBuilder : { pagebuilderdata: [] },
      language: node.language || null,
      translations: node.translations || null,
      ...customFields, // Đẩy toàn bộ dữ liệu mở rộng vào Node
    };

    createNode(nodeData);
    nodeCount++;
  };

  // --- Create MAIN PAGES ---
  pages.forEach((page) => {
    createContentNode(page, "Page");
  });
  console.log(`✅ Created ${pages.length} WpCustomPage nodes`);

  // --- Create POST NODES (Bài viết tin tức) ---
  if (posts && posts.length > 0) {
    posts.forEach((post) => {
      createContentNode(post, "Post");
    });
    console.log(`✅ Created ${posts.length} WpCustomPost nodes`);
  }

  // --- Create MEMBER NODES (Nhân sự) ---
  if (members && members.length > 0) {
    members.forEach((member) => {
      createContentNode(member, "Member");
    });
    console.log(`✅ Created ${members.length} WpCustomMember nodes`);
  }

  // =============================
  // 4. CREATE THEME OPTIONS NODES (Global)
  // =============================
  const mainThemeNode: NodeInput = {
    id: createNodeId("WpThemeOptions-main"),
    parent: null,
    children: [],
    internal: {
      type: "WpThemeOptions",
      contentDigest: createContentDigest(themeOptions || {}),
      description: "Main Site Theme Options",
    },
    siteId: "main",
    header: themeOptions?.header || null,
    topMenu: themeOptions?.topMenu || null,
    footer: themeOptions?.footer || null,
    leftPanel: themeOptions?.leftPanel || null,
  };
  createNode(mainThemeNode);
  console.log(`✅ Created WpThemeOptions node`);

  console.log(`🎉 Total content nodes created in Gatsby Layer: ${nodeCount}\n`);
  activity.end();
};