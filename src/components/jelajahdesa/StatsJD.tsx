const stats = [
  { label: "Total Anggaran", value: "Rp 1,3M" },
  { label: "Proyek Aktif",   value: "12"      },
  { label: "Proyek Selesai", value: "47"      },
  { label: "Laporan",        value: "130"     },
];
 
export default function StatsJD() {
  return (
    <div
      className="mx-[122px] rounded-[30px] flex flex-row justify-center items-center gap-[50px] py-[37px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      style={{ background: "linear-gradient(90deg, #391A05 0%, #9F490E 100%)" }}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center gap-3 w-[213px] h-[165px] rounded-[30px] border border-[#E46612] bg-[#391A05] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
        >
          <span className="text-[48px] font-bold text-white leading-none">
            {stat.value}
          </span>
          <span className="text-xl font-semibold text-white text-center">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}