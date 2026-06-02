declare module "*.scss";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";
declare module "*.woff2" {
  const src: string;
  export default src;
}

// react-use-flexsearch không có @types
declare module "react-use-flexsearch" {
  export function useFlexSearch<T = any>(
    query: string,
    index: string,
    store: Record<string, T> | string
  ): T[];
}
