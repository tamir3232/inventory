import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 dark:bg-slate-900 px-4">
      <main className="w-full max-w-3xl text-center">

        <h1 className="text-4xl font-bold mb-16 text-slate-800 dark:text-white">
          WELCOME TO FOOM LAB GLOBAL STOCK WAREHOUSE
        </h1>

        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">

          <Link
            href="/stock"
            className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-6 rounded-xl
                       hover:bg-indigo-700 transition shadow-md font-semibold text-lg"
          >
            STOCK
          </Link>

          <Link
            href="/requestPurchase"
            className="w-full sm:w-auto bg-purple-600 text-white px-10 py-6 rounded-xl
                       hover:bg-purple-700 transition shadow-md font-semibold text-lg"
          >
            PURCHASE REQUEST
          </Link>

        </div>
      </main>
    </div>
  );
}
