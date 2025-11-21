export interface IWarehouse {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
  sku: string;
}

export interface IStock {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Warehouse: IWarehouse;
  Product: IProduct;
}

export interface IStocksResponse {
  message: string;
  data: IStock[];
}
