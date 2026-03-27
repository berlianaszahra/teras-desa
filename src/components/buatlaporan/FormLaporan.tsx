
"use client";
 
import { useState } from "react";
 
const kategoriOptions = [
  "Kategori Laporan",
  "Infrastruktur",
  "Kebersihan",
  "Keamanan",
  "Sosial",
  "Lainnya",
];
 
const proyekOptions = [
  "Pilih Proyek",
  "Pembangunan Jalan",
  "Renovasi Balai Desa",
  "Lampu Jalan Desa",
  "Perbaikan Jembatan",
];
 
const desaOptions = [
  "Pilih Desa",
  "Desa Sukamaju",
  "Desa Karanganyar",
  "Desa Mekarjaya",
];
 
export default function FormLaporan() {
  const [kategori, setKategori]     = useState("");
  const [judul, setJudul]           = useState("");
  const [deskripsi, setDeskripsi]   = useState("");
  const [tanggal, setTanggal]       = useState("");
  const [lokasi, setLokasi]         = useState("");
  const [proyek, setProyek]         = useState("");
  const [desa, setDesa]             = useState("");
  const [rahasia, setRahasia]       = useState(false);
  const [anonim, setAnonim]         = useState(false);
  const [file, setFile]             = useState<File | null>(null);
  const [dragOver, setDragOver]     = useState(false);
 
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }
 
  function handleSubmit() {
    // TODO: kirim ke API
    alert("Laporan berhasil dikirim!");
  }
 
  const inputClass =
    "w-full h-[50px] px-4 bg-transparent border-2 border-[#1C2507] rounded-[10px] text-base text-[#1C2507] placeholder-[#767676] font-light focus:outline-none focus:border-[#556117]";
 
  const labelClass = "text-xl font-normal text-[#1C2507] tracking-[0.5px]";
 
  return (
    <div className="mx-[122px] bg-[#E6E5D9] border border-[#3F5210] shadow-[0_0_50px_rgba(0,0,0,0.25)] rounded-[50px] px-[58px] py-[55px] flex flex-col gap-[82px]">
      <div className="flex flex-col gap-[70px]">
 
        {/* ── Header bar ── */}
        <div
          className="w-full h-[95px] rounded-[35px] flex items-center justify-center"
          style={{ background: "linear-gradient(90deg, #A64A0D 0%, #401D05 100%)" }}
        >
          <span className="text-[36px] font-semibold text-white tracking-[0.5px]">
            Sampaikan Laporan Anda
          </span>
        </div>
 
        {/* ── Isi form ── */}
        <div className="flex flex-col gap-10">
 
          {/* Pilih Kategori */}
          <div className="flex flex-col gap-[17px]">
            <label className={labelClass}>Pilih Kategori Laporan</label>
            <div className="relative">
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {kategoriOptions.map((o) => (
                  <option key={o} value={o === "Kategori Laporan" ? "" : o}>
                    {o}
                  </option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-normal text-[#1C2507] text-center tracking-[0.5px]">
              Petunjuk Pengisian Laporan
            </span>
          </div>
 
          {/* Judul Laporan */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Judul Laporan</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={inputClass}
              placeholder="Masukkan judul laporan"
            />
          </div>
 
          {/* Deskripsi Laporan */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Deskripsi Laporan</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full h-[150px] px-4 py-3 bg-transparent border-2 border-[#1C2507] rounded-[10px] text-base text-[#1C2507] placeholder-[#767676] font-light focus:outline-none focus:border-[#556117] resize-none"
              placeholder="Jelaskan laporan Anda secara lengkap..."
            />
          </div>
 
          {/* Tanggal Laporan */}
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Tanggal Laporan</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className={inputClass}
            />
          </div>
 
          {/* Lokasi Kejadian */}
          <div className="flex flex-col gap-[17px]">
            <label className={labelClass}>Lokasi Kejadian</label>
            <input
              type="text"
              value={lokasi}
              onChange={(e) => setLokasi(e.target.value)}
              className={inputClass}
              placeholder="Masukkan lokasi kejadian"
            />
          </div>
 
          {/* Pilih Proyek */}
          <div className="flex flex-col gap-[17px]">
            <label className={labelClass}>Pilih Proyek</label>
            <div className="relative">
              <select
                value={proyek}
                onChange={(e) => setProyek(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {proyekOptions.map((o) => (
                  <option key={o} value={o === "Pilih Proyek" ? "" : o}>{o}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
 
          {/* Pilih Desa */}
          <div className="flex flex-col gap-[17px]">
            <label className={labelClass}>Pilih Desa</label>
            <div className="relative">
              <select
                value={desa}
                onChange={(e) => setDesa(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                {desaOptions.map((o) => (
                  <option key={o} value={o === "Pilih Desa" ? "" : o}>{o}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#252525" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
 
          {/* Unggah Bukti */}
          <div className="flex flex-col gap-[17px]">
            <label className={labelClass}>Unggah Bukti Laporan</label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
              className={`w-full h-[382px] border-2 border-dashed rounded-[10px] flex flex-col items-center justify-center gap-8 cursor-pointer transition-colors ${
                dragOver ? "border-[#556117] bg-[#d8d7cc]" : "border-[#1C2507]"
              }`}
            >
              {file ? (
                <p className="text-base font-medium text-[#1C2507]">{file.name}</p>
              ) : (
                <>
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path d="M25 35V15M15 25l10-10 10 10" stroke="#767676" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="5" y="38" width="40" height="7" rx="3" fill="#767676" opacity="0.3"/>
                  </svg>
                  <span className="text-xl font-light text-[#767676] text-center">
                    Taruh atau Unggah Bukti Laporan disini
                  </span>
                </>
              )}
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
 
          {/* Checkbox + Tombol Lapor */}
          <div className="flex flex-row items-center gap-[51px]">
            {/* Rahasia */}
            <label className="flex flex-row items-center gap-3 cursor-pointer">
              <div
                onClick={() => setRahasia(!rahasia)}
                className="w-8 h-8 rounded-[4px] bg-[#B0323A] flex items-center justify-center flex-shrink-0"
              >
                {rahasia && (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path d="M1 7l5 5L17 1" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-xl font-normal text-[#1C2507]">Rahasia</span>
            </label>
 
            {/* Anonim */}
            <label className="flex flex-row items-center gap-3 cursor-pointer">
              <div
                onClick={() => setAnonim(!anonim)}
                className="w-8 h-8 rounded-[4px] bg-[#B0323A] flex items-center justify-center flex-shrink-0"
              >
                {anonim && (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path d="M1 7l5 5L17 1" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-xl font-normal text-[#1C2507]">Anonim</span>
            </label>
 
            {/* Tombol Lapor */}
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center px-6 h-16 w-[229px] bg-[#556117] rounded-2xl text-2xl font-semibold text-white hover:bg-[#3f4a12] transition-colors"
            >
              Lapor
            </button>
          </div>
 
        </div>
      </div>
    </div>
  );
}
 