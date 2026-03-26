import Link from "next/link";
 
export default function CTAJD() {
  return (
    <div className="relative w-full overflow-hidden flex flex-col">
      {/* Top bar coklat */}
      <div className="w-full h-[82px] bg-[#A64A0D]" />
 
      {/* Background image dengan overlay */}
      <div
        className="w-full h-[569px]"
        style={{
          background:
            "linear-gradient(124.4deg, rgba(252,239,212,0.6) 7.09%, rgba(105,115,49,0.6) 70.32%), url('/images/bg bawah.webp') center/cover no-repeat",
        }}
      />
 
      {/* CTA content — di-center secara absolut */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 max-w-[661px] text-center mt-[82px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-[48px] font-bold text-[#26310A] leading-[131.8%]">
              Bangun Transparansi Desa Bersama TerasDesa
            </h2>
            <p className="text-xl font-normal text-[#3F5210] leading-[131.8%]">
              Pantau proyek pembangunan desa, lihat penggunaan anggaran, dan ikut
              berkontribusi dalam kemajuan desa.
            </p>
          </div>
 
          <Link
            href="#"
            className="flex items-center gap-2 px-[37px] py-[22px] bg-[#556117] rounded-2xl hover:bg-[#3f4a12] transition-colors"
          >
            <span className="text-2xl font-semibold text-white">Buat Laporan</span>
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#ECEEE7]"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
 