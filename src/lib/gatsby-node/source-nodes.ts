import { SourceNodesArgs, NodeInput } from "gatsby";
import { createContentDigest } from "gatsby-core-utils";
import { API_CONFIG, CONTENT_TYPES_CONFIG, GEO_TYPES_CONFIG } from "./config";
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
  Post: "WpCustomPost",
  Services: "WpCustomService",
  Team: "WpCustomTeam",
  ServicesArea: "WpGeoLocation",
  LocationsArea: "WpGeoLocation",
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
  console.log(
    `🌍 Geo API: ${
      API_CONFIG.GEO_SITE.enabled ? API_CONFIG.GEO_SITE.url : "DISABLED"
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
  CONTENT_TYPES_CONFIG.forEach((_, idx) => {
    const nodes = mainData[idx + 1] as WPNode[];
    if (nodes) mainDynamicNodes.push(...nodes);
  });

  // Extract Geo Nodes
  let geoLocations: WPNode[] = [];
  let geoThemeOptions: any = {};

  if (API_CONFIG.GEO_SITE.enabled && Array.isArray(geoData)) {
    geoThemeOptions = geoData[geoData.length - 1];
    GEO_TYPES_CONFIG.forEach((_, idx) => {
      const nodes = geoData[idx] as WPNode[];
      if (nodes) geoLocations.push(...nodes);
    });
  }

  console.log(`\n📊 FETCHED (${(Date.now() - startTime) / 1000}s):`);
  console.log(`   - Main Pages: ${pages.length}`);
  console.log(`   - Main Dynamic Nodes: ${mainDynamicNodes.length}`);
  console.log(`   - Geosite Locations: ${geoLocations.length}`);

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
      // Gatsby required fields
      id: gatsbyNodeId,
      parent: null,
      children: [],
      internal: {
        type: nodeType,
        contentDigest: createContentDigest(node),
        description: `WordPress ${contentType}: ${node.title}`,
      },
      // Custom fields
      wpId: String(node.id),
      uri: normalizePath(node.uri),
      slug: node.slug || "",
      title: node.title || "",
      nodeType: contentType,
      flexibleContentMain: parsedContent,
      getRankMathSEO: node.getRankMathSEO || "",
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
  CONTENT_TYPES_CONFIG.forEach((config, idx) => {
    const nodes = mainData[idx + 1] as WPNode[];
    if (!nodes) return;

    nodes.forEach((node) => {
      createContentNode(node, config.typeLabel.toLowerCase());
    });
    console.log(`✅ Created ${nodes.length} ${config.typeLabel} nodes`);
  });

  // --- Create GEO LOCATIONS ---
  if (API_CONFIG.GEO_SITE.enabled) {
    geoLocations.forEach((node) => {
      const customPath = normalizePath(`/${node.uri}`);
      createContentNode(node, "geolocation", {
        isGeosite: true,
        customPath,
      });
    });
    console.log(`✅ Created ${geoLocations.length} WpGeoLocation nodes`);
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
      contentDigest: createContentDigest(themeOptions),
      description: "Main Site Theme Options",
    },
    siteId: "main",
    headerGroup: themeOptions?.headerGroup || {},
    footerGroup: themeOptions?.footerGroup || {},
    headerFooterTracking: themeOptions?.headerFooterTracking || {},
  };
  createNode(mainThemeNode);
  console.log("✅ Created Main WpThemeOptions node");

  if (API_CONFIG.GEO_SITE.enabled && geoThemeOptions) {
    const geoThemeNode: NodeInput = {
      id: createNodeId("WpThemeOptions-geo"),
      parent: null,
      children: [],
      internal: {
        type: "WpThemeOptions",
        contentDigest: createContentDigest(geoThemeOptions),
        description: "Geo Site Theme Options",
      },
      siteId: "geo",
      headerGroup: geoThemeOptions?.headerGroup || {},
      footerGroup: geoThemeOptions?.footerGroup || {},
      headerFooterTracking: geoThemeOptions?.headerFooterTracking || {},
    };
    createNode(geoThemeNode);
    console.log("✅ Created Geo WpThemeOptions node");
  }

  activity.end();
  console.log(`\n📦 TOTAL: ${nodeCount} content nodes created.\n`);
};
