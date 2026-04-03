import Navbar from "../layout/Navbar"; 
import Link from "next/link";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#F5F1E9] overflow-hidden">

      <div className="relative z-20">
        <Navbar />
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src="/images/bg.webp"
          alt="hero"
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 
          bg-[linear-gradient(206.5deg,rgba(102,102,102,0.6)_14.78%,rgba(0,0,0,0.7)_85.22%)]"
        />
      </div>
      <div className="
        relative z-10 
        max-w-7xl mx-auto 
        px-4 sm:px-6 md:px-10 
        
        pt-24 sm:pt-32 md:pt-40 lg:pt-48
        pb-32 sm:pb-40 md:pb-48
        
        flex flex-col gap-4 sm:gap-5 md:gap-6
      ">

        <h1 className="
          text-3xl 
          sm:text-4xl 
          md:text-6xl 
          lg:text-8xl 
          font-bold 
          text-[#ECEEE7] 
          leading-tight
        ">
          TerasDesa
        </h1>

        <p className="
          text-sm 
          sm:text-base 
          md:text-xl 
          lg:text-3xl 
          text-[#ECEEE7] 
          max-w-full 
          sm:max-w-xl 
          md:max-w-2xl
          leading-relaxed
        ">
          Transparansi Evaluasi Rencana Anggaran & Sarana Desa
        </p>

        <div className="mt-3 sm:mt-4 md:mt-6">
          <Link href="/users/jelajah-desa">
            <Button>
              Jelajahi Desa
            </Button>
          </Link>
        </div>

      </div>

    </section>
  );
}