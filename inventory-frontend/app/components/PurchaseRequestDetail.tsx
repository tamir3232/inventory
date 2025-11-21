import { API_PURCHASE } from "@/lib/api";
import { useEffect, useState } from "react";

interface PurchaseRequestDetailData {
  id: number;
  reference: string;
  vendor: string | null;
  totalQty?: number;
  createdAt: string;
  status: string;
  Warehouse?: {
    id: number;
    name: string;
  };
  PurchaseRequestItems: {
    id: number;
    product_id: number;
    quantity: number;
    createdAt: string;
  }[];
}
interface PurchaseRequestDetailProps {
  id: number;
  onClose: () => void;
}


export default function PurchaseRequestDetail({ id, onClose }: PurchaseRequestDetailProps) {
  const [data, setData] = useState<PurchaseRequestDetailData | null>(null);

  const fetchDetail = async () => {
    const res = await fetch(`${API_PURCHASE}/${id}`);
    const json = await res.json();
    setData(json.data);
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
          Purchase Request Detail
        </h2>

        <p className="mb-2 text-slate-700 dark:text-gray-200">
          <strong>Reference:</strong> {data.reference}
        </p>
        <p className="mb-2 text-slate-700 dark:text-gray-200">
          <strong>Vendor:</strong> {data.vendor ?? "-"}
        </p>
        <p className="mb-2 text-slate-700 dark:text-gray-200">
          <strong>Status:</strong> {data.status}
        </p>
        <p className="mb-2 text-slate-700 dark:text-gray-200">
          <strong>Warehouse:</strong> {data.Warehouse?.name ?? "-"}
        </p>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr className="bg-indigo-100 dark:bg-slate-700 text-left text-slate-700 dark:text-white">
              <th className="p-2 border">Product ID</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.PurchaseRequestItems.map((item) => (
              <tr key={item.id} className="hover:bg-indigo-50 dark:hover:bg-slate-700">
                <td className="p-2 border text-slate-700 dark:text-gray-200">{item.product_id}</td>
                <td className="p-2 border text-slate-700 dark:text-gray-200">{item.quantity}</td>
                <td className="p-2 border text-slate-700 dark:text-gray-200">
                  {new Date(item.createdAt).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
