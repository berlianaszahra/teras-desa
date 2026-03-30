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
  const [kategori, setKategori] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [proyek, setProyek] = useState("");
  const [desa, setDesa] = useState("");
  const [rahasia, setRahasia] = useState(false);
  const [anonim, setAnonim] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  function handleSubmit() {
    alert("Laporan berhasil dikirim!");
  }

  const inputClass =
    "w-full h-12 px-4 bg-transparent border-2 border-[#1C2507] rounded-lg text-sm md:text-base text-[#1C2507] placeholder-[#767676] focus:outline-none focus:border-[#556117]";

  const labelClass =
    "text-base md:text-lg font-medium text-[#1C2507]";

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <div className="max-w-5xl mx-auto bg-[#E6E5D9] border border-[#3F5210] shadow-xl rounded-3xl p-6 md:p-10 lg:p-14 flex flex-col gap-10 md:gap-14">

        {/* HEADER */}
        <div className="w-full h-[70px] md:h-[90px] rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#A64A0D] to-[#401D05]">
          <span className="text-xl md:text-3xl font-semibold text-white text-center">
            Sampaikan Laporan Anda
          </span>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-6 md:gap-8">

          {/* Kategori */}
          <div>
            <label className={labelClass}>Pilih Kategori</label>
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className={`${inputClass} mt-2`}
            >
              {kategoriOptions.map((o) => (
                <option key={o} value={o === "Kategori Laporan" ? "" : o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          {/* Judul */}
          <div>
            <label className={labelClass}>Judul Laporan</label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="Masukkan judul"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="Jelaskan laporan..."
            />
          </div>

          {/* Grid 2 kolom (responsive) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className={labelClass}>Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className={`${inputClass} mt-2`}
              />
            </div>

            <div>
              <label className={labelClass}>Lokasi</label>
              <input
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className={`${inputClass} mt-2`}
                placeholder="Lokasi kejadian"
              />
            </div>

            <div>
              <label className={labelClass}>Proyek</label>
              <select
                value={proyek}
                onChange={(e) => setProyek(e.target.value)}
                className={`${inputClass} mt-2`}
              >
                {proyekOptions.map((o) => (
                  <option key={o} value={o === "Pilih Proyek" ? "" : o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Desa</label>
              <select
                value={desa}
                onChange={(e) => setDesa(e.target.value)}
                className={`${inputClass} mt-2`}
              >
                {desaOptions.map((o) => (
                  <option key={o} value={o === "Pilih Desa" ? "" : o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Upload */}
          <div>
            <label className={labelClass}>Upload Bukti</label>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
              className={`mt-3 w-full min-h-[180px] md:min-h-[250px] border-2 border-dashed rounded-xl flex items-center justify-center text-center cursor-pointer ${
                dragOver ? "bg-[#d8d7cc]" : ""
              }`}
            >
              {file ? file.name : "Klik atau drag file ke sini"}
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          {/* Checkbox + Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rahasia} onChange={() => setRahasia(!rahasia)} />
                Rahasia
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={anonim} onChange={() => setAnonim(!anonim)} />
                Anonim
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full md:w-auto px-8 py-3 bg-[#556117] text-white rounded-xl text-lg font-semibold hover:bg-[#3f4a12]"
            >
              Lapor
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}