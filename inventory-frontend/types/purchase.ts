export interface PurchaseItem {
  id ?: number; 
  productId: number;
  quantity: number;
}

export interface PurchaseRequest {
  vendor: string;
  warehouseId: number;
  reference: string;
  items: PurchaseItem[];
}
