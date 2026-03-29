const timelineItems = [
  { label: "Perencanaan Proyek", tanggal: "02 Januari 2026", done: true },
  { label: "Pengadaan Material", tanggal: "15 Januari 2026", done: true },
  { label: "Pembangunan Tahap 1", tanggal: "01 Februari 2026", done: true },
  { label: "Pembangunan Tahap 2", tanggal: "10 Maret 2026", done: true },
  { label: "Finishing", tanggal: "Direncanakan akhir Maret 2026", done: false },
];

interface DeskripsiDPProps {
  deskripsi: string;
}

export default function DeskripsiDP({ deskripsi }: DeskripsiDPProps) {
  return (
    <div className="px-4 md:px-12 lg:px-[128px] flex flex-col lg:flex-row gap-4 md:gap-6">
      
      {/* ── Deskripsi ── */}
      <div className="flex-1 bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-3 md:gap-4">
        <h2 className="text-lg md:text-2xl font-semibold text-[#252525]">
          Deskripsi Proyek
        </h2>

        <p className="text-sm md:text-xl font-normal text-[#252525] leading-relaxed md:leading-[131.8%] text-justify">
          {deskripsi}
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="w-full lg:w-[385px] bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl md:rounded-[30px] p-4 md:p-6 lg:p-9 flex flex-col gap-4">
        
        <h2 className="text-lg md:text-2xl font-bold text-[#252525]">
          Timeline Proyek
        </h2>

        <div className="flex flex-row gap-3">
          
          {/* Ikon */}
          <div className="flex flex-col items-center w-5 md:w-6">
            {timelineItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                
                {/* Circle */}
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill={item.done ? "#3F5210" : "#FCF1D9"}
                  />
                  {item.done && (
                    <path
                      d="M7 12l3.5 3.5L17 8"
                      stroke="white"
                      strokeWidth="2"
                    />
                  )}
                </svg>

                {/* Line */}
                {i < timelineItems.length - 1 && (
                  <div className="w-px h-8 md:h-[42px] bg-[#252525]" />
                )}
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="flex flex-col flex-1">
            {timelineItems.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${
                  i < timelineItems.length - 1 ? "mb-4 md:mb-[26px]" : ""
                }`}
              >
                <span className="text-sm md:text-xl font-semibold text-[#252525] leading-tight md:leading-[131.8%]">
                  {item.label}
                </span>
                <span className="text-xs md:text-base text-[#252525]">
                  {item.tanggal}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}