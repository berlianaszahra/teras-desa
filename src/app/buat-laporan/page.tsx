import FormLaporan from "@/components/buatlaporan/FormLaporan";
import AlurLaporan from "@/components/buatlaporan/Alur";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BuatLaporanPage() {
  return (
    <main className="bg-[#F5F1E9] min-h-screen font-[Poppins] flex flex-col">

      <Navbar />

      {/* ── Hero / Judul ── */}
      <section className="text-center px-6 md:px-10 lg:px-20 pt-28 md:pt-36 lg:pt-44 pb-10">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#252525] leading-tight">
          TerasDesa
        </h1>

        <p className="mt-4 text-base md:text-xl lg:text-2xl text-[#252525] max-w-3xl mx-auto leading-relaxed">
          Transparansi Evaluasi Rencana Anggaran &amp; Sarana Desa
        </p>
      </section>

      {/* ── Form ── */}
      <section className="px-2 md:px-6 lg:px-0">
        <FormLaporan />
      </section>

      {/* ── Alur ── */}
      <section className="mt-10 md:mt-16">
        <AlurLaporan />
      </section>

      <Footer />

    </main>
  );
}