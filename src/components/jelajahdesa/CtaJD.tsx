import Link from "next/link";

export default function CTAJD() {
  return (
    <div className="relative w-full flex flex-col">

      {/* Top bar */}
      <div className="w-full h-[60px] md:h-[82px] bg-[#A64A0D]" />

      {/* Background */}
      <div
        className="w-full min-h-[400px] md:min-h-[569px] flex items-center justify-center px-4"
        style={{
          background:
            "linear-gradient(124.4deg, rgba(252,239,212,0.6) 7.09%, rgba(105,115,49,0.6) 70.32%), url('/images/bg bawah.webp') center/cover no-repeat",
        }}
      >
        {/* Content */}
        <div className="flex flex-col items-center gap-4 md:gap-6 max-w-[661px] text-center">

          <div className="flex flex-col gap-2 md:gap-3">
            <h2 className="text-2xl md:text-3xl lg:text-[48px] font-bold text-[#26310A] leading-tight">
              Bangun Transparansi Desa Bersama TerasDesa
            </h2>

            <p className="text-sm md:text-base lg:text-xl text-[#3F5210] leading-relaxed">
              Pantau proyek pembangunan desa, lihat penggunaan anggaran, dan ikut
              berkontribusi dalam kemajuan desa.
            </p>
          </div>

          <Link
            href="#"
            className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-[#556117] rounded-xl md:rounded-2xl hover:bg-[#3f4a12] transition"
          >
            <span className="text-sm md:text-lg lg:text-2xl font-semibold text-white">
              Buat Laporan
            </span>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#ECEEE7] md:w-6 md:h-6 lg:w-10 lg:h-10"
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