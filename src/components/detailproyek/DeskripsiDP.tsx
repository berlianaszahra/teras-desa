import Image from "next/image"

interface Timeline {
  id: string
  stageName: string
  stageDate: string
  status: 'selesai' | 'diproses' | 'belum'
}

interface DeskripsiDPProps {
  deskripsi: string
  timelines: Timeline[]
}

export default function DeskripsiDP({ deskripsi, timelines }: DeskripsiDPProps) {
  return (
    <div className="px-4 md:px-12 lg:px-[128px] flex flex-col lg:flex-row gap-4 md:gap-6">

      {/* Deskripsi */}
      <div className="flex-1 bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl md:rounded-[30px] p-4 md:p-6 flex flex-col gap-3 md:gap-4">
        <h2 className="text-lg md:text-2xl font-semibold text-[#252525]">
          Deskripsi Proyek
        </h2>
        <p className="text-sm md:text-xl font-normal text-[#252525] leading-relaxed text-justify">
          {deskripsi}
        </p>
      </div>

      {/* Timeline */}
      <div className="w-full lg:w-[385px] bg-[#E6E5D9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-2xl md:rounded-[30px] p-4 md:p-6 lg:p-9 flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold text-[#252525]">
          Timeline Proyek
        </h2>

        <div className="flex flex-row gap-3">
          {/* Ikon */}
          <div className="flex flex-col items-center w-5 md:w-6">
            {timelines.map((item, i) => (
              <div key={item.id} className="flex flex-col items-center">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <circle
                    cx="12" cy="12" r="10"
                    fill={item.status === 'selesai' ? '#3F5210' : '#FCF1D9'}
                  />
                  {item.status === 'selesai' && (
                    <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="2" />
                  )}
                </svg>
                {i < timelines.length - 1 && (
                  <div className="w-px h-8 md:h-[42px] bg-[#252525]" />
                )}
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="flex flex-col flex-1">
            {timelines.map((item, i) => (
              <div
                key={item.id}
                className={`flex flex-col gap-1 ${i < timelines.length - 1 ? 'mb-4 md:mb-[26px]' : ''}`}
              >
                <span className="text-sm md:text-xl font-semibold text-[#252525] leading-tight">
                  {item.stageName}
                </span>
                <span className="text-xs md:text-base text-[#252525]">
                  {new Date(item.stageDate).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}