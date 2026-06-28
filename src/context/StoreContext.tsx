import React from "react";
import { createContext } from "react";
interface StoreContext {
  currentPage?: string | null;
  setCurrentPage?: React.Dispatch<React.SetStateAction<string | null>>;
}
const StoreContext = createContext<StoreContext | undefined>(undefined);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = React.useState<string | null>("Trang-Dang-Test");
  const value = { currentPage, setCurrentPage };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};
