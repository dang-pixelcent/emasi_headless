import React from 'react';
// import { graphql } from 'gatsby'; // Mở comment này khi bạn bắt đầu dùng GraphQL thật

// 1. Import Layout và các Components
import BannerPlus from '../components/pages/sections/banner_plus';
import HocBongTaiNang from '../components/pages/sections/hoc_bong_tai_nang';
import ListHocBong from '../components/pages/sections/list_hoc_bong';
import DiscoverMore from '../components/pages/sections/discover_more';

// 2. Định nghĩa Interface cho props
interface FlexibleBlock {
    layoutType: string;
    data?: any;
}

interface TemplateProps {
    data?: {
        // Cấu trúc mô phỏng dữ liệu trả về từ GraphQL của gatsby-source-wordpress
        wpPage?: {
            title: string;
            acf?: {
                flexible_content?: FlexibleBlock[];
            };
        };
    };
    pageContext?: any; // Các biến được truyền từ gatsby-node.js (như id, slug)
}

// 3. Hàm Render động (Dynamic Component Renderer)
const renderFlexibleBlock = (block: FlexibleBlock, index: number) => {
    // Thay đổi 'layoutType' cho khớp với tên trường trả về từ GraphQL của bạn
    switch (block.layoutType) {
        case 'hoc_bong_tai_nang':
            return <HocBongTaiNang key={index} {...block.data} />;
        case 'list_hoc_bong':
            return <ListHocBong key={index} {...block.data} />;
        case 'discover_more':
            return <DiscoverMore key={index} {...block.data} />;
        default:
            console.warn(`Chưa có component cho layout: ${block.layoutType}`);
            return null;
    }
};

// 4. Component Template Chính
const HocBongTemplate: React.FC<TemplateProps> = ({ data, pageContext }) => {

    // MOCK DATA: Chèn dữ liệu giả lập vào đây trước khi kết nối GraphQL thật
    const mockFlexibleContent: FlexibleBlock[] = [
        // { layoutType: 'hoc_bong_tai_nang', data: {} },
        { layoutType: 'list_hoc_bong', data: {} },
        // { layoutType: 'discover_more', data: {} }
    ];

    // Lấy dữ liệu thật từ GraphQL nếu có, nếu không thì dùng Mock Data
    const contentBlocks = data?.wpPage?.acf?.flexible_content || mockFlexibleContent;

    return (<>
        <BannerPlus />
        {contentBlocks.map((block, index) => renderFlexibleBlock(block, index))}
    </>

    );
};

export default HocBongTemplate;

// 5. GraphQL Page Query (Sẽ dùng khi bạn kết nối dữ liệu thật)
/*
export const query = graphql`
  query($id: String!) {
    wpPage(id: { eq: $id }) {
      title
      acf {
        flexible_content {
          ... on WpPage_Acf_FlexibleContent_HocBongTaiNang {
            layoutType: fieldGroupName
            # Các field dữ liệu của section này
          }
          ... on WpPage_Acf_FlexibleContent_ListHocBong {
            layoutType: fieldGroupName
            # Các field dữ liệu của section này
          }
        }
      }
    }
  }
`;
*/