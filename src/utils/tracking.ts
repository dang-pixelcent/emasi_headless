// src/utils/tracking.ts

export const trackSearch = (
  searchTerm: string,
  source: "input" | "recent" = "input"
) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "search_query",
      search_term: searchTerm,
      search_source: source,
    });
    // console.log("🔥 Search Event Pushed:", searchTerm, "Source:", source);
  }
};

// Mở rộng interface window để TS không báo lỗi
declare global {
  interface Window {
    dataLayer: any[];
  }
}
