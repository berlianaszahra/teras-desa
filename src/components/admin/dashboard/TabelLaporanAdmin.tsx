'use client';

import { useState } from "react";
 
type StatusType = "Diproses" | "Diterima" | "Selesai";
 
interface Laporan {
  no: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  status: StatusType;
}
 
const laporanData: Laporan[] = [
  { no: 1, judul: "Kerusakan Jalan Utama",    kategori: "Infrastruktur",  tanggal: "24 Maret 2026", lokasi: "Dusun 1",       status: "Selesai"  },
  { no: 2, judul: "Lampu Jalan Mati",          kategori: "Fasilitas Umum", tanggal: "23 Maret 2026", lokasi: "RT 02/ RW 03",  status: "Diproses" },
  { no: 3, judul: "Saluran Air Tersumbat",     kategori: "Lingkungan",     tanggal: "12 Maret 2026", lokasi: "Dusun 3",       status: "Diterima" },
  { no: 4, judul: "Fasilitas Posyandu Rusak",  kategori: "Kesehatan",      tanggal: "10 Maret 2026", lokasi: "Dusun 1",       status: "Diproses" },
  { no: 5, judul: "Sampah Menumpuk",           kategori: "Kebersihan",     tanggal: "08 Mar 2026",   lokasi: "RT 01 / RW 03", status: "Diterima" },
  { no: 6, judul: "Drainase Tidak Lancar",     kategori: "Infrastruktur",  tanggal: "06 Mar 2026",   lokasi: "Dusun 2",       status: "Diproses" },
  { no: 7, judul: "Lampu Balai Desa Mati",     kategori: "Fasilitas Umum", tanggal: "07 Mar 2026",   lokasi: "Balai Desa",    status: "Selesai"  },
];
 
const statusOptions: StatusType[] = ["Diproses", "Diterima", "Selesai"];
 
const statusColor: Record<StatusType, string> = {
  Diproses: "#E3AB55",
  Diterima: "#9F490E",
  Selesai:  "#3F5210",
};
 
function StatusDropdown({
  value,
  onChange,
}: {
  value: StatusType;
  onChange: (v: StatusType) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-[122px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full h-[37px] px-4 border border-black rounded-lg text-base font-medium text-[#190B02]"
        style={{ background: statusColor[value] }}
      >
        <span className="flex-1 text-left">{value}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 8l5 5 5-5" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div className="absolute top-[37px] left-0 w-full border border-black rounded-b-lg overflow-hidden z-10">
          {statusOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full px-4 py-[9px] text-base font-medium text-[#190B02] text-left border-b border-black last:border-b-0"
              style={{ background: "#E3AB55" }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
 
export default function TabelLaporanAdmin() {
  const [data, setData] = useState<Laporan[]>(laporanData);
 
  function updateStatus(no: number, status: StatusType) {
    setData((prev) => prev.map((r) => r.no === no ? { ...r, status } : r));
  }
 
  const columns = ["No", "Judul", "Kategori", "Tanggal Laporan", "Lokasi", "Status", "Aksi"];
 
  return (
    <div className="w-full bg-[#E6E5D9] rounded-[30px] p-6 flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-[#190B02]">Daftar Laporan Warga</h2>
 
      {/* Tabel */}
      <div className="w-full rounded-[15px] overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
        {/* Header */}
        <div className="flex flex-row">
          {columns.map((col) => (
            <div
              key={col}
              className={`flex items-center justify-center px-4 py-3 bg-[#3F5210] border-b border-[#190B02] text-base font-semibold text-[#FDF5E3]
                ${col === "No"               ? "w-[60px]"   : ""}
                ${col === "Judul"            ? "flex-1"     : ""}
                ${col === "Kategori"         ? "w-[160px]"  : ""}
                ${col === "Tanggal Laporan"  ? "w-[166px]"  : ""}
                ${col === "Lokasi"           ? "w-[157px]"  : ""}
                ${col === "Status"           ? "w-[168px]"  : ""}
                ${col === "Aksi"             ? "w-[99px]"   : ""}
              `}
            >
              {col}
            </div>
          ))}
        </div>
 
        {/* Rows */}
        {data.map((row) => (
          <div key={row.no} className="flex flex-row border-b border-[#190B02] last:border-b-0 bg-[#FDF5E3]">
            <div className="w-[60px] flex items-center justify-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.no}</span>
            </div>
            <div className="flex-1 flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.judul}</span>
            </div>
            <div className="w-[160px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.kategori}</span>
            </div>
            <div className="w-[166px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.tanggal}</span>
            </div>
            <div className="w-[157px] flex items-center px-4 py-4">
              <span className="text-base font-semibold text-[#5E5151]">{row.lokasi}</span>
            </div>
            <div className="w-[168px] flex items-center justify-center px-4 py-4">
              <StatusDropdown
                value={row.status}
                onChange={(v) => updateStatus(row.no, v)}
              />
            </div>
            <div className="w-[99px] flex items-center justify-center px-4 py-4">
              <button className="px-4 py-2 bg-[#999999] rounded-2xl text-base font-semibold text-black hover:bg-[#888] transition-colors">
                Detail
              </button>
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
 