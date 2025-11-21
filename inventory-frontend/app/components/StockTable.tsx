import React from "react";
import { IStock } from "@/types/stock";

export type StockItem = IStock;

interface StockTableProps {
  data: IStock[];
}

const StockTable: React.FC<StockTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-indigo-100 dark:bg-slate-700">
            <th className="px-6 py-3 font-semibold">Warehouse</th>
            <th className="px-6 py-3 font-semibold">Product</th>
            <th className="px-6 py-3 font-semibold">Quantity</th>
            <th className="px-6 py-3 font-semibold">SKU</th>

          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 transition"
            >
                <td className="px-6 py-4">{item.Warehouse.name}</td>
                <td className="px-6 py-4">{item.Product.name}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.Product.sku}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
