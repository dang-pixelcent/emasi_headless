
import React, { useMemo } from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  metaHtml?: string; // Thực chất là một chuỗi JSON string từ WordPress
  lang?: string;
  fallbackTitle?: string;
}

const SEO = ({ metaHtml, lang = "vi", fallbackTitle }: SEOProps) => {
  // Parse chuỗi JSON thành Object an toàn bằng useMemo
  const seoData = useMemo(() => {
    if (!metaHtml || typeof metaHtml !== "string") return null;
    try {
      return JSON.parse(metaHtml);
    } catch (error) {
      console.error("Lỗi parse JSON SEO:", error);
      return null;
    }
  }, [metaHtml]);
  // console.log("Seo", metaHtml)
  const title = seoData?.title || fallbackTitle;
  const description = seoData?.metaDesc || "";
  const canonical = seoData?.canonical || "";
  const ogTitle = seoData?.opengraphTitle || title;
  const ogDesc = seoData?.opengraphDescription || description;
  const ogImage = seoData?.opengraphImage || "";

  return (
    <Helmet>
      <html lang={lang} />
      
      {/* Các thẻ Meta chuẩn sẽ được React-Helmet đẩy thẳng lên <head> */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* OpenGraph cho Facebook / Zalo */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDesc && <meta property="og:description" content={ogDesc} />}
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Favicon mặc định */}
      <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
    </Helmet>
  );
};

export default SEO;