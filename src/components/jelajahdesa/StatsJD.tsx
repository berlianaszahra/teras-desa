const stats = [
  { label: "Total Anggaran", value: "Rp 1,3M" },
  { label: "Proyek Aktif", value: "12" },
  { label: "Proyek Selesai", value: "47" },
  { label: "Laporan", value: "130" },
];

export default function StatsJD() {
  return (
    <div
      className="mx-4 md:mx-10 lg:mx-[122px] rounded-2xl md:rounded-[30px] 
                 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 
                 py-6 md:py-[37px] px-4 md:px-6 shadow-md"
      style={{ background: "linear-gradient(90deg, #391A05 0%, #9F490E 100%)" }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-2 md:gap-3 
                     rounded-xl md:rounded-[30px] border border-[#E46612] 
                     bg-[#391A05] py-4 md:py-6 shadow-sm"
        >
          <span className="text-xl md:text-3xl lg:text-[48px] font-bold text-white leading-none">
            {stat.value}
          </span>

          <span className="text-xs md:text-sm lg:text-xl font-semibold text-white text-center">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}