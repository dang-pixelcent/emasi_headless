import React from "react";
import Sidebar from "../sidebar/sidebar";
import ListHocBong from "../list_hoc_bong/list_hoc_bong";
import ListTaiNang from "../list_tai_nang/list_tai_nang";
import Careers from "../careers/careers";
import "./main_content_plus.css";

const pageData = {
  title: "Học bổng",
  breadcrumb: {
    title: "Học bổng",
    slug: "/hoc-bong/",
  },
  // content: (),
};

export default function MainContentPlus() {
  return (
    <section className="sc-main-content">
      <div className="inner-container">
        <div className="page-content d-flex flex-wrap">
          <div className="header-content">
            <div className="breadcrumb text-uppercase">
              <a href="/" target="_self">
                Trang chủ
              </a>

              <span>-</span>

              <a href={pageData.breadcrumb.slug} target="_self">
                {pageData.breadcrumb.title}
              </a>
            </div>
          </div>

          <div className="main-content">
            <h1
              style={{
                fontWeight: 700,
                color: "#003e58",
              }}
            >
              {pageData.title}
            </h1>

            <ListHocBong />
            {/* <ListTaiNang /> */}
            {/* <Careers /> */}
          </div>

          <Sidebar />
        </div>
      </div>
    </section>
  );
}