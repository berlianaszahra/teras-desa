import Image from "next/image";
import Link from "next/link";
 
interface ProyekCardSPProps {
  title: string;
  status: string;
  anggaran: string;
  progress: number;
  image: string;
}
 
export default function ProyekCardSP({
  title,
  status,
  anggaran,
  progress,
  image,
}: ProyekCardSPProps) {
  return (
    <div className="flex flex-row items-center gap-6 p-6 bg-[#E6E5D9] rounded-[32px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      {/* Thumbnail */}
      <div className="relative w-[206px] h-[212px] flex-shrink-0 rounded-2xl overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
 
      {/* Info */}
      <div className="flex flex-col gap-2 w-[325px]">
        {/* Judul */}
        <h3 className="text-2xl font-semibold text-[#2F3E0C] leading-[131.8%]">
          {title}
        </h3>
 
        {/* Status badge */}
        <span className="inline-flex w-fit items-center justify-center px-[30px] py-[5px] rounded-xl bg-[#C3C9B5] text-[#2F3E0C] text-sm font-semibold">
          {status}
        </span>
 
        {/* Anggaran & Persentase */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold text-[#999999]">{anggaran}</span>
          <span className="text-2xl font-semibold text-[#999999]">{progress}%</span>
        </div>
 
        {/* Progress bar */}
        <div className="w-full h-[30px] bg-[#E2E5DB] rounded-xl overflow-hidden">
          <div
            className="h-full rounded-xl transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3F1D05 0%, #C2570F 100%)",
            }}
          />
        </div>
 
        {/* Tombol Lihat Detail */}
        <Link href= "/detail-proyek">
          <button className="w-full flex items-center justify-center py-4 bg-[#2F3E0C] rounded-xl hover:bg-[#3d5010] transition-colors">
            <span className="text-2xl font-semibold text-[#E2E5DB]">Lihat Detail</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
 