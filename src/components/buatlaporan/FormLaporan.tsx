"use client";

import { useState, useEffect } from "react";
import { createReport, getProjects } from "@/lib/api";
import type { ProjectListItem } from "@/types";

export default function FormLaporan() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [projectId, setProjectId] = useState("");
  const [rahasia, setRahasia] = useState(false);
  const [anonim, setAnonim] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  
  const [projects, setProjects] = useState<ProjectListItem[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data.items))
      .catch(console.error);
  }, []);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }

  async function handleSubmit() {
    if (!judul || !deskripsi || !lokasi) {
      alert("Harap isi Judul, Deskripsi, dan Lokasi");
      return;
    }
    setSubmitting(true);
    try {
      await createReport({
        title: judul,
        description: deskripsi,
        location: lokasi,
        project_id: projectId || undefined,
        images: file ? [file] : undefined,
      });
      alert("Laporan berhasil dikirim!");
      setJudul("");
      setDeskripsi("");
      setTanggal("");
      setLokasi("");
      setProjectId("");
      setFile(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui";
      alert("Gagal mengirim laporan: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full h-12 px-4 bg-transparent border-2 border-[#1C2507] rounded-lg text-sm md:text-base text-[#1C2507] placeholder-[#767676] focus:outline-none focus:border-[#556117]";

  const labelClass =
    "text-base md:text-lg font-medium text-[#1C2507]";

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      <div className="max-w-5xl mx-auto bg-[#E6E5D9] border border-[#3F5210] shadow-xl rounded-3xl p-6 md:p-10 lg:p-14 flex flex-col gap-10 md:gap-14">

        <div className="w-full h-[70px] md:h-[90px] rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#A64A0D] to-[#401D05]">
          <span className="text-xl md:text-3xl font-semibold text-white text-center">
            Sampaikan Laporan Anda
          </span>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">

          <div>
            <label className={labelClass}>Judul Laporan</label>
            <input
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className={`${inputClass} mt-2`}
              placeholder="Masukkan judul"
            />
          </div>

          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className={`${inputClass} mt-2 min-h-[120px]`}
              placeholder="Jelaskan laporan..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className={labelClass}>Tanggal (Opsional)</label>
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
              <label className={labelClass}>Proyek Terkait</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className={`${inputClass} mt-2`}
              >
                <option value="">Tidak ada proyek (Laporan Umum)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div>
            <label className={labelClass}>Upload Bukti</label>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-input")?.click()}
              className={`mt-3 w-full min-h-[180px] md:min-h-[250px] border-2 border-dashed border-[#3F5210] rounded-xl flex items-center justify-center text-center cursor-pointer ${
                dragOver ? "bg-[#d8d7cc]" : ""
              }`}
            >
              <span className="text-[#3F5210] font-medium">
                {file ? file.name : "Klik atau drag file gambar ke sini"}
              </span>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-[#1C2507]">
                <input type="checkbox" checked={rahasia} onChange={() => setRahasia(!rahasia)} />
                Rahasia
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-[#1C2507]">
                <input type="checkbox" checked={anonim} onChange={() => setAnonim(!anonim)} />
                Anonim
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full md:w-auto px-8 py-3 bg-[#556117] text-white rounded-xl text-lg font-semibold hover:bg-[#3f4a12] disabled:opacity-50"
            >
              {submitting ? "Mengirim..." : "Lapor"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}