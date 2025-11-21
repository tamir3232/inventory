const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
console.log("BASE_URL:", BASE_URL);
export const API_WAREHOUSE = `${BASE_URL}/api/v1/warehouse`;
export const API_PRODUCT = `${BASE_URL}/api/v1/products`;
export const API_PURCHASE = `${BASE_URL}/api/v1/purchase/request`;
export const API_PURCHASE_ITEM = `${BASE_URL}/api/v1/purchase-item`;
export const API_STOCK = `${BASE_URL}/api/v1/stocks`;