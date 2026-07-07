// import fetch from "node-fetch"; //lỗi build
import { WPNode, GraphQLResponse } from "./types";

// --- UTILS ---

export const safeParseFlexibleContent = (content: any): any[] => {
  if (!content) return [];
  if (typeof content === "object") {
    return Array.isArray(content) ? content : [content];
  }
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.warn(`⚠️ Lỗi parse JSON flexibleContentMain:`, e);
      return [];
    }
  }
  return [];
};

export const normalizePath = (p: string): string => {
  if (!p) return "";
  let r = p.trim();
  r = r.replace(/\/{2,}/g, "/");
  if (!r.startsWith("/")) r = "/" + r;
  if (!r.endsWith("/")) r += "/";
  return r;
};
export const getAllPages = async (
  apiUrl: string,
  take: number = 200,
): Promise<WPNode[]> => {
  try {
    if (!apiUrl) {
      console.error(`❌ [getAllPages] ERROR: API URL thiếu!`);
      return [];
    }

    let hasNextPage = true;
    let endCursor: string | null = null;
    const allItems: WPNode[] = [];

    while (hasNextPage) {
      const query = `query GetAllPages($first: Int!, $after: String) {
        pages(first: $first, after: $after) {
          edges {
            cursor
            node {
              __typename
              id
              uri
              title
              slug
              language {
                code
              }
              translations {
                uri
                language {
                  code
                }
              }
              pageBuilder {
                pagebuilderdata {
                  __typename
                  ... on PageBuilderPagebuilderdataContentEditorLayout {
                    articleBlocks {
                      __typename
                      ... on PageBuilderPagebuilderdataArticleBlocksTextContentLayout {
                        textContent
                      }
                    }
                  }
                  ... on PageBuilderPagebuilderdataBannerLayout {
                    bannergallery {
                      nodes {
                        sourceUrl
                        altText
                      }
                    }
                  }
                  ... on PageBuilderPagebuilderdataSidebarLayout {
                    list {
                      image {
                        node {
                          id
                          sourceUrl
                          altText
                        }
                      }
                      title
                      desc
                      link {
                        url
                        title
                        target
                      }
                    }
                  }
                  ... on PageBuilderPagebuilderdataDiscoveryLayout {
                    title
                    list {
                      image {
                        node {
                          id
                          sourceUrl
                          altText
                        }
                      }
                      link {
                        url
                      }
                      title
                    }
                  }
                  ... on PageBuilderPagebuilderdataTeacherLayout {
                      teamTeach {
                        schoolName
                        title
                        listTeacher {
                          teacher {
                            nodes {
                              ... on Member {
                                __typename
                                id
                                title
                                content
                                excerpt
                                featuredImage {
                                  node {
                                    sourceUrl
                                    altText
                                  }
                                }
                                memberInfo{
                                  position
                                }
                              }
                            }
                          }
                        }
                          generalEducation {
                            name
                            members{
                              thanhvien{
                                nodes {
                                  ... on Member {
                                  __typename
                                  id
                                  title
                                  content
                                  excerpt
                                  featuredImage {
                                    node {
                                      sourceUrl
                                      altText
                                    }
                                  }
                                  memberInfo{
                                    position
                                  }
                                }
                              }
                                }
                              }
                            }
                      }
                    }
                  ... on PageBuilderPagebuilderdataBadgetsLayout{
                    listItem{
                      icon{node {sourceUrl altText}}
                      title
                      link {url}
                    }
                  }
                  ... on PageBuilderPagebuilderdataFacilitiesLayout{
                    heading
                    campus
                  }
                    ... on PageBuilderPagebuilderdataEducationRouteLayout{
                    subTitle
                    title
                    decs
                    logo{
                      item{node{sourceUrl}}
                    }
                    classes {
                      image{node{sourceUrl}}
                      title
                      items{title}
                      logos{image{node{sourceUrl}}}
                      link{url}
                    }
                  }
                } 
              } 
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`;
      // ... tiếp tục logic fetch như cũ

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { first: take, after: endCursor },
        }),
      });

      if (!response.ok) throw new Error(`Server Error ${response.status}`);
      const responseBody = (await response.json()) as GraphQLResponse;
      // --- DEBUG Ở ĐÂY ---
      if (responseBody.data?.pages?.edges?.length > 0) {
        console.log("🔍 [DEBUG] Dữ liệu node đầu tiên từ API:");
        console.log(JSON.stringify(responseBody.data.pages.edges[0].node, null, 2));
      } else {
        console.log("⚠️ [DEBUG] Không có dữ liệu trang nào được trả về từ API.");
      }
      const data = responseBody.data?.pages;
      const items = data?.edges?.map((edge) => edge.node) || [];

      // Giữ lại logic parse cũ để không làm hỏng flexibleContentMain
      items.forEach((item) => {
        item.flexibleContentMain = safeParseFlexibleContent(
          item.flexibleContentMain,
        );
      });

      allItems.push(...items);
      hasNextPage = data?.pageInfo?.hasNextPage || false;
      endCursor = data?.pageInfo?.endCursor || null;
    }
    return allItems;
  } catch (error) {
    console.error(`❌ [getAllPages] CRITICAL ERROR with ${apiUrl}:`, error);
    return [];
  }
};

