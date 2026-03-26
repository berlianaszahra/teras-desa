export default function Stats() {
  return (
    <section className="w-full flex justify-center -mt-16 md:-mt-24 z-10 relative bg-[#F5F1E9]">

      <div className="w-full max-w-[1196px] 
                      grid grid-cols-2 md:grid-cols-4 
                      gap-4 md:gap-6
                      px-4 md:px-6 py-6 md:py-10 
                      rounded-2xl md:rounded-[30px] 
                      bg-gradient-to-r from-[#391A05] to-[#9F490E] shadow-md">

        <StatsCard title="Total Anggaran" value="28" />
        <StatsCard title="Proyek Aktif" value="28" />
        <StatsCard title="Proyek Selesai" value="28" />
        <StatsCard title="Laporan" value="28" />

      </div>
    </section>
  )
}

function StatsCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col items-center justify-center
                    bg-[#391A05]
                    border border-[#E46612]
                    rounded-xl md:rounded-[30px]
                    py-4 md:py-6
                    shadow-sm
                    hover:scale-105 transition">

      <h1 className="text-xl md:text-3xl lg:text-[40px] font-bold text-[#ECEEE7]">
        {value}
      </h1>

      <p className="text-xs md:text-sm lg:text-[20px] font-semibold text-[#ECEEE7] text-center">
        {title}
      </p>
    </div>
  )
}