import React from "react";
import parse from "html-react-parser";
import { Helmet } from "react-helmet";

interface SEOProps {
  metaHtml?: string; // Chuỗi HTML nhận từ GraphQL (getRankMathSEO)
}

const SEO = ({ metaHtml }: SEOProps) => {
  // Nếu không có dữ liệu thì không render gì cả
  if (!metaHtml) return null;

  return (
    <>
      {/* Dùng parser thay vì dangerouslySetInnerHTML.
        Lý do: dangerouslySetInnerHTML bắt buộc phải có thẻ bao (div/span).
        Mà trong <head>, việc nhét meta vào trong <div> là sai chuẩn HTML.
        Parser sẽ trả về các thẻ <meta>, <link> trần trụi => Đúng chuẩn.
      */}
      <html lang="en" />
      {/* <Helmet>{parse(metaHtml)}</Helmet> */}
    </>
  );
};

export default SEO;
