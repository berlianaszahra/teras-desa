import Navbar from "../layout/Navbar"; 
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F1E9] overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/bg.webp"
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 
          bg-[linear-gradient(206.5deg,rgba(102,102,102,0.6)_14.78%,rgba(0,0,0,0.6)_85.22%)]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 pt-32 md:pt-40 flex flex-col gap-4">

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#ECEEE7] leading-tight">
          TerasDesa
        </h1>

        <p className="text-sm md:text-xl lg:text-3xl text-[#ECEEE7] max-w-xl md:max-w-2xl">
          Transparansi Evaluasi Rencana Anggaran & Sarana Desa
        </p>

        <Link
          href="/jelajah-desa"
          className="mt-4 md:mt-8 inline-flex items-center justify-center 
                     px-6 py-3 md:px-8 md:py-4
                     bg-[#556117] border border-[#FDF5E3] 
                     rounded-xl md:rounded-2xl 
                     text-white text-sm md:text-lg font-semibold 
                     hover:scale-105 transition w-fit"
        >
          Jelajahi Desa
        </Link>

      </div>

    </section>
  );
}