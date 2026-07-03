import { SourceNodesArgs, NodeInput } from "gatsby";
import { createContentDigest } from "gatsby-core-utils";
import { API_CONFIG, CONTENT_TYPES_CONFIG } from "./config";
import {
  getAllPages,
  getContentNodes,
  getThemeOptions,
  normalizePath,
  normalizeWpData,
  safeParseFlexibleContent,
} from "./helpers";
import { WPNode } from "./types";

// Node type mapping
const NODE_TYPE_MAP: Record<string, string> = {
  Page: "WpCustomPage",
  Post: "WpCustomPost",       // Cho bài viết tin tức
  Theme: "WpThemeOptions",    // Cho theme settings
  Register: "WpRegister"      // Cho dữ liệu đăng ký
};

/**
 * Helper: Xác định node type từ __typename
 */
const getNodeType = (typename: string = ""): string => {
  for (const [key, value] of Object.entries(NODE_TYPE_MAP)) {
    if (typename.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return "WpCustomPage"; // fallback
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
    ]),
  ]);
  // 3. TÁCH DỮ LIỆU
  const pages = mainData[0] as WPNode[];
  const themeOptions = mainData[mainData.length - 1]; // Phần tử cuối luôn là Theme

  // Extract Dynamic Nodes (Posts, Services, Teams...)
  const mainDynamicNodes: WPNode[] = [];
  CONTENT_TYPES_CONFIG.forEach((_, idx) => {
    const nodes = mainData[idx + 1] as WPNode[];
    if (nodes) mainDynamicNodes.push(...nodes);
  });
  // =============================
  // 3. CREATE GATSBY NODES
  // =============================
  let nodeCount = 0;

  // Helper function to create nodes
  const createContentNode = (
    node: WPNode,
    contentType: string,
    extras: Record<string, any> = {},
  ) => {
    const nodeType = getNodeType(node.__typename || contentType);
    const gatsbyNodeId = createNodeId(`${nodeType}-${node.id}`);

    // Parse flexibleContentMain nếu là string
    let parsedContent = safeParseFlexibleContent(node.flexibleContentMain);

    parsedContent = normalizeWpData(parsedContent);

    const nodeData: NodeInput = {
      id: gatsbyNodeId,
      parent: null,
      children: [],
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(node),
        description: `WordPress ${contentType}: ${node.title}`,
      },
      wpId: String(node.id),
      uri: normalizePath(node.uri),
      slug: node.slug || "",
      title: node.title || "",
      nodeType: contentType,
      flexibleContentMain: parsedContent,
      getRankMathSEO: node.getRankMathSEO || "",
      pageBuilder: node.pageBuilder ? node.pageBuilder : { pagebuilderdata: [] },
      language: node.language || null,
      translations: node.translations || null,
      ...extras,
    };

    createNode(nodeData);
    nodeCount++;
  };

  // --- Create MAIN PAGES ---
  pages.forEach((page) => {
    createContentNode(page, "page");
  });
  console.log(`✅ Created ${pages.length} WpCustomPage nodes`);

  // --- Create DYNAMIC NODES (Posts, Services, Teams) ---
  // CONTENT_TYPES_CONFIG.forEach((config, idx) => {
  //   const nodes = mainData[idx + 1] as WPNode[];
  //   if (!nodes) return;

  //   nodes.forEach((node) => {
  //     createContentNode(node, config.typeLabel.toLowerCase());
  //   });
  // });

  // =============================
  // 4. CREATE THEME OPTIONS NODES (Global)
  // =============================
  const mainThemeNode: NodeInput = {
    id: createNodeId("WpThemeOptions-main"),
    parent: null,
    children: [],
    internal: {
      type: "WpThemeOptions",
      contentDigest: createContentDigest(themeOptions),
      description: "Main Site Theme Options",
    },
    siteId: "main",
    header: themeOptions?.header || null,
    topMenu: themeOptions?.topMenu || null,
    footer: themeOptions?.footer || null,
    leftPanel: themeOptions?.leftPanel || null,
  };
  createNode(mainThemeNode);

  activity.end();
};