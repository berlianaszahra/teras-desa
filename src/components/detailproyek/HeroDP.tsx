import Image from "next/image";
 
interface HeroDPProps {
  title: string;
  lokasi: string;
  images: string[];
  progress: number;
  durasi: string;
  tanggal: string;
  anggaran: string;
}
 
export default function HeroDP({
  title,
  lokasi,
  images,
  progress,
  durasi,
  tanggal,
  anggaran,
}: HeroDPProps) {
  return (
    <>
      {/* ── Background hero ── */}
      <div
        className="absolute top-0 left-0 w-full h-[710px] rounded-b-[30px]"
        style={{
          background:
            "linear-gradient(218.74deg, rgba(227,227,227,0) 11.1%, rgba(63,82,16,0.36) 77.74%), linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/renovasi jalan.webp') center/cover no-repeat",
        }}
      />
 
      {/* ── Info Card ── */}
      <div className="absolute left-[122px] top-[411px] w-[1196px] bg-[#E6E5D9] border border-[#556117] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[30px] flex flex-row flex-wrap items-start">
        {/* Kiri: Judul + Lokasi */}
        <div className="flex flex-col gap-[35px] px-8 pt-[47px] pb-6 w-[492px]">
          <h1 className="text-[40px] font-bold text-[#2F3E0C] leading-[120%] tracking-[0.5px]">
            {title}
          </h1>
          <p className="text-2xl font-medium text-[#556117] leading-[120%] tracking-[0.5px]">
            {lokasi}
          </p>
        </div>
 
        {/* Kanan: Foto thumbnail */}
        <div className="flex flex-row justify-end items-center gap-3 px-10 pt-6 pb-6 flex-1">
          {images.map((img, i) => (
            <div key={i} className="relative w-[104px] h-[104px] rounded-[15px] overflow-hidden flex-shrink-0">
              <Image src={img} alt={`foto-${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
 
        {/* Bottom: 3 stat cards */}
        <div className="flex flex-row justify-center items-start gap-16 px-10 pt-5 pb-6 w-full">
          {/* Progress */}
          <div className="flex flex-row items-center gap-4 px-4 py-0 w-[347px] h-[121px] bg-[#E6E5D9] border border-[#3F5210] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[15px]">
            <div className="flex-shrink-0 w-[55px] h-[55px] flex items-center justify-center">
              {/* Process icon */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 4v6M20 30v6M4 20h6M30 20h6M7.5 7.5l4.25 4.25M28.25 28.25l4.25 4.25M7.5 32.5l4.25-4.25M28.25 11.75l4.25-4.25" stroke="#556117" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-2xl font-semibold text-[#556117] tracking-[0.5px]">{progress}% Selesai</span>
              <div className="w-[198px] h-[23px] bg-[#C3C9B5] rounded-xl overflow-hidden">
                <div
                  className="h-full rounded-xl"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #3F1D05 0%, #C2570F 100%)",
                  }}
                />
              </div>
            </div>
          </div>
 
          {/* Durasi */}
          <div className="flex flex-row items-center gap-4 px-4 w-[315px] h-[115px] bg-[#E6E5D9] border border-[#3F5210] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[15px]">
            <div className="flex-shrink-0 w-[45px] h-[45px] flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="3" y="7" width="30" height="26" rx="3" stroke="#556117" strokeWidth="2.5"/>
                <path d="M3 14h30M11 3v8M25 3v8" stroke="#556117" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold text-[#556117] tracking-[0.5px]">{durasi}</span>
              <span className="text-base font-semibold text-[#556117] tracking-[0.5px]">{tanggal}</span>
            </div>
          </div>
 
          {/* Anggaran */}
          <div className="flex flex-row items-center gap-4 px-4 w-[315px] h-[121px] bg-[#E6E5D9] border border-[#3F5210] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[15px]">
            <div className="flex-shrink-0 w-[67px] h-[67px] flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="20" stroke="#556117" strokeWidth="2.5"/>
                <path d="M24 12v4M24 32v4M16 24h16M20 20h8a4 4 0 0 1 0 8h-8" stroke="#556117" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-2xl font-semibold text-[#556117] tracking-[0.5px]">{anggaran}</span>
              <span className="text-base font-semibold text-[#556117] tracking-[0.5px]">{anggaran.replace("Rp ", "Rp").replace(" Juta", ".000.000")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 