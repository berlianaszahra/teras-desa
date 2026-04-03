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
    <div className="w-full sm:w-[350px] lg:w-[497px] flex-shrink-0 flex flex-col items-center pb-6 md:pb-10 gap-4 md:gap-6 bg-[#E6E5D9] rounded-2xl md:rounded-[32px] shadow-md">

      <div className="relative w-full h-[200px] md:h-[250px] lg:h-[296px] rounded-t-2xl md:rounded-t-[32px] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-3 w-full px-4 md:px-6">
        <h3 className="text-lg md:text-2xl lg:text-[32px] font-semibold text-[#2F3E0C] leading-tight">
          {title}
        </h3>

        <span className="inline-flex w-fit items-center justify-center px-4 py-1 rounded-xl bg-[#E2E5DB] text-[#2F3E0C] text-xs md:text-sm font-semibold">
          {status}
        </span>

        <div className="flex justify-between items-center">
          <span className="text-sm md:text-lg lg:text-2xl font-semibold text-[#999999]">
            {anggaran}
          </span>
          <span className="text-sm md:text-lg lg:text-2xl font-semibold text-[#999999]">
            {progress}%
          </span>
        </div>
        <div className="w-full h-3 md:h-5 lg:h-[30px] bg-[#C3C9B5] rounded-xl overflow-hidden">
          <div
            className="h-full rounded-xl transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3F1D05 0%, #C2570F 100%)",
            }}
          />
        </div>
        <button className="w-full flex items-center justify-center py-2 md:py-3 lg:py-4 bg-[#2F3E0C] rounded-xl mt-1 hover:bg-[#3d5010] transition">
          <span className="text-sm md:text-lg lg:text-2xl font-semibold text-[#C3C9B5]">
            Lihat Detail
          </span>
        </button>

      </div>
    </div>
  );
}