import { CreateSchemaCustomizationArgs } from "gatsby";

/**
 * Schema Customization cho Gatsby Data Layer
 * Định nghĩa các Node Types để GraphQL có thể query
 */
export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;

  const typeDefs = `
    type WpLanguage { code: String }
    type WpTranslation { uri: String, language: WpLanguage }

    # =================================================================
    # BASE INTERFACE: Hợp đồng chung cho các content có đường dẫn/slug
    # =================================================================
    interface WpCustomContent implements Node {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      seo: JSON
    }

    # =================================================================
    # 1. PAGE NODES (Trang tĩnh)
    # =================================================================
    type WpCustomPage implements Node & WpCustomContent {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      pageBuilder: JSON
      seo: JSON
      language: WpLanguage
      translations: [WpTranslation]
    }

    # =================================================================
    # 2. POST NODES (Bài viết tin tức/sự kiện)
    # =================================================================
    type WpCustomPost implements Node & WpCustomContent @dontInfer {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      seo: JSON
      content: String
      excerpt: String
      featuredImage: JSON
      language: WpLanguage
      translations: [WpTranslation]
    }

    # =================================================================
    # 3. MEMBER NODES (Nhân sự / Giáo viên)
    # =================================================================
    type WpCustomMember implements Node & WpCustomContent @dontInfer {
      id: ID!
      wpId: String!
      uri: String
      slug: String
      title: String
      nodeType: String!
      flexibleContentMain: JSON
      seo: JSON
      content: String        
      excerpt: String
      featuredImage: JSON
      memberInfo: JSON
      language: WpLanguage
      translations: [WpTranslation]
    }

    # =================================================================
    # 4. THEME OPTIONS (Global Settings)
    # =================================================================
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