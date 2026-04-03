'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { getReportById } from "@/lib/api";
import type { ReportDetail } from "@/types";

interface DetailReportModalProps {
  reportId: string;
  onClose: () => void;
}

export default function DetailReportModal({ reportId, onClose }: DetailReportModalProps) {
  const [data, setData] = useState<ReportDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getReportById(reportId)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || "Gagal memuat detail laporan"))
      .finally(() => setLoading(false));
  }, [reportId]);

  if (!reportId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[800px] bg-[#F5F1E9] rounded-[40px] shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto font-poppins text-[#190B02]">
        
        {/* Header Gradient Pill */}
        <div className="w-full bg-gradient-to-r from-[#8B4513] to-[#4B2306] rounded-[50px] py-4 md:py-6 flex items-center justify-center mb-8">
          <h2 className="text-2xl md:text-[36px] font-bold text-white tracking-wide">
            Detail Laporan Warga
          </h2>
        </div>

        {loading ? (
          <div className="py-20 text-center text-xl font-bold animate-pulse text-[#3F5210]">
            Memuat detail laporan...
          </div>
        ) : error ? (
          <div className="py-20 text-center text-xl font-bold text-red-600">
            {error}
          </div>
        ) : data ? (
          <div className="flex flex-col gap-6 md:gap-8">
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-lg md:text-xl">
              <div className="flex flex-col gap-1">
                <span className="font-bold">Kategori: </span>
                <span className="font-semibold text-[#5E5151]">Infrastruktur</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Pelapor: </span>
                <span className="font-semibold text-[#5E5151]">{data.user.name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Judul Laporan: </span>
                <span className="font-semibold text-[#5E5151]">{data.title}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold">Tanggal Laporan: </span>
                <span className="font-semibold text-[#5E5151]">
                  {new Date(data.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
            </div>

            {/* Lokasi */}
            <div className="flex flex-col gap-1 text-lg md:text-xl">
              <span className="font-bold">Lokasi: </span>
              <span className="font-semibold text-[#5E5151]">{data.location}</span>
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col gap-2 text-lg md:text-xl">
              <span className="font-bold text-xl md:text-2xl">Deskripsi: </span>
              <p className="font-semibold text-[#190B02] leading-relaxed text-justify">
                {data.description || "Tidak ada deskripsi rinci."}
              </p>
            </div>

            {/* Bukti Laporan */}
            <div className="flex flex-col gap-4">
              <span className="font-bold text-xl md:text-2xl">Bukti Laporan</span>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {data.images && data.images.length > 0 ? (
                  data.images.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-[30px] overflow-hidden border-2 border-[#3F5210]/10 shadow-sm">
                      <Image 
                        src={img} 
                        alt={`Bukti ${i+1}`} 
                        fill 
                        className="object-cover hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 py-10 bg-[#E6E5D9] rounded-[30px] flex items-center justify-center text-[#5E5151] italic text-lg">
                    Tidak ada gambar bukti terlampir
                  </div>
                )}
              </div>
            </div>

            {/* Footer Button - Proses */}
            <div className="flex justify-center mt-6">
              <button 
                onClick={onClose}
                className="w-full md:max-w-[100%] bg-[#5D6B1D] hover:bg-[#4D5B1A] py-5 rounded-[30px] text-2xl md:text-[32px] font-bold text-white shadow-lg transition-transform active:scale-[0.98]"
              >
                Proses
              </button>
            </div>

          </div>
        ) : null}

        {/* Close Button Top Right */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#190B02] hover:scale-110 transition-transform"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
