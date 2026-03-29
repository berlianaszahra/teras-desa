const StatsDummy = [
  { value: 24, label: "Total Anggaran" },
  { value: 12, label: "Proyek Aktif" },
  { value: 8, label: "Proyek Selesai" },
  { value: 15, label: "Laporan" },
];

export default function Stats() {
  return (
    <div className="relative z-20 flex justify-center px-4 bg-[#F5F1E9]">

      <div
        className="
        flex flex-wrap md:flex-nowrap
        justify-center
        gap-4 md:gap-12
        px-4 md:px-8 py-10 md:py-16
        bg-gradient-to-r from-[#391A05] to-[#9F490E]
        rounded-[20px] md:rounded-[30px]
        shadow-md
        -mt-20 md:-mt-32 lg:-mt-40
        "
      >
        
        {StatsDummy.map((item, i) => (
          <div
            key={i}
            className="
            flex flex-col items-center justify-center
            w-[140px] h-[120px]
            md:w-[180px] md:h-[150px]
            lg:w-[213px] lg:h-[165px]

            bg-[#391A05]
            border border-[#E46612]
            rounded-[20px] md:rounded-[30px]
            shadow-md
            p-2
            "
          >
            <h1 className="text-3xl md:text-5xl lg:text-[64px] font-bold text-[#ECEEE7]">
              {item.value}
            </h1>

            <p className="text-xs md:text-lg lg:text-[20px] font-semibold text-[#ECEEE7] text-center">
              {item.label}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}