export interface WPNode {
  id: string;
  uri: string;
  slug?: string;
  title?: string;
  __typename?: string;
  flexibleContentMain?: string | any[] | object | null;
  getRankMathSEO?: string;
  parentId?: number | null;
  order?: number;
  children?: WPNode[];
  [key: string]: any;
}

export interface GraphQLEdge {
  cursor: string;
  node: WPNode;
}

export interface GraphQLResponse {
  data?: {
    [key: string]: {
      edges: GraphQLEdge[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
  errors?: any[];
}
