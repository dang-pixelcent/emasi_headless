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
    type WpLanguage { code: String }
    type WpTranslation { uri: String, language: WpLanguage }
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
    type WpCustomPage implements Node & WpCustomContent{
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      pageBuilder: JSON
      getRankMathSEO: String
      language: WpLanguage
      translations: [WpTranslation]
    }

    type WpCustomPost implements Node & WpCustomContent @dontInfer{
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    type WpCustomService implements Node & WpCustomContent @dontInfer{
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      getRankMathSEO: String
    }

    type WpCustomTeam implements Node & WpCustomContent @dontInfer{
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
    # THEME OPTIONS (Global)
    # =============================
    type WpThemeOptions implements Node {
      id: ID!
      siteId: String!
      header: JSON
      footer: JSON
      topMenu: JSON
      leftPanel: JSON
    }
  `;

  createTypes(typeDefs);
};
