import Navbar from "../layout/Navbar"; 
import Link from "next/link";

export default function HeroSection() {
    return (
       <section className="relative h-screen bg-[#F5F1E9]">

        <Navbar />
        <section className="relative w-full h-[805px] rounded-b-[30px] overflow-hidden">
      
      {/* Background Image */}
      <img
        src="/images/bg.webp" alt="hero" className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 
                  bg-[linear-gradient(206.5deg,rgba(102,102,102,0.6)_14.78%,rgba(0,0,0,0.6)_85.22%)]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-40">
        
        <h1 className="text-6xl md:text-8xl font-bold text-[#ECEEE7] leading-tight">
          TerasDesa
        </h1>

        <p className="text-xl md:text-3xl font-normal text-[#ECEEE7] mt-4 max-w-2xl">
          Transparansi Evaluasi Rencana Anggaran & Sarana Desa
        </p>

      <Link href="/jelajah-desa">
        <button className="mt-8 w-[251px] h-[56px] 
                   flex items-center justify-center
                   bg-[#556117] border border-[#FDF5E3] 
                   rounded-2xl text-white text-lg font-semibold 
                   hover:scale-105 transition">
            Jelajahi Desa
        </button>
      </Link>

      </div>
    </section>
        
       </section>

    )
}
