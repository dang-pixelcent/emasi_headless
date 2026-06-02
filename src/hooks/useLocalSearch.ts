// src/hooks/useLocalSearch.ts
import { useState, useEffect, useMemo } from "react";
import { navigate } from "gatsby";
import Fuse from "fuse.js";
import { useLocation } from "@reach/router";
import useDebounce from "@/hooks/useDebounce"; // Đảm bảo đường dẫn đúng
import { trackSearch } from "@/utils/tracking"; // Đảm bảo đường dẫn đúng

// --- TYPES ---
export interface LocalSearchItem {
  id: string;
  uri: string;
  type: "Post" | "Page" | "Services" | "Teams";
  title: string;
  s: string;
}

export interface RecentItem {
  id: string;
  title: string;
  uri: string;
}

// --- CONFIG ---
const RECENT_SEARCH_KEY = "hydrology_recent_searches";
const DATA_SOURCE = "/search-data.json";

export const useLocalSearch = () => {
  const { pathname } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<LocalSearchItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentItem[]>([]);
  const [searchIndex, setSearchIndex] = useState<LocalSearchItem[]>([]);

  // Debounce search term để tối ưu hiệu năng FuseJS
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  // 1. Fetch Data
  useEffect(() => {
    fetch(DATA_SOURCE)
      .then((res) => res.json())
      .then((data) => setSearchIndex(data))
      .catch((err) => console.error("❌ Failed to load search index", err));

    const saved = localStorage.getItem(RECENT_SEARCH_KEY);
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  // 2. Init Fuse
  const fuse = useMemo(() => {
    if (searchIndex.length === 0) return null;
    return new Fuse(searchIndex, {
      keys: ["title", "s"],
      threshold: 0.4,
      distance: 100,
      ignoreLocation: true,
    });
  }, [searchIndex]);

  // 3. Search Logic
  useEffect(() => {
    const term = debouncedSearchTerm.trim();
    if (!term || !fuse) {
      setResults([]);
      return;
    }

    const fuseResults = fuse.search(term);
    const rawResults = fuseResults.map((result) => result.item);

    // Sort: Services lên đầu (Business Logic)
    const services = rawResults.filter((r) => r.type === "Services");
    const others = rawResults.filter((r) => r.type !== "Services");

    setResults([...services, ...others].slice(0, 10));
  }, [debouncedSearchTerm, fuse]);

  // 4. Actions
  const saveToRecent = (item: RecentItem | LocalSearchItem) => {
    if (!item.title?.trim()) return;

    const newItem: RecentItem = {
      id: item.id,
      title: item.title,
      uri: item.uri,
    };

    const filtered = recentSearches.filter((r) => r.uri !== item.uri);
    const newRecent = [newItem, ...filtered].slice(0, 5);

    setRecentSearches(newRecent);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newRecent));
  };

  const removeRecent = (uriToRemove: string) => {
    const newRecent = recentSearches.filter((t) => t.uri !== uriToRemove);
    setRecentSearches(newRecent);
    localStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(newRecent));
  };

  // Hàm xử lý chọn item (Click hoặc Enter)
  const handleSelect = (
    item: LocalSearchItem | RecentItem,
    source: "type" | "recent",
  ) => {
    // Tracking
    if (source === "recent") {
      trackSearch(item.title, "recent");
    } else {
      saveToRecent(item);
      trackSearch(item.title); // Tracking search mới
    }

    // Navigation Logic
    const currentPath = pathname.replace(/\/$/, "");
    const targetPath = item.uri.replace(/\/$/, "");

    if (currentPath === targetPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(item.uri);
    }
  };

  return {
    // State
    searchTerm,
    setSearchTerm,
    results,
    recentSearches,
    isTyping: searchTerm.trim().length > 0,

    // Actions
    handleSelect,
    removeRecent,

    // Data (Optional: trả ra nếu UI cần gom nhóm thủ công)
    sectionResults: results.filter((r) => r.type === "Services"),
    pageResults: results.filter((r) => r.type !== "Services"),
  };
};
