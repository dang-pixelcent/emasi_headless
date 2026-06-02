import { CreateSchemaCustomizationArgs } from "gatsby";

/**
 * Schema Customization cho Gatsby Data Layer
 * Định nghĩa các Node Types để GraphQL có thể query
 */
export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;

  // Định nghĩa schema cho các custom nodes
  const typeDefs = `
    # =============================
    # BASE INTERFACE
    # =============================
    interface WpCustomContent implements Node {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    # =============================
    # MAIN SITE NODES
    # =============================
    type WpCustomPage implements Node & WpCustomContent {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    type WpCustomPost implements Node & WpCustomContent {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    type WpCustomService implements Node & WpCustomContent {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    type WpCustomTeam implements Node & WpCustomContent {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    # =============================
    # GEO SITE NODES
    # =============================
    type WpGeoLocation implements Node & WpCustomContent {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
      isGeosite: Boolean
      customPath: String
    }

    # =============================
    # THEME OPTIONS (Global)
    # =============================
    type WpThemeOptions implements Node {
      id: ID!
      siteId: String!
      headerGroup: JSON
      footerGroup: JSON
      headerFooterTracking: JSON
    }
  `;

  createTypes(typeDefs);
};
