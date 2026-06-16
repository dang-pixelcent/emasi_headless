import React, { ComponentProps, useEffect } from "react";
import Header from "../Header";
import { ScriptItem, ThemeOption } from "@/types/general";
import { extractScripts, injectHtml } from "@/utils/string";
import { Helmet } from "react-helmet";
import Footer from "../Footer";
const Container = ({ ...props }: ComponentProps<"div">) => {
  return (
    <div
      className="flex flex-col min-h-screen h-screen w-full max-w-wrapper mx-auto"
      {...props}
    />
  );
};

interface LayoutProps {
  children: React.ReactNode;
  themeOption: ThemeOption;
}

const Layout = ({ children, themeOption, ...props }: LayoutProps) => {
  const { headerFooterTracking } = themeOption || {};
  console.log("headerFooterTracking:", headerFooterTracking);
  const [scripts, setScripts] = React.useState<ScriptItem[]>([]);
  useEffect(() => {
    const { scripts } = extractScripts(headerFooterTracking?.header || "");
    const { noscripts: bodyNoscripts, scripts: bodyScripts } = extractScripts(
      headerFooterTracking?.body || "",
    );
    setScripts(scripts);
    console.log("Extracted scripts:", bodyNoscripts, bodyScripts);
    const { noscripts: footerNoscripts, scripts: footerScripts } =
      extractScripts(headerFooterTracking?.footer || "");
    injectHtml("start", bodyScripts, bodyNoscripts);
    injectHtml("end", footerScripts, footerNoscripts);
  }, []);
  console.log("scripts in layout:", scripts);

  console.log("header:", themeOption?.headerGroup);
  console.log("footer:", themeOption?.footerGroup);
  return (
    <>
      <Helmet>
        {scripts.map((s, i) =>
          s.src ? (
            <script key={i} src={s.src} async={s.async} />
          ) : (
            <script key={i}>{s.content}</script>
          ),
        )}
      </Helmet>
      <Container>
        <Header />
        <main className="mt-40 lg:mt-25 grow">{children}</main>
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
