const stats = [
  {
    icon: (
      <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
        <rect x="8" y="10" width="35" height="31" rx="3" stroke="#2B3537" strokeWidth="2"/>
        <path d="M8 18h35M17 10v8M34 10v8M14 26h8M14 32h14" stroke="#2B3537" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    value: "12",
    label: "Laporan",
    sub: "3 belum diproses",
  },
  {
    icon: (
      <svg width="45" height="45" viewBox="0 0 45 45" fill="none">
        <rect x="3" y="8" width="39" height="29" rx="3" stroke="#2B3537" strokeWidth="2"/>
        <path d="M3 16h39M12 8v8M33 8v8" stroke="#2B3537" strokeWidth="2" strokeLinecap="round"/>
        <rect x="10" y="22" width="25" height="10" rx="2" stroke="#2B3537" strokeWidth="2"/>
      </svg>
    ),
    value: "12",
    label: "Proyek",
    sub: "5 diproses  |  7 selesai",
  },
  {
    icon: (
      <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
        <circle cx="25" cy="25" r="20" stroke="#2B3537" strokeWidth="2"/>
        <path d="M25 12v5M25 34v5M12 25h5M34 25h5" stroke="#2B3537" strokeWidth="2" strokeLinecap="round"/>
        <path d="M18 25h14M25 18v14" stroke="#2B3537" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    value: "1,3 M",
    prefix: "Rp.",
    label: "Total Anggaran",
    sub: null,
  },
];
 
export default function StatsAdmin() {
  return (
    <div className="flex flex-row gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="relative w-[318px] h-[200px] bg-[#ECEEE7] border-2 border-[#3F5210] rounded-[15px] overflow-hidden flex flex-col"
        >
          {/* Top half — ikon */}
          <div className="flex items-center justify-center gap-4 px-[35px] pt-[22px] h-[100px] border-b border-[#3F5210]">
            <div className="w-[51px] h-[51px] bg-[#C3C9B5] rounded-full flex items-center justify-center flex-shrink-0">
              {s.icon}
            </div>
            <span className="text-xl font-semibold text-[#3F5210] leading-[131.8%] flex-1">
              {s.label}
            </span>
          </div>
 
          {/* Bottom half — angka */}
          <div className="flex items-end gap-2 px-[35px] pt-2 pb-[21px]">
            {s.prefix && (
              <span className="text-xl font-medium text-[#3F5210] mb-1">{s.prefix}</span>
            )}
            <span className="text-[64px] font-semibold text-[#3F5210] leading-[131.8%]">
              {s.value}
            </span>
          </div>
 
          {/* Sub label */}
          {s.sub && (
            <p className="absolute bottom-[21px] left-[35px] text-[15px] font-normal text-[#3F5210]">
              {s.sub}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
 