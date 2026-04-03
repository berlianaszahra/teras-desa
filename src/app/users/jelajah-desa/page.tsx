import HeroJD    from "@/components/jelajahdesa/HeroJD";
import StatsJD   from "@/components/jelajahdesa/StatsJD";
import ProyekJD  from "@/components/jelajahdesa/ProyekJD";
import LaporanJD from "@/components/jelajahdesa/LaporanJD";
import CTAJD     from "@/components/jelajahdesa/CtaJD";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
 
export default function JelajahDesa() {
  return (
    <main className="bg-[#F5F1E9] min-h-screen font-[Poppins] flex flex-col gap-16 pb-0">
      <Navbar />
      <HeroJD />
      <StatsJD />
      <ProyekJD />
      <LaporanJD />
      <CTAJD />
      <Footer />
    </main>
  );
}