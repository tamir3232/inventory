"use client";

import { useState, useEffect, Suspense } from "react";
import { API_PRODUCT, API_WAREHOUSE } from "@/lib/api";
import PurchaseForm from "@/app/components/PurchaseForm";
import { useSearchParams } from "next/navigation";

function PurchaseContent() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // state loading
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const idParam = searchParams.get("id");
  const id = idParam ? parseInt(idParam, 10) : undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warehousesRes, productsRes] = await Promise.all([
          fetch(API_WAREHOUSE, { cache: "no-store" }),
          fetch(API_PRODUCT, { cache: "no-store" }),
        ]);

        const warehousesJson = await warehousesRes.json();
        const productsJson = await productsRes.json();

        setWarehouses(warehousesJson.data || []);
        setProducts(productsJson.data || []);
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data warehouse atau produk.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <PurchaseForm
      warehouses={warehouses}
      products={products}
      id={id}
    />
  );
}

export default function PurchasePage() {
  return (
    <div className="min-h-screen px-4 py-10 flex justify-center bg-indigo-50 dark:bg-slate-900">
      <Suspense fallback={<p>Loading search params...</p>}>
        <PurchaseContent />
      </Suspense>
    </div>
  );
}
