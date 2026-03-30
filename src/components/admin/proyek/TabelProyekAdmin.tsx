"use client";
 
import { useState } from "react";
 
type StatusProyek = "Diproses" | "Diterima" | "Selesai";
 
interface Proyek {
  no: number;
  nama: string;
  tanggal: string;
  lokasi: string;
  status: StatusProyek;
}
 
const proyekData: Proyek[] = [
  { no: 1, nama: "Kerusakan Jalan Utama",    tanggal: "24 Maret 2026", lokasi: "Dusun 1",       status: "Diproses" },
  { no: 2, nama: "Lampu Jalan Mati",          tanggal: "23 Maret 2026", lokasi: "RT 02/ RW 03",  status: "Diterima" },
  { no: 3, nama: "Saluran Air Tersumbat",     tanggal: "12 Maret 2026", lokasi: "Dusun 3",       status: "Diproses" },
  { no: 4, nama: "Fasilitas Posyandu Rusak",  tanggal: "10 Maret 2026", lokasi: "Dusun 1",       status: "Selesai"  },
  { no: 5, nama: "Sampah Menumpuk",           tanggal: "08 Maret 2026",   lokasi: "RT 01 / RW 03", status: "Diproses" },
  { no: 6, nama: "Drainase Tidak Lancar",     tanggal: "06 Maret 2026",   lokasi: "Dusun 2",       status: "Diproses" },
  { no: 7, nama: "Lampu Balai Desa Mati",     tanggal: "07 Maret 2026",   lokasi: "Balai Desa",    status: "Selesai"  },
];
 
const statusColors: Record<StatusProyek, string> = {
  Diproses: "text-[#5E5151]",
  Diterima: "text-[#5E5151]",
  Selesai:  "text-[#5E5151]",
};
 
const columns = ["No", "Nama Proyek", "Tanggal Laporan", "Lokasi", "Status", "Aksi"];
 
export default function TabelProyekAdmin() {
  const [data] = useState<Proyek[]>(proyekData);
 
  return (
    <div className="w-full bg-[#E6E5D9] rounded-[30px] p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Daftar Proyek</h2>
 
      {/* Tabel */}
      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex flex-row">
          {columns.map((col) => (
            <div
              key={col}
              className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                ${col === "No"               ? "w-[60px]"  : ""}
                ${col === "Nama Proyek"      ? "flex-1"    : ""}
                ${col === "Tanggal Laporan"  ? "w-[173px]" : ""}
                ${col === "Lokasi"           ? "w-[166px]" : ""}
                ${col === "Status"           ? "w-[147px]" : ""}
                ${col === "Aksi"             ? "w-[175px]" : ""}
              `}
            >
              {col}
            </div>
          ))}
        </div>
 
        {/* Rows */}
        {data.map((row) => (
          <div key={row.no} className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]">
            {/* No */}
            <div className="w-[60px] flex items-center justify-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.no}</span>
            </div>
            {/* Nama Proyek */}
            <div className="flex-1 flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.nama}</span>
            </div>
            {/* Tanggal */}
            <div className="w-[173px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.tanggal}</span>
            </div>
            {/* Lokasi */}
            <div className="w-[166px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.lokasi}</span>
            </div>
            {/* Status */}
            <div className="w-[147px] flex items-center px-4 py-4">
              <span className={`text-base font-semibold ${statusColors[row.status]}`}>
                {row.status}
              </span>
            </div>
            {/* Aksi — toggle Detail/Edit */}
            <div className="w-[175px] flex items-center px-4 py-4">
              <div className="relative w-[125px] h-[36px] bg-[#E2E5DB] rounded-[15px] overflow-hidden">
                {/* Slider highlight */}
                <div className="absolute left-0 top-0 w-[73px] h-full bg-[#C3C9B5] rounded-[15px]" />
                {/* Labels */}
                <div className="absolute inset-0 flex flex-row items-center">
                  <button className="flex-1 text-base font-semibold text-[#190B02] text-center z-10">
                    Detail
                  </button>
                  <button className="flex-1 text-base font-semibold text-[#190B02] text-center z-10">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
 
      {/* Pagination */}
      <div className="flex flex-row items-center justify-between mt-2">
        <span className="text-xl font-semibold text-[#190B02]">
          Menampilkan 1 dari 37 Laporan
        </span>
        <div className="flex flex-row gap-2">
          {[1, 2].map((page) => (
            <button
              key={page}
              className="w-[75px] h-[31px] flex items-center justify-center bg-[#ECEEE7] border border-[#3F5210] rounded-[10px] text-xl font-medium text-[#3F5210] hover:bg-[#C3C9B5] transition-colors"
            >
              {page}
            </button>
          ))}
          <button className="w-[75px] h-[31px] flex items-center justify-center bg-[#ECEEE7] border border-[#3F5210] rounded-[10px] hover:bg-[#C3C9B5] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="#3F5210" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
 