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
    <section className="relative">

      {/*  background */}
      <div
        className="w-full h-[300px] md:h-[500px] lg:h-[710px] rounded-b-2xl md:rounded-b-[30px]"
        style={{
          background:
            "linear-gradient(218.74deg, rgba(227,227,227,0) 11.1%, rgba(63,82,16,0.36) 77.74%), linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/renovasi jalan.webp') center/cover no-repeat",
        }}
      />

      {/* content wrapper */}
      <div className="px-4 md:px-12 lg:px-[122px] -mt-20 md:-mt-32 lg:-mt-48">

        <div className="bg-[#E6E5D9] border border-[#556117] shadow-md rounded-2xl md:rounded-[30px] flex flex-col gap-6 p-4 md:p-6">

          {/* top */}
          <div className="flex flex-col lg:flex-row justify-between gap-4">

            {/* Title */}
            <div className="flex flex-col gap-2 max-w-xl">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-[40px] font-bold text-[#2F3E0C] leading-tight">
                {title}
              </h1>
              <p className="text-sm md:text-xl text-[#556117]">
                {lokasi}
              </p>
            </div>

            {/* Images */}
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-lg md:rounded-[15px] overflow-hidden flex-shrink-0"
                >
                  <Image src={img} alt={`foto-${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Progress */}
            <div className="flex items-center gap-4 p-4 border border-[#3F5210] rounded-xl">
              <div>
                <p className="text-sm md:text-xl font-semibold text-[#556117]">
                  {progress}% Selesai
                </p>
                <div className="w-full h-3 md:h-5 bg-[#C3C9B5] rounded-lg mt-2 overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #3F1D05, #C2570F)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Durasi */}
            <div className="flex flex-col justify-center p-4 border border-[#3F5210] rounded-xl">
              <span className="text-sm md:text-xl font-semibold text-[#556117]">
                {durasi}
              </span>
              <span className="text-xs md:text-base text-[#556117]">
                {tanggal}
              </span>
            </div>

            {/* Anggaran */}
            <div className="flex flex-col justify-center p-4 border border-[#3F5210] rounded-xl">
              <span className="text-sm md:text-xl font-semibold text-[#556117]">
                {anggaran}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}