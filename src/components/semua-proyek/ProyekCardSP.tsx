"use client";

import Image from "next/image";
import Link from "next/link";

interface ProyekCardSPProps {
  id: string;
  title: string;
  status: string;
  anggaran: string;
  progress: number;
  image: string;
}

export default function ProyekCardSP({
  id,
  title,
  status,
  anggaran,
  progress,
  image,
}: ProyekCardSPProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 p-4 md:p-6 bg-[#E6E5D9] rounded-2xl md:rounded-[32px] shadow-md w-full">
      
      {/* Thumbnail */}
      <div className="relative w-full h-[200px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        
        {/* Judul */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#2F3E0C] leading-tight md:leading-[131.8%] truncate">
          {title}
        </h3>

        {/* Status */}
        <span className="inline-flex w-fit items-center justify-center px-4 md:px-3 py-1 rounded-lg md:rounded-xl bg-[#C3C9B5] text-[#2F3E0C] text-xs md:text-sm font-semibold">
          {status}
        </span>

        {/* Anggaran & Progress */}
        <div className="flex justify-between items-center">
          <span className="text-sm md:text-lg font-semibold text-[#999999] truncate">
            {anggaran}
          </span>
          <span className="text-sm md:text-lg font-semibold text-[#999999]">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 md:h-5 bg-[#E2E5DB] rounded-lg md:rounded-xl overflow-hidden">
          <div
            className="h-full rounded-lg md:rounded-xl transition-all duration-500"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #3F1D05 0%, #C2570F 100%)",
            }}
          />
        </div>

        {/* Button */}
        <Link href={`/detail-proyek/${id}`}>
          <button className="w-full flex items-center justify-center py-2 md:py-3 bg-[#2F3E0C] rounded-lg md:rounded-xl hover:bg-[#3d5010] transition-colors">
            <span className="text-sm md:text-lg font-semibold text-[#E2E5DB]">
              Lihat Detail
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}