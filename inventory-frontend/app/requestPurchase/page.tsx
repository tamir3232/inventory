"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { API_PURCHASE } from "@/lib/api";
import PurchaseRequestDetail from "../components/PurchaseRequestDetail";
import { useRouter } from "next/navigation";
import BackButton from "../components/BackButton";

interface PurchaseRequest {
  id: number;
  vendor: string | null;
  reference: string;
  totalQty: number;
  createdAt: string;
  status : string;
}



export default function PurchaseRequestPage() {
  const [data, setData] = useState<PurchaseRequest[]>([]);
  const [detailId, setDetailId] = useState<number | null>(null);

  const fetchData = async () => {
    const res = await fetch(API_PURCHASE);
    const json = await res.json();
    setData(json.data as PurchaseRequest[]);
  };

  const router = useRouter();


  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const deleteRequest = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus?");
    if (!confirmDelete) return;

    const res = await fetch(
      API_PURCHASE+"/"+id,
      { method: "DELETE" }
    );
    const data = await res.json();
    if (!res.ok) {
        alert(data.message || "Gagal submit");
        return;
    }

    alert(data.message || "Purchase Request Berhasil Dibuat!");
    fetchData();
  };

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center bg-indigo-50 dark:bg-slate-900">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white">
          Purchase Request List
        </h1>
           <BackButton />
        <div className="shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
            <PageHeader
            title="Purchase Request List"
            buttonText="Purchase Request"
             buttonHref="/requestPurchase/purchase"
            />

          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-indigo-100 dark:bg-slate-700 text-left text-slate-700 dark:text-white">
                  <th className="p-3 border">Vendor</th>
                  <th className="p-3 border">Reference</th>
                  <th className="p-3 border">Qty</th>
                  <th className="p-3 border">Request Date</th>
                <th className="p-3 border">Status</th>
                  <th className="p-3 border text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-indigo-50 dark:hover:bg-slate-700 transition"
                  >
                    <td className="p-3 border text-slate-700 dark:text-gray-200">
                      {item.vendor ?? "-"}
                    </td>
                    <td className="p-3 border text-slate-700 dark:text-gray-200">
                      {item.reference}
                    </td>
                    <td className="p-3 border font-semibold text-slate-700 dark:text-gray-200">
                      {item.totalQty}
                    </td>
                    <td className="p-3 border text-slate-700 dark:text-gray-200">
                      {formatDate(item.createdAt)}
                    </td>
                     <td className="p-3 border font-semibold text-slate-700 dark:text-gray-200">
                      {item.status}
                    </td>
                    <td className="p-3 border text-center">
                      <div className="flex gap-4 justify-center">
                        <button
                          className="text-blue-600 dark:text-blue-400 hover:opacity-70"
                          onClick={() => setDetailId(item.id)}
                        >
                          <Eye size={20} />
                        </button>

                        <button
                          className="text-green-600 dark:text-green-400 hover:opacity-70"
                           onClick={() => router.push(`/requestPurchase/purchase?id=${item.id}`)}
                        >
                          <Pencil size={20} />
                        </button>

                        <button
                          className="text-red-600 dark:text-red-400 hover:opacity-70"
                          onClick={() => deleteRequest(item.id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td
                      className="p-3 border text-center text-gray-500 dark:text-gray-400"
                      colSpan={5}
                    >
                      Tidak ada data
                    </td>
                  </tr>
                )}
                {detailId && (
                    <PurchaseRequestDetail id={detailId} onClose={() => setDetailId(null)} />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
