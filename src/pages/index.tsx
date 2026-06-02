import React from "react";
import Button from "@/components/common/Button";
import Layout from "@/components/common/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="py-20 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Chào mừng đến với dự án EMASI
        </h1>
        <p className="mb-6 text-gray-600">Hệ thống Frontend đang chạy thử nghiệm gán cứng trên Ubuntu!</p>
        <Button color="orange" variant="contained">
          Khám phá ngay
        </Button>
      </div>
    </Layout>
  );
};

export default HomePage;