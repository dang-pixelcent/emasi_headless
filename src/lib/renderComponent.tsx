
import { PAGE_COMPONENT } from "@/types/general";
// import MainTitle from "../components/pages/program/main_title";
import MainContentPlus from "@/components/pages/sections/main_content_plus";
import React from "react";
import Banner from "@/components/pages/home/banner";


const renderComponent = (data: any, page: any) => {
  // Kiểm tra __typename từ Page Builder
  const type = data?.__typename;

  switch (type) {
    case 'PageBuilderPagebuilderdataContentEditorLayout':
      return (
        <MainContentPlus data={{ title: page.title, uri: page.uri }}>
          {data.articleBlocks?.map((block: any, i: number) => (
            block.textContent ? (
              <div
                key={i}
                dangerouslySetInnerHTML={{ __html: block.textContent }}
              />
            ) : null
          ))}
        </MainContentPlus>
      );

    // Thêm các case khác khi bạn có thêm các layout mới từ Page Builder
    case 'PageBuilderPagebuilderdataBannerLayout':
      console.log("Đã vào case Banner!", data.bannergallery);

      // 1. Tách mảng nodes ra một biến riêng để chắc chắn không sai chính tả
      const rawNodes = data.bannergallery?.nodes || [];

      // 2. Map dữ liệu với cú pháp return rõ ràng (tránh lỗi arrow function)
      const bannerItems = rawNodes.map((item: any) => {
        return {
          type: item.sourceUrl?.match(/\.(mp4|webm|ogv)$/i) ? "video" : "image",
          url: item.sourceUrl,
          alt: item.altText || "Hệ thống Trường EMASI"
        };
      });

      console.log("Banner truyền vào component:", bannerItems);
      return <Banner items={bannerItems} />;

    default:
      console.warn("⚠️ Chưa có component cho layout:", type);
      return null;
  }
};

export default renderComponent;
