
import React from "react";
import { graphql, PageProps } from "gatsby";
import { Helmet } from "react-helmet";

// Components
import Layout from "@/components/common/Layout";
import RegisterSection from "@/components/pages/home/register";
import MainContentPlus from "@/components/pages/sections/main_content_plus";

interface MemberData {
  wpCustomMember: {
    title: string;
    uri: string;
    content: string;
    featuredImage: any; // JSON
    memberInfo: any;    // JSON
    language: { code: string } | null;
    translations: { uri: string; language: { code: string } }[] | null;
  };
}

const MemberTemplate = ({ data, pageContext }: PageProps<MemberData>) => {
  const member = data.wpCustomMember;
  const { themeOptions } = pageContext as any;
  const currentLang = member.language?.code?.toLowerCase() || 'vi';

  // Logic chuyển ngữ
  const targetLang = currentLang === 'vi' ? 'en' : 'vi';
  const translationNode = member.translations?.find(
    (t) => t.language?.code?.toLowerCase() === targetLang
  );
  const switchUri = translationNode?.uri || null;

  // Lấy dữ liệu an toàn từ JSON
  const position = member.memberInfo?.position || "";
  const imageUrl = member.featuredImage?.node?.sourceUrl || "";

  return (
    <>
      <Helmet htmlAttributes={{ lang: currentLang }}>
        <title>{member.title}</title>
      </Helmet>

      <Layout currentLang={currentLang} switchUri={switchUri} themeOption={themeOptions}>
        <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
          <div className="row">
            {/* Cột Nội dung chính (Chức vụ + Ảnh + Nội dung) */}
            <div className="col-12 col-lg-9">
              <MainContentPlus data={{ title: member.title, uri: member.uri, lang: currentLang }}>
                {/* Lắp UI của bạn vào đây */}
                <div className="member-profile">
                  {imageUrl && <img src={imageUrl} alt={member.title} style={{ maxWidth: "300px" }} />}
                  <h2>{member.title}</h2>
                  <p className="position"><strong>{position}</strong></p>
                  <div dangerouslySetInnerHTML={{ __html: member.content }} />
                </div>
              </MainContentPlus>
            </div>

            {/* Cột Sidebar (nếu cần hiển thị danh sách giáo viên khác) */}
            <div className="col-12 col-lg-3">
              {/* Bạn có thể đặt Sidebar danh sách giáo viên tại đây */}
            </div>
          </div>
        </div>

        {/* Member không cần Discover, chỉ giữ lại Form đăng ký */}
        <RegisterSection />
      </Layout>
    </>
  );
};

export default MemberTemplate;

export const query = graphql`
  query GetSingleMember($id: String!) {
    wpCustomMember(id: { eq: $id }) {
      title
      uri
      content
      featuredImage
      memberInfo
      language { code }
      translations {
        uri
        language { code }
      }
    }
  }
`;