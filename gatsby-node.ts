import type { CreateWebpackConfigArgs, GatsbyNode } from "gatsby";
import { runCreatePagesV2, generateGeoSitemap } from "./src/lib/gatsby-node/core";
import { runSourceNodes } from "./src/lib/gatsby-node/source-nodes";
import { createSchemaCustomization as runCreateSchemaCustomization } from "./src/lib/gatsby-node/schema";

// =============================
// 1. SCHEMA CUSTOMIZATION (Runs first)
// =============================
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  runCreateSchemaCustomization;

// =============================
// 2. SOURCE NODES (Fetch data → Create Gatsby Nodes)
// =============================
export const sourceNodes: GatsbyNode["sourceNodes"] = async (args) => {
  await runSourceNodes(args);
};

// =============================
// 3. CREATE PAGES (Using GraphQL queries on Gatsby Nodes)
// =============================
export const createPages: GatsbyNode["createPages"] = async (args) => {
  await runCreatePagesV2(args);
};

export const onPostBuild: GatsbyNode["onPostBuild"] = async (args) => {
  await generateGeoSitemap(args);
};
//
export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  getConfig,
}: CreateWebpackConfigArgs) => {
  const config = getConfig();
  if (config.plugins) {
    config.plugins.forEach((plugin: any) => {
      if (
        plugin.constructor.name === "MiniCssExtractPlugin" &&
        plugin.options
      ) {
        plugin.options.ignoreOrder = true;
      }
    });
  }
  actions.replaceWebpackConfig(config);
};
