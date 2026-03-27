"use client";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}
        className="mt-2 md:mt-4 px-6 py-3 md:px-8 md:py-4 
                     bg-[#556117] rounded-xl md:rounded-[16px]
                     text-white font-semibold text-sm md:text-lg
                     hover:scale-105 hover:bg-[#445012]
                     transition">
      {children}
    </button>
  );
}