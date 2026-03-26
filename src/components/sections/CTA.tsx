import Link from "next/link";

export function CTA() {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] lg:h-[585px] overflow-hidden bg-[#F5F1E9]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg bawah.webp')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FCEFD4]/60 to-[#968E7E]/60" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full h-[50px] md:h-[82px] bg-[#A64A0D]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-4 md:gap-6">

        <h2 className="text-2xl md:text-4xl lg:text-[48px] font-bold text-[#26310A] leading-tight max-w-[700px]">
          Bangun Transparansi Desa Bersama TerasDesa
        </h2>

        <p className="text-sm md:text-lg lg:text-[20px] text-[#3F5210] max-w-[630px] leading-relaxed">
          Pantau proyek pembangunan desa, lihat penggunaan anggaran,
          dan ikut berkontribusi dalam kemajuan desa.
        </p>

        <Link
          href="/jelajah-desa"
          className="mt-2 md:mt-4 px-6 py-3 md:px-8 md:py-4 
                     bg-[#556117] rounded-xl md:rounded-[16px]
                     text-white font-semibold text-sm md:text-lg
                     hover:scale-105 hover:bg-[#445012]
                     transition"
        >
          Jelajah Desa
        </Link>

      </div>
    </section>
  );
}