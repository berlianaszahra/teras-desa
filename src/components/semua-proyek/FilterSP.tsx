"use client";
 
import { useState } from "react";
 
const rwOptions   = ["Semua RW", "RW 01", "RW 02", "RW 03", "RW 04"];
const tahunOptions = ["Semua Tahun", "2026", "2025", "2024"];
 
interface FilterSPProps {
  onFilter?: (rw: string, tahun: string, search: string) => void;
}
 
export default function FilterSP({ onFilter }: FilterSPProps) {
  const [rw, setRw]       = useState("Semua RW");
  const [tahun, setTahun] = useState("Semua Tahun");
  const [search, setSearch] = useState("");
 
  function handleCari() {
    onFilter?.(rw, tahun, search);
  }
 
  return (
    <div className="px-[122px] flex flex-row items-center gap-6">
      {/* Dropdown RW */}
      <div className="relative">
        <select
          value={rw}
          onChange={(e) => setRw(e.target.value)}
          className="appearance-none w-[240px] h-[56px] px-6 bg-[#F5F1E9] border border-[#252525] rounded-2xl text-xl text-[#252525] font-normal cursor-pointer focus:outline-none"
        >
          {rwOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {/* Chevron icon */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          width="24" height="24" viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
 
      {/* Dropdown Tahun */}
      <div className="relative">
        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="appearance-none w-[240px] h-[56px] px-6 bg-[#F5F1E9] border border-[#252525] rounded-2xl text-xl text-[#252525] font-normal cursor-pointer focus:outline-none"
        >
          {tahunOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
          width="24" height="24" viewBox="0 0 24 24" fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
 
      {/* Search input */}
      <input
        type="text"
        placeholder="Masukkan Judul Proyek"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleCari()}
        className="w-[440px] h-[56px] px-6 bg-[#F5F1E9] border border-[#252525] rounded-2xl text-xl text-[#252525] placeholder-[#252525] font-normal focus:outline-none"
      />
 
      {/* Tombol Cari */}
      <button
        onClick={handleCari}
        className="flex items-center gap-3 w-[204px] h-[56px] px-6 bg-[#556117] border border-[#FDF5E3] rounded-2xl text-xl text-[#FDF5E3] font-normal hover:bg-[#3f4a12] transition-colors"
      >
        <span className="flex-1">Cari</span>
        {/* Search icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            stroke="#FDF5E3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
