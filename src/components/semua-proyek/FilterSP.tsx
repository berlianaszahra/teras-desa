"use client";

import { useState } from "react";

const rwOptions = ["Semua RW", "RW 01", "RW 02", "RW 03", "RW 04"];
const tahunOptions = ["Semua Tahun", "2026", "2025", "2024"];

interface FilterSPProps {
  onFilter?: (rw: string, tahun: string, search: string) => void;
}

export default function FilterSP({ onFilter }: FilterSPProps) {
  const [rw, setRw] = useState("Semua RW");
  const [tahun, setTahun] = useState("Semua Tahun");
  const [search, setSearch] = useState("");

  function handleCari() {
    onFilter?.(rw, tahun, search);
  }

  return (
    <div className="px-4 md:px-12 lg:px-[122px] flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
      
      {/* Dropdown RW */}
      <div className="relative w-full md:w-[200px] lg:w-[240px]">
        <select
          value={rw}
          onChange={(e) => setRw(e.target.value)}
          className="appearance-none w-full h-[50px] md:h-[56px] px-4 md:px-6 bg-[#F5F1E9] border border-[#252525] rounded-xl md:rounded-2xl text-base md:text-xl text-[#252525] focus:outline-none"
        >
          {rwOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          width="20" height="20"
          viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" />
        </svg>
      </div>

      {/* Dropdown Tahun */}
      <div className="relative w-full md:w-[200px] lg:w-[240px]">
        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="appearance-none w-full h-[50px] md:h-[56px] px-4 md:px-6 bg-[#F5F1E9] border border-[#252525] rounded-xl md:rounded-2xl text-base md:text-xl text-[#252525] focus:outline-none"
        >
          {tahunOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          width="20" height="20"
          viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" />
        </svg>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Masukkan Judul Proyek"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCari()}
        className="w-full md:flex-1 h-[50px] md:h-[56px] px-4 md:px-6 bg-[#F5F1E9] border border-[#252525] rounded-xl md:rounded-2xl text-base md:text-xl text-[#252525] placeholder-[#252525] focus:outline-none"
      />

      {/* Button */}
      <button
        onClick={handleCari}
        className="flex items-center justify-center gap-2 w-full md:w-auto md:px-6 h-[50px] md:h-[56px] bg-[#556117] border border-[#FDF5E3] rounded-xl md:rounded-2xl text-base md:text-xl text-[#FDF5E3] hover:bg-[#3f4a12] transition-colors"
      >
        <span>Cari</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            stroke="#FDF5E3"
            strokeWidth="2"
          />
        </svg>
      </button>
    </div>
  );
}