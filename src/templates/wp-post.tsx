
import React from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

// Components
import Layout from "@/components/common/Layout";
import Sidebar from "@/components/pages/sections/sidebar";
import Discover from "@/components/pages/sections/discover_more";
import RegisterSection from "@/components/pages/home/register";
import MainContentPlus from "@/components/pages/sections/main_content_plus";

interface PostData {
  wpCustomPost: {
    title: string;
    uri: string;
    content: string; // Nội dung từ WP
    language: { code: string } | null;
    translations: { uri: string; language: { code: string } }[] | null;
    // Nếu bạn muốn lấy sidebar từ post, có thể cần thêm field sidebar hoặc dùng config cố định
  };
}

const PostTemplate = ({ data, pageContext }: PageProps<PostData>) => {
  const post = data.wpCustomPost;
  const { themeOptions } = pageContext as any;
  const currentLang = post.language?.code?.toLowerCase() || 'vi';

  // Logic chuyển ngữ
  const targetLang = currentLang === 'vi' ? 'en' : 'vi';
  const translationNode = post.translations?.find(
    (t) => t.language?.code?.toLowerCase() === targetLang
  );
  const switchUri = translationNode?.uri || null;

  return (
    <>
      <Helmet htmlAttributes={{ lang: currentLang }}>
        <title>{post.title}</title>
      </Helmet>

      <Layout currentLang={currentLang} switchUri={switchUri} themeOption={themeOptions}>
        <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <div className="row">
            {/* Cột Nội dung chính */}
            <div className="col-12 col-lg-9 mb-4 mb-lg-0">
              <MainContentPlus data={{ title: post.title, uri: post.uri, lang: currentLang }}>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </MainContentPlus>
            </div>

            {/* Cột Sidebar */}
            <div className="col-12 col-lg-3">
              {/* Bạn có thể truyền dữ liệu sidebar hoặc để nó tự fetch theo category */}
              <Sidebar data={null} lang={currentLang} />
            </div>
          </div>
        </div>

        {/* Discover & Form */}
        <Discover lang={targetLang} /> {/* Truyền dữ liệu nếu cần */}
        <RegisterSection />
      </Layout>
    </>
  );
};

export default PostTemplate;

export const query = graphql`
  query GetSinglePost($id: String!) {
    wpCustomPost(id: { eq: $id }) {
      title
      uri
      content
      language { code }
      translations {
        uri
        language { code }
      }
    }
  }
`;