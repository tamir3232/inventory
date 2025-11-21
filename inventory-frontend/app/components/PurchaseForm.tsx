"use client";

import { useState, useEffect } from "react";
import { API_PURCHASE, API_PURCHASE_ITEM } from "@/lib/api";
import BackButton from "@/app/components/BackButton";
import { PurchaseItem, PurchaseRequest } from "@/types/purchase";
import { useRouter } from "next/navigation";

interface PurchaseFormProps {
  warehouses: { id: number; name: string }[];
  products: { id: number; name: string }[];
  id?: number; // kalau ada, berarti edit
}

export default function PurchaseForm({ warehouses, products, id }: PurchaseFormProps) {
  const router = useRouter();
  const [vendor, setVendor] = useState("");
  const [warehouseId, setWarehouseId] = useState<number | null>(null);
  const [reference, setReference] = useState("");
  const [items, setItems] = useState<PurchaseItem[]>([{ productId: 0, quantity: 1 }]);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const isCompleted = status === "COMPLETED";

  // Fetch data kalau edit
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_PURCHASE}/${id}`);
        const json = await res.json();
        const data = json.data;

        setVendor(data.vendor ?? "");
        setWarehouseId(data.warehouse_id);
        setReference(data.reference);
        setStatus(data.status ?? "PENDING");
        setItems(
          data.PurchaseRequestItems.map((i: any) => ({
            id: i.id,              // wajib dikirim saat update
            productId: i.product_id,
            quantity: i.quantity,
          }))
        );
      } catch (err) {
        console.error(err);
        alert("Gagal mengambil data purchase request");
      }
    };

    fetchData();
  }, [id]);

  const addItem = () => {
    if (isCompleted) return;
    setItems([...items, { productId: 0, quantity: 1 }]);
  };

  const updateItem = (index: number, field: keyof PurchaseItem, value: any) => {
    if (isCompleted) return;
    const copy = [...items];
    copy[index][field] = Number(value);
    setItems(copy);
  };

  const removeItem = async (index: number) => {
    if (isCompleted) return;

    const item = items[index];

    if (item.id) {
      try {
        const res = await fetch(`${API_PURCHASE_ITEM}/${item.id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Gagal menghapus item");
          return;
        }

        alert(data.message || "Item berhasil dihapus");
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus item");
        return;
      }
    }

    setItems(items.filter((_, i) => i !== index));
  };

  const submitForm = async () => {
    if (!vendor || !warehouseId) {
      alert("Mohon lengkapi semua field");
      return;
    }

    setLoading(true);

    const payload: any = {
      vendor,
      warehouseId,
      reference,
      items: items.map((i) => ({
        ...(i.id ? { id: i.id } : {}), // kirim id kalau edit
        productId: i.productId,
        quantity: i.quantity,
      })),
    };

    if (id) payload.status = status; // hanya edit

    const url = id ? `${API_PURCHASE}/${id}` : API_PURCHASE;
    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        alert(data.message || "Gagal submit");
        return;
      }

      alert(data.message || (id ? "Purchase Request Berhasil diupdate!" : "Purchase Request Berhasil Dibuat!"));
      router.push("/requestPurchase");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Terjadi kesalahan saat submit");
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl">
      <BackButton />

      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        {id ? "Edit Purchase Request" : "Create Purchase Request"}
      </h1>

      {/* Vendor */}
      <div className="mb-4">
        <label className="font-semibold text-slate-700 dark:text-white">Vendor</label>
        <input
          className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
          type="text"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          disabled={isCompleted}
        />
      </div>

      {/* Warehouse */}
      <div className="mb-4">
        <label className="font-semibold text-slate-700 dark:text-white">Warehouse</label>
        <select
          className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
          value={warehouseId ?? ""}
          onChange={(e) => setWarehouseId(Number(e.target.value))}
          disabled={isCompleted}
        >
          <option value="">-- Choose Warehouse --</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
      </div>

      {/* Reference */}
      <div className="mb-4">
        <label className="font-semibold text-slate-700 dark:text-white">Reference</label>
        <input
          className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white bg-gray-200"
          type="text"
          value={reference}
          readOnly
        />
      </div>

      {/* Status (edit only) */}
      {id && (
        <div className="mb-4">
          <label className="font-semibold text-slate-700 dark:text-white">Status</label>
          <select
            className="w-full p-2 border rounded dark:bg-slate-700 dark:text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">PENDING</option>
            <option value="DRAFT">DRAFT</option>
          </select>
        </div>
      )}

      {/* Items */}
      <div className="mb-6">
        <label className="font-semibold text-slate-700 dark:text-white">Items</label>
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 mt-3 items-center border p-3 rounded dark:border-slate-600">
            <select
              className="p-2 border rounded w-1/2 dark:bg-slate-700 dark:text-white"
              value={item.productId}
              onChange={(e) => updateItem(index, "productId", e.target.value)}
              disabled={isCompleted}
            >
              <option value="0">-- Select Product --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <input
              className="p-2 border rounded w-1/4 dark:bg-slate-700 dark:text-white"
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", e.target.value)}
              disabled={isCompleted}
            />

            {index > 0 && (
              <button
                className="text-red-500 dark:text-red-400"
                onClick={() => removeItem(index)}
                disabled={isCompleted}
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addItem}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          disabled={isCompleted}
        >
          + Add Item
        </button>
      </div>

      {/* Submit */}
      <button
        className="w-full bg-indigo-600 text-white py-3 rounded font-semibold"
        onClick={submitForm}
        disabled={loading || isCompleted}
      >
        {loading ? "Submitting..." : id ? "Update Purchase Request" : "Submit Purchase Request"}
      </button>
    </div>
  );
}
