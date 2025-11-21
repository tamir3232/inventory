'use client';

import React from "react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  buttonHref?: string;  
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, buttonText, buttonHref }) => {
  const router = useRouter();

  const handleClick = () => {
    if (buttonHref) router.push(buttonHref);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 
                    flex justify-between items-center">
      <h2 className="text-white text-lg font-semibold">{title}</h2>

      {buttonText && (
        <button
          onClick={handleClick}
          className="bg-white text-indigo-700 font-medium px-4 py-2 rounded-xl
                     hover:bg-indigo-100 transition shadow-sm"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default PageHeader;
