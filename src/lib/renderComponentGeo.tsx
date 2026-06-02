// src/libs/renderComponentGeo.tsx
import React from "react";
import { GEO_PAGE_COMPONENT } from "@/types/general";

const renderComponentGeo = (data: any) => {
  // Switch case này chỉ xử lý các layout từ BE 2
  switch (data?.acf_fc_layout) {
    default:
      return null;
  }
};
export default renderComponentGeo;
