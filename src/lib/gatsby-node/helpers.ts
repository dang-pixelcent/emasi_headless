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
                    content
                  }
                  ... on PageBuilderPagebuilderdataBannerLayout {
                    bannergallery {
                      nodes {
                        sourceUrl
                        altText
                      }
                    }
                    title
                    button{title target url}
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
                  ... on PageBuilderPagebuilderdataEnviromentsLayout{
                      subTitle
                      title
                      list{
                        title
                        desc
                        link{url}
                        image{node{sourceUrl}}
                    
                      }
                    }
                  ... on PageBuilderPagebuilderdataNewEventLayout{
                        title
                        subTitle
                        link{url target title}
                        postsItem{
                          postTinTuc{
                            nodes{
                              ... on Post{
                                id
                                title
                                uri
                                featuredImage{
                                node {
                                sourceUrl
                                }
                              }
                              }
                            }
                          }
                    }
                      
                  }
                  ... on PageBuilderPagebuilderdataTuitionFeeLayout{
                    backgoundImage{node{sourceUrl}}
                    title
                    listImage{
                      image{node{sourceUrl}}
                    }
                    button{url target title}
                  }
                  ... on PageBuilderPagebuilderdataSharePublicLayout{
                    title
                    listShare{
                      image{node{sourceUrl}}
                      name
                      desc
                    }
                  }
                  ... on PageBuilderPagebuilderdataMapLayout{
                    image{node{sourceUrl}}
                    iframe
                  }
                  ... on PageBuilderPagebuilderdataProgramEmasiAboutLayout{
                    title
                    desc
                    subTitle
                    image{node{sourceUrl}}
                    button{url target title}
                  }
                  ... on PageBuilderPagebuilderdataSchoolListLayout{
                    listSchoolItem{
                      title
                      subTitle
                      image{node{sourceUrl}}
                      link{url target title}
                    }
                  }
                  ... on PageBuilderPagebuilderdataValuesLayout{
                    title
                    subTitle
                    desc
                    title2
                    desc2
                    title3
                    listValues{
                      title
                      desc
                    }
                  }
                  ... on PageBuilderPagebuilderdataProgramHocHieuEmasiLayout{
                    title
                    description
                    listHocHieu{
                      image{node{sourceUrl}}
                      title
                      contentDecs
                    }
                  }
                  ... on PageBuilderPagebuilderdataProgramAllLayout{
                    listProgramAll{
                      title
                      titleColor
                      backgroundImagePosition
                      backGroundImage{node{sourceUrl}}
                      decs
                      backgroundColor
                      listLogoProgramAll{
                        logo{node{sourceUrl}}
                      }
                      link{url target title}
                      linkColor
                      image{node{sourceUrl}}
                    }
                  }
                  ... on PageBuilderPagebuilderdataProgramEducationalAspectsLayout{
                    groupHeader{
                      title
                      subTitle
                      desc
                    }
                    col3{
                      image{node{sourceUrl}}
                      box{
                        backgroundImage{node{sourceUrl}}
                        backgroundColor
                        title
                        titleColor
                        link{url title target}
                        linkColor
                        desc
                      }
                      listProgrammEduExpect{
                        image{node{sourceUrl}}
                        backgoundColor
                        backgroundImage{node{sourceUrl}}
                        title
                        desc
                        descColor
                        link{url target title}
                        linkColor
                        
                      }
                    }
                  }
                  ... on PageBuilderPagebuilderdataFeeLayout{
                    listFee{
                      title
                      content
                      file{node{sourceUrl}}
                    }
                  }
                  ... on PageBuilderPagebuilderdataCareerLayout{
                    heading
                    listCarre{
                      chCV
                      thIGian
                      moTCongViC{node{sourceUrl}}
                      
                    }
                  }
                  ... on PageBuilderPagebuilderdataProgramMainTitleLayout {
                      title
                      subTitle
                      desc
                  }
                  ... on PageBuilderPagebuilderdataProgramUniversityLayout{
                      title
                      desc
                      mapImage{node{sourceUrl}}
                      partners{
                        image{node{sourceUrl}}
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

export const normalizeWpData = (data: any): any => {
  if (Array.isArray(data)) return data.map(normalizeWpData);
  if (data !== null && typeof data === "object") {
    const newObj: any = {};
    for (const key in data) {
      newObj[key] = normalizeWpData(data[key]);
    }
    return newObj;
  }
  if (data === "" || data === undefined) return null;

  return data;
};

export const getAllPosts = async (
  apiUrl: string,
  take: number = 200,
): Promise<WPNode[]> => {
  try {
    if (!apiUrl) return [];

    let hasNextPage = true;
    let endCursor: string | null = null;
    const allItems: WPNode[] = [];

    while (hasNextPage) {
      const query = `query GetAllPosts($first: Int!, $after: String) {
        posts(first: $first, after: $after) {
          edges {
            cursor
            node {
              __typename
              id
              databaseId
              uri
              slug
              title
              content
              excerpt
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              language {
                code
              }
              translations {
                uri
                language {
                  code
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

      const data = responseBody.data?.["posts"];
      const items = data?.edges?.map((edge: any) => edge.node) || [];

      allItems.push(...items);
      hasNextPage = data?.pageInfo?.hasNextPage || false;
      endCursor = data?.pageInfo?.endCursor || null;
    }
    console.log(`✅ [getAllPosts] Loaded ${allItems.length} posts.`);
    return allItems;
  } catch (error) {
    console.error(`❌ [getAllPosts] CRITICAL ERROR:`, error);
    return [];
  }
};
export const getAllMembers = async (
  apiUrl: string,
  take: number = 200,
): Promise<WPNode[]> => {
  try {
    if (!apiUrl) return [];

    let hasNextPage = true;
    let endCursor: string | null = null;
    const allItems: WPNode[] = [];

    while (hasNextPage) {
      // Dùng "allMember" thay vì "member" hoặc "members"
      const query = `query GetAllMembers($first: Int!, $after: String) {
        allMember(first: $first, after: $after) {
          edges {
            cursor
            node {
              __typename
              id
              databaseId
              uri
              slug
              title
              content
              excerpt
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              memberInfo {
                position
              }
              language {
                code
              }
              translations {
                uri
                language {
                  code
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

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          variables: { first: take, after: endCursor },
        }),
      });

      if (!response.ok) throw new Error(`Server Error ${response.status}`);
      const responseBody = (await response.json()) as any;

      // Lấy data từ trường "allMember"
      const data = responseBody.data?.["allMember"];
      const items = data?.edges?.map((edge: any) => edge.node) || [];

      allItems.push(...items);
      hasNextPage = data?.pageInfo?.hasNextPage || false;
      endCursor = data?.pageInfo?.endCursor || null;
    }
    console.log(`✅ [getAllMembers] Loaded ${allItems.length} members.`);
    return allItems;
  } catch (error) {
    console.error(`❌ [getAllMembers] CRITICAL ERROR:`, error);
    return [];
  }
};