import BackButton from "../components/BackButton";
import PageHeader from "../components/PageHeader";
import StockTable from "../components/StockTable";
import { IStocksResponse } from "../../types/stock";
import { API_STOCK } from "@/lib/api";

const Stock = async () => {
  let posts: IStocksResponse = { message:"",data: [] }; // fallback

  try {
    const response = await fetch(API_STOCK, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    posts = await response.json();
  } catch (err) {
    console.error("Failed to fetch API:", err);
  }

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center bg-indigo-50 dark:bg-slate-900">
      <BackButton />

      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-10 text-slate-800 dark:text-white">
          FOOM LAB GLOBAL STOCK PRODUCT
        </h1>

        <div className="shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
          <PageHeader
            title="Stock Summary"
            buttonText="Purchase Request"
            buttonHref="/requestPurchase/purchase"
          />

          <StockTable data={posts.data} />
        </div>
      </div>
    </div>
  );
};

export default Stock;
