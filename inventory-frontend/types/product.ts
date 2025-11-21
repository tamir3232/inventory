export interface IProduct {
  id: number;
  name: string;
  sku: string;
}

export interface IProductResponse {
  data: IProduct[];
}
