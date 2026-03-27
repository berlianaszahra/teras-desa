import FormLaporan  from "@/components/buatlaporan/FormLaporan";
import AlurLaporan  from "@/components/buatlaporan/Alur";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
 
export default function BuatLaporanPage() {
  return (
    <main className="bg-[#F5F1E9] min-h-screen font-[Poppins] flex flex-col gap-10 pb-20">

        <Navbar />
 
      {/* ── Judul halaman ── */}
      <div className="text-center pt-[241px]">
        <h1 className="text-[96px] font-bold text-[#252525] leading-[131.8%]">
          TerasDesa
        </h1>
        <p className="text-[36px] font-normal text-[#252525] leading-[131.8%]">
          Transparansi Evaluasi Rencana Anggaran &amp; Sarana Desa
        </p>
      </div>
 
      {/* ── Form Laporan ── */}
      <FormLaporan />
 
      {/* ── Alur Laporan ── */}
      <AlurLaporan />

      <Footer /> 
 
    </main>
  );
}