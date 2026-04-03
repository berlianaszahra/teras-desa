import Link from "next/link";
import Button from "../ui/Button";

export function CTA() {
  return (
    <section className="relative w-full min-h-[420px] sm:min-h-[500px] lg:h-[585px] overflow-hidden bg-[#F5F1E9]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg bawah.webp')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FCEFD4]/60 to-[#968E7E]/60" />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full h-[40px] sm:h-[60px] md:h-[82px] bg-[#A64A0D]" />

      {/* Content */}
      <div className="
        relative z-10 
        flex flex-col items-center justify-center 
        text-center 
        
        px-4 sm:px-6 md:px-10
        py-16 sm:py-20 md:py-0
        h-full
        
        gap-4 sm:gap-5 md:gap-6
      ">

        <h2 className="
          text-xl sm:text-2xl md:text-4xl lg:text-[48px] 
          font-bold 
          text-[#26310A] 
          leading-tight
          max-w-full sm:max-w-[600px] lg:max-w-[700px]
        ">
          Bangun Transparansi Desa Bersama TerasDesa
        </h2>

        <p className="
          text-sm sm:text-base md:text-lg lg:text-[20px] 
          text-[#3F5210] 
          leading-relaxed
          max-w-full sm:max-w-[550px] lg:max-w-[630px]
        ">
          Pantau proyek pembangunan desa, lihat penggunaan anggaran,
          dan ikut berkontribusi dalam kemajuan desa.
        </p>

        <div className="mt-2 sm:mt-4">
          <Link href="/users/jelajah-desa">
            <Button>
              Jelajah Desa
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}