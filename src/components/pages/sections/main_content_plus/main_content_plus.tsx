import React from "react";
import Sidebar from "../sidebar/sidebar";
import ListHocBong from "../list_hoc_bong/list_hoc_bong";
import './main_content_plus.css';
export default function MainContentPlus() {
  return (
    <section className="sc-main-content">
  <div className="inner-container">
    <div className="page-content d-flex flex-wrap">
      <div className="header-content">
            <div className="breadcrumb text-uppercase">
              <a href="/" target="_self">Trang chủ</a>
              <span>-</span>
              <a href="/hoc-bong/" target="_self">
                Học bổng
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
          Học bổng
        </h1>

        <ListHocBong />
      </div>

      <Sidebar />
    </div>
  </div>
</section>
  );
}