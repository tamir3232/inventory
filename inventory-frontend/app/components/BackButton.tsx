"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-5 left-5 bg-white dark:bg-slate-800 border border-indigo-300
                 dark:border-slate-600 text-indigo-700 dark:text-white px-4 py-2 rounded-xl
                 shadow-md hover:bg-indigo-100 dark:hover:bg-slate-700 transition"
    >
      ← Back
    </button>
  );
};

export default BackButton;
