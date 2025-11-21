"use client";

import { useEffect, useState } from "react";
import { API_PRODUCT, API_WAREHOUSE } from "@/lib/api";
import PurchaseForm from "@/app/components/PurchaseForm";
import { useSearchParams } from "next/navigation";

export default function PurchasePage() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const idParam = searchParams.get("id"); // ambil id dari query param

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehousesRes = await fetch(API_WAREHOUSE, { cache: "no-store" });
        const productsRes = await fetch(API_PRODUCT, { cache: "no-store" });

        const warehousesJson = await warehousesRes.json();
        const productsJson = await productsRes.json();

        setWarehouses(warehousesJson.data);
        setProducts(productsJson.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!warehouses.length || !products.length) return <p>Loading...</p>;

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center bg-indigo-50 dark:bg-slate-900">
      <PurchaseForm 
        warehouses={warehouses} 
        products={products} 
        id={idParam ? Number(idParam) : undefined} 
      />
    </div>
  );
}