export const getContentNodes = async (
  apiUrl: string,
  contentTypes: string[],
  fragmentTemplates: Record<string, string>, // Nhận map fragment động
  take: number = 200,
): Promise<WPNode[]> => {
  const typeLabel = contentTypes.join(", ");
  try {
    if (!apiUrl) return [];

    const dynamicFragments = contentTypes
      .map((type) => fragmentTemplates[type] || "")
      .join("\n");

    if (!dynamicFragments.trim()) {
      console.warn(`⚠️ No fragments found for types: ${typeLabel}`);
    }

    let hasNextPage = true;
    let endCursor: string | null = null;
    const allItems: WPNode[] = [];

    while (hasNextPage) {
      const query = `query GetContentNodes($first: Int!, $after: String) {
        contentNodes(
          first: $first
          after: $after
          where: { contentTypes: [${contentTypes.join(", ")}] }
        ) {
          edges {
            cursor
            node {
              id
              uri
              slug
              __typename
              ${dynamicFragments}
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { first: take, after: endCursor },
        }),
      });

      if (!response.ok) throw new Error(`Server Error ${response.status}`);
      const responseBody = (await response.json()) as GraphQLResponse;

      if (responseBody.errors) {
        console.warn(`⚠️ [${typeLabel}] GraphQL Errors:`, responseBody.errors);
      }

      const contentNodes = responseBody.data?.["contentNodes"] as any;
      const items: WPNode[] =
        contentNodes?.edges?.map((edge: any) => edge.node) || [];

      items.forEach((item) => {
        item.flexibleContentMain = safeParseFlexibleContent(
          item.flexibleContentMain,
        );
      });

      allItems.push(...items);
      hasNextPage = contentNodes?.pageInfo?.hasNextPage || false;
      endCursor = contentNodes?.pageInfo?.endCursor || null;
    }

    return allItems;
  } catch (error) {
    console.error(`❌ [getContentNodes - ${typeLabel}] CRITICAL ERROR:`, error);
    return [];
  }
};

// --- MENU & THEME OPTIONS ---

export const buildMenuTree = async (items: WPNode[]): Promise<WPNode[]> => {
  const itemMap = new Map<string, WPNode>();
  const roots: WPNode[] = [];

  items.forEach((item) => {
    itemMap.set(String(item.id), { ...item, children: [] });
  });

  items.forEach((item) => {
    const nodeId = String(item.id);
    const node = itemMap.get(nodeId);
    if (node) {
      if (item.parentId && itemMap.has(String(item.parentId))) {
        const parentId = String(item.parentId);
        itemMap.get(parentId)!.children!.push(node);
      } else if (!item.parentId || item.parentId === 0) {
        roots.push(node);
      }
    }
  });

  const sortTree = (nodes: WPNode[]) => {
    nodes.sort((a, b) => (a.order || 0) - (b.order || 0));
    nodes.forEach((n) => n.children && sortTree(n.children));
  };

  sortTree(roots);
  return roots;
};

// export const getThemeOptions = async (apiUrl: string): Promise<any> => {
//   try {
//     if (!apiUrl) return {};
//     const query = `query MyQuery {
//         themeOptions {
//           footerGroup
//           headerFooterTracking
//           headerGroup
//           socials
//         }
//         getMainMenuItems {
//           id
//           label
//           order
//           parentId
//           target
//           url
//           description
//         }
//       }`;

//     const response = await fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query }),
//     });

//     if (!response.ok) return {};
//     const responseBody = (await response.json()) as any;
//     const { data } = responseBody;

//     const parseJsonString = (str: any) => {
//       if (!str) return {};
//       if (typeof str === "object") return str;
//       try {
//         return JSON.parse(str);
//       } catch {
//         return {};
//       }
//     };

//     const headerGroup = parseJsonString(data?.themeOptions?.headerGroup);
//     const footerGroup = parseJsonString(data?.themeOptions?.footerGroup);
//     const headerFooterTracking = parseJsonString(
//       data?.themeOptions?.headerFooterTracking,
//     );
//     const socials = parseJsonString(data?.themeOptions?.socials);
//     const resultMenu = await buildMenuTree(data?.getMainMenuItems || []);

//     return {
//       headerGroup: { ...headerGroup, menu: resultMenu },
//       footerGroup: { ...footerGroup, socials },
//       headerFooterTracking: headerFooterTracking,
//     };
//   } catch (error) {
//     console.log("❌ [getThemeOptions] ERROR:", error);
//     return {};
//   }
// };
export const getThemeOptions = async (apiUrl: string): Promise<any> => {
  try {
    if (!apiUrl) return {};

    // 1. Query mới của bạn
    const query = `query GetFlexibleContentDetails {
      themeSettings {
        themeSettingV2 {
          themeOptionsV2 {
            __typename
            ... on ThemeSettingV2ThemeOptionsV2HeaderLayout {
              __typename
              logo { node { sourceUrl altText } }
              logomobile { node { sourceUrl altText } }
              hidelogo
              headermobile { __typename ... on ThemeSettingV2ThemeOptionsV2HeadermobileHeadermobileVnLayout_Fields { __typename list { icon { node { sourceUrl altText } } title link { target title url } } } ... on ThemeSettingV2ThemeOptionsV2HeadermobileHeadermobileEnLayout_Fields { __typename list { icon { node { sourceUrl altText } } title link { target title url } } } }
            }
            ... on ThemeSettingV2ThemeOptionsV2TopmenuLayout {
              __typename
              topVi { __typename ... on ThemeSettingV2ThemeOptionsV2TopViTopVnLayout { topPanel { title linkPage {  target title url } subMenu { title linkPage {  target title url } } } } ... on ThemeSettingV2ThemeOptionsV2TopViTopEnLayout { topPanel { title linkPage { url } subMenu { title linkPage {  target title url } } } } }
            }
            ... on ThemeSettingV2ThemeOptionsV2FooterLayout {
              __typename
              footerContent { __typename ... on ThemeSettingV2ThemeOptionsV2FooterContentFooterVnLayout { copyRight thanhVienCA footeImage { node { sourceUrl altText } } image { node { sourceUrl altText } } partner { node { sourceUrl altText } } contact { icon { node { sourceUrl altText } } content { title } } listLink { title link {  target title url } } icon { image { node { sourceUrl altText } } link {  target title url } } logoUni { image { node { sourceUrl } } link {  target title url } } } ... on ThemeSettingV2ThemeOptionsV2FooterContentFooterEnLayout { copyRight thanhVienCA footeImage { node { sourceUrl altText } } image { node { sourceUrl altText } } partner { node { sourceUrl altText } } contact { icon { node { sourceUrl altText } } content { title } } listLink { title link {  target title url } } icon { image { node { sourceUrl altText } } link {  target title url } } logoUni { image { node { sourceUrl } } link {  target title url } } } }
            }
            ... on ThemeSettingV2ThemeOptionsV2LeftPanelLayout {
              __typename
              topPanel { __typename ... on ThemeSettingV2ThemeOptionsV2TopPanelLeftPanelVnLayout { topPanel { __typename image { node { sourceUrl } } link {  target title url } title targetBlank sub { title link {  target title url } } } bottomPanel { __typename image { node { sourceUrl } } title link {  target title url } } } ... on ThemeSettingV2ThemeOptionsV2TopPanelLeftPanelEnLayout { topPanel { __typename image { node { sourceUrl } } link {  target title url } title targetBlank sub { title link {  target title url } } } bottomPanel { __typename image { node { sourceUrl } } title link {  target title url } } } }
            }
          }
        }
      }
    }`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) return {};
    const responseBody = (await response.json()) as any;
    const layouts = responseBody.data?.themeSettings?.themeSettingV2?.themeOptionsV2 || [];

    // 2. Tách dữ liệu từ mảng các Layout dựa vào __typename
    const result = {
      header: layouts.find((l: any) => l.__typename === "ThemeSettingV2ThemeOptionsV2HeaderLayout"),
      topMenu: layouts.find((l: any) => l.__typename === "ThemeSettingV2ThemeOptionsV2TopmenuLayout"),
      footer: layouts.find((l: any) => l.__typename === "ThemeSettingV2ThemeOptionsV2FooterLayout"),
      leftPanel: layouts.find((l: any) => l.__typename === "ThemeSettingV2ThemeOptionsV2LeftPanelLayout"),
    };

    return result;
  } catch (error) {
    console.log("❌ [getThemeOptions] ERROR:", error);
    return {};
  }
};
/**
 * Chuẩn hóa dữ liệu ACF/WordPress
 * Biến đổi các giá trị 'false' hoặc rỗng '' thành 'null' để tránh xung đột Type trong Gatsby
 */
// export const normalizeWpData = (data: any): any => {
//   // 1. Nếu là mảng, duyệt đệ quy từng phần tử
//   if (Array.isArray(data)) {
//     return data.map(normalizeWpData);
//   }

//   // 2. Nếu là Object (và không phải null), duyệt đệ quy từng key
//   if (data !== null && typeof data === "object") {
//     const newObj: any = {};
//     for (const key in data) {
//       const value = data[key];
//       // Gọi đệ quy cho value con
//       newObj[key] = normalizeWpData(value);
//     }
//     return newObj;
//   }

//   // 3. Xử lý các giá trị "xấu" gây conflict

//   // Trường hợp: WP trả về false cho field trống -> đổi thành null
//   if (data === false) {
//     return null;
//   }

//   // Trường hợp: WP trả về chuỗi rỗng "" cho field lẽ ra là Object -> đổi thành null
//   // Lưu ý: Chỉ nên áp dụng nếu bạn chắc chắn field đó không bao giờ cần chuỗi rỗng.
//   // Tuy nhiên, trong context Flexible Content, an toàn nhất là để null.
//   if (data === "") {
//     return null;
//   }

//   // 4. Trả về dữ liệu nguyên bản nếu không vi phạm
//   return data;
// };
export const normalizeWpData = (data: any): any => {
  if (Array.isArray(data)) return data.map(normalizeWpData);
  if (data !== null && typeof data === "object") {
    const newObj: any = {};
    for (const key in data) {
      newObj[key] = normalizeWpData(data[key]);
    }
    return newObj;
  }

  // Chỉ đổi false thành null nếu nó là một đối tượng/mảng dữ liệu
  // Giữ nguyên false nếu nó là một boolean field (ví dụ: hidelogo)
  if (data === "" || data === undefined) return null;

  return data;
};