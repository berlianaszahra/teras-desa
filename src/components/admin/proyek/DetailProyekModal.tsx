'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { getProjectById, PROJECT_STATUS_LABEL, formatRupiah } from "@/lib/api";
import type { ProjectDetail } from "@/types";

interface DetailProyekModalProps {
  projectId: string;
  onClose: () => void;
}

export default function DetailProyekModal({ projectId, onClose }: DetailProyekModalProps) {
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProjectById(projectId)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Gagal memuat detail proyek"))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (!projectId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-[600px] bg-[#F5F1E9] rounded-3xl shadow-2xl p-5 md:p-8 max-h-[90vh] overflow-y-auto font-poppins text-[#190B02]">
        
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-[#3F5210] to-[#2F3E0C] rounded-[30px] py-3 md:py-4 flex items-center justify-center mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
            Detail Proyek Desa
          </h2>
        </div>

        {loading ? (
          <div className="py-14 text-center text-sm font-bold animate-pulse text-[#3F5210]">
            Memuat detail proyek...
          </div>
        ) : error ? (
          <div className="py-14 text-center text-sm font-bold text-red-600">
            {error}
          </div>
        ) : data ? (
          <div className="flex flex-col gap-4">
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <span className="font-bold">Status: </span>
                <span className="font-semibold text-[#5E5151]">
                  {PROJECT_STATUS_LABEL[data.status] || data.status}
                </span>
              </div>
              <div>
                <span className="font-bold">Total Anggaran: </span>
                <span className="font-semibold text-[#5E5151]">
                  {formatRupiah(data.totalBudget, true)}
                </span>
              </div>
              <div>
                <span className="font-bold">Nama Proyek: </span>
                <span className="font-semibold text-[#5E5151]">{data.title}</span>
              </div>
              <div>
                <span className="font-bold">Tanggal Mulai: </span>
                <span className="font-semibold text-[#5E5151]">
                  {new Date(data.startDate).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className="text-sm">
              <span className="font-bold">Lokasi: </span>
              <span className="font-semibold text-[#5E5151]">{data.location}</span>
            </div>

            <div className="text-sm">
              <span className="font-bold">Deskripsi: </span>
              <p className="font-semibold text-[#190B02] leading-relaxed mt-1">
                {data.description || "Tidak ada deskripsi rinci."}
              </p>
            </div>

            {/* Bukti Proyek */}
            <div className="flex flex-col gap-3">
              <span className="font-bold text-sm">Foto Proyek</span>
              <div className="grid grid-cols-2 gap-3">
                {data.images && data.images.length > 0 ? (
                  data.images.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-[#3F5210]/10 shadow-sm">
                      <Image 
                        src={img} 
                        alt={`Foto Proyek ${i+1}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-6 bg-[#E6E5D9] rounded-2xl flex items-center justify-center text-[#5E5151] italic text-sm">
                    Tidak ada gambar proyek terlampir
                  </div>
                )}
              </div>
            </div>

            {/* Footer Button */}
            <div className="flex justify-center mt-4">
              <button 
                onClick={onClose}
                className="w-full bg-[#5D6B1D] hover:bg-[#4D5B1A] py-3 rounded-2xl text-base font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
              >
                Tutup
              </button>
            </div>

          </div>
        ) : null}

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#190B02] hover:scale-110 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
