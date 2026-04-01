const stats = [
  { value: "12", label: "Laporan", sub: "3 belum diproses" },
  { value: "12", label: "Proyek", sub: "5 diproses | 7 selesai" },
  { value: "1,3 M", label: "Total Anggaran", prefix: "Rp.", sub: null },
];

export default function StatsAdmin() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="w-full md:w-[318px] h-[180px] md:h-[200px] bg-[#ECEEE7] border-2 border-[#3F5210] rounded-[15px] p-4 flex flex-col justify-between"
        >
          <div>
            <p className="text-sm md:text-base text-[#3F5210]">{s.label}</p>
            <div className="flex items-end gap-1">
              {s.prefix && <span className="text-sm">{s.prefix}</span>}
              <span className="text-3xl md:text-[48px] font-bold text-[#3F5210]">
                {s.value}
              </span>
            </div>
          </div>

          {s.sub && (
            <p className="text-xs md:text-sm text-[#3F5210]">{s.sub}</p>
          )}
        </div>
      ))}
    </div>
  );
}