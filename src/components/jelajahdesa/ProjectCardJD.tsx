import Image from "next/image";
 
interface ProjectCardProps {
  title: string;
  status: string;
  anggaran: string;
  progress: number;
  image: string;
}
 
export default function ProjectCard({
  title,
  status,
  anggaran,
  progress,
  image,
}: ProjectCardProps) {
  return (
    <div className="flex-shrink-0 w-[497px] flex flex-col items-center pb-10 gap-6 bg-[#E6E5D9] rounded-[32px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      {/* Thumbnail */}
      <div className="relative w-full h-[296px] rounded-t-[32px] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
 
      {/* Info */}
      <div className="flex flex-col gap-3 w-full px-6">
        {/* Judul */}
        <h3 className="text-[32px] font-semibold text-[#2F3E0C] leading-[131.8%]">
          {title}
        </h3>
 
        {/* Status badge */}
        <span className="inline-flex w-fit items-center justify-center px-[30px] py-[5px] rounded-xl bg-[#E2E5DB] text-[#2F3E0C] text-sm font-semibold">
          {status}
        </span>
 
        {/* Anggaran & Persentase */}
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold text-[#999999]">{anggaran}</span>
          <span className="text-2xl font-semibold text-[#999999]">{progress}%</span>
        </div>
 
        {/* Progress bar */}
        <div className="w-full h-[30px] bg-[#C3C9B5] rounded-xl overflow-hidden">
          <div
            className="h-full rounded-xl transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3F1D05 0%, #C2570F 100%)",
            }}
          />
        </div>
 
        {/* Tombol Lihat Detail */}
        <button className="w-full flex items-center justify-center px-[10px] py-4 bg-[#2F3E0C] rounded-xl mt-1 hover:bg-[#3d5010] transition-colors">
          <span className="text-2xl font-semibold text-[#C3C9B5]">Lihat Detail</span>
        </button>
      </div>
    </div>
  );
}
 