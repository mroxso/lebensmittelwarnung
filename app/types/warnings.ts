export interface Warning {
  id: string;
  title: string;
  text: string;
  publishedDate: string;
  type: 'FOOD' | 'PRODUCT';
}

export interface WarningResponse {
  response?: {
    docs: Warning[];
    numFound: number;
  };
}

