import React from "react";
import Button from "@/components/common/Button";
import Layout from "@/components/common/Layout";

const HomePage = () => {
  return (
    <Layout>
      {/* Thử thêm class 'container' và 'row' của Bootstrap */}
      <div className="container py-20 text-center">
        <div className="row">
          <div className="col-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">
              Chào mừng đến với dự án EMASI
            </h1>
            {/* Thử thêm class 'btn btn-primary' của Bootstrap */}
            <button className="btn btn-primary">
              Test Bootstrap Button
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomePage;