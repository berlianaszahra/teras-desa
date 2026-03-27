
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
    <div className="mx-[122px] relative flex flex-row justify-around items-start py-10">
      {/* Garis penghubung horizontal */}
      <div className="absolute top-[80px] left-[15%] right-[15%] h-px border-t border-[#252525]" />
 
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-center gap-[21px] w-[192px] z-10">
          {/* Lingkaran ikon */}
          <div
            className={`w-[160px] h-[160px] rounded-full flex items-center justify-center ${
              step.bgActive ? "bg-[#394A0E]" : "bg-[#C3C9B5]"
            }`}
          >
            {step.icon}
          </div>
 
          {/* Label & deskripsi */}
          <div className="flex flex-col gap-[22px] items-center">
            <span className="text-2xl font-semibold text-[#252525] text-center tracking-[0.5px]">
              {step.label}
            </span>
            <span className="text-base font-normal text-[#2C2C2C] text-center tracking-[0.5px] leading-[120%]">
              {step.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
 