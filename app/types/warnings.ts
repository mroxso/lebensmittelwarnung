export interface Product {
  _type?: string;
  designation?: string;
  imageUrls?: string[];
  manufacturer?: string;
}

export interface Warning {
  _type: string;
  archived?: boolean;
  id: number;
  link?: string;
  publishedDate: number;
  title: string;
  warning?: string;
  affectedStates?: string[];
  product?: Product;
}

export interface WarningResponse {
  response: {
    docs: Warning[];
    numFound: number;
  };
}

