const steps = [
  {
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <path d="M10 40V15l15-10 15 10v25H30v-12h-10v12H10z" stroke="#FFFCF5" strokeWidth="5" strokeLinejoin="round"/>
      </svg>
    ),
    bgActive: true,
    label: "Tulis Laporan",
    desc: "Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap",
  },
  {
    icon: (
      <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
        <rect x="3" y="3" width="44" height="34" rx="4" stroke="#2B3537" strokeWidth="5"/>
        <path d="M3 13h44" stroke="#2B3537" strokeWidth="5"/>
        <path d="M13 3v10M37 3v10" stroke="#2B3537" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    ),
    bgActive: false,
    label: "Proses Verifikasi",
    desc: "Dalam 3 hari, laporan Anda akan diverifikasi dan diteruskan kepada instansi berwenang",
  },
  {
    icon: (
      <svg width="50" height="56" viewBox="0 0 50 56" fill="none">
        <path d="M25 3L47 14v18c0 12-10 20-22 24C3 52 3 32 3 32V14L25 3z" stroke="#2B3537" strokeWidth="5" strokeLinejoin="round"/>
        <path d="M25 20v8M25 33v2" stroke="#2B3537" strokeWidth="5" strokeLinecap="round"/>
      </svg>
    ),
    bgActive: false,
    label: "Proses Tindak Lanjut",
    desc: "Dalam 5 hari, instansi akan menindaklanjuti dan membalas laporan Anda",
  },
  {
    icon: (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="22" stroke="#2B3537" strokeWidth="5"/>
        <path d="M14 25l8 8 14-16" stroke="#2B3537" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bgActive: false,
    label: "Selesai",
    desc: "Laporan Anda akan terus ditindaklanjuti hingga terselesaikan",
  },
];

export default function AlurLaporan() {
  return (
    <div className="px-6 md:px-12 lg:px-24 py-12 relative">

      {/* Garis (hanya tampil di desktop) */}
      <div className="hidden lg:block absolute top-[80px] left-[10%] right-[10%] border-t border-[#252525]" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center max-w-[250px] z-10">

            {/* Circle */}
            <div
              className={`
                w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px]
                rounded-full flex items-center justify-center
                ${step.bgActive ? "bg-[#394A0E]" : "bg-[#C3C9B5]"}
              `}
            >
              {step.icon}
            </div>

            {/* Text */}
            <div className="mt-6 space-y-3">
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#252525]">
                {step.label}
              </h3>

              <p className="text-sm md:text-base text-[#2C2C2C] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}