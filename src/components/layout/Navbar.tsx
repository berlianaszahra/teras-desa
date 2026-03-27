"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">

      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img 
            src="/images/logo-tr.webp" 
            alt="logo navbar" 
            className="w-10 h-10 md:w-14 md:h-14 object-contain"
          />
          <span className="text-black font-bold text-lg md:text-xl">
            TerasDesa
          </span>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border-2 border-[#556117]
                       text-[#556117] font-semibold text-sm md:text-base
                       hover:bg-[#556117] hover:text-[#ECEEE7] transition"
          >
            Daftar
          </Link>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border-2 border-[#556117] bg-[#556117]
                       text-[#ECEEE7] font-semibold text-sm md:text-base
                       hover:bg-[#445012] transition"
          >
            Masuk
          </Link>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-black"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU (FIX: absolute, gak nambah tinggi navbar) */}
      {open && (
        <div className="
          md:hidden 
          absolute top-full left-0 w-full
          bg-white/95 backdrop-blur-md
          shadow-md 
          px-4 py-4 
          flex flex-col gap-3
          rounded-b-2xl
        ">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="w-full text-center px-4 py-2 rounded-xl border border-[#556117]
                       text-[#556117] font-semibold"
          >
            Daftar
          </Link>

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="w-full text-center px-4 py-2 rounded-xl bg-[#556117]
                       text-white font-semibold"
          >
            Masuk
          </Link>
        </div>
      )}

    </nav>
  );
}