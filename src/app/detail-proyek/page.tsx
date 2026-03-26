import HeroDP       from "@/components/detailproyek/HeroDP";
import DeskripsiDP  from "@/components/detailproyek/DeskripsiDP";
import UpdateDP     from "@/components/detailproyek/UpdateDP";
import TransparansiDP from "@/components/detailproyek/TransparansiDP";
 
// Data dummy — nanti bisa di-fetch dari API berdasarkan [id]
const proyek = {
  title: "Pembangunan Jalan Desa Sukamaju",
  lokasi: "Dusun Karanganyar, Desa Sukamaju",
  images: [
    "/images/renovasi jalan.webp",
    "/images/monitoring.webp",
    "/images/partisipasi.webp",
  ],
  progress: 65,
  durasi: "75 Hari",
  tanggal: "12 Januari - 30 Maret 2026",
  anggaran: "Rp 120 Juta",
  deskripsi:
    "Pembangunan jalan di Dusun Karanganyar bertujuan meningkatkan akses transportasi masyarakat dan mendukung aktivitas ekonomi desa. Sebelumnya, kondisi jalan rusak dan sulit dilalui saat musim hujan sehingga menghambat mobilitas warga serta distribusi hasil pertanian.\n\nDengan adanya pembangunan ini, diharapkan aktivitas masyarakat menjadi lebih lancar serta konektivitas antar dusun dan perekonomian Desa Sukamaju dapat meningkat.",
};
 
export default function DetailProyekPage() {
  return (
    <main className="relative bg-[#F5F1E9] min-h-screen font-[Poppins] flex flex-col gap-10 pb-20">
      {/* Hero — absolute positioned, butuh padding top untuk konten di bawahnya */}
      <div className="relative w-full" style={{ height: 870 }}>
        <HeroDP
          title={proyek.title}
          lokasi={proyek.lokasi}
          images={proyek.images}
          progress={proyek.progress}
          durasi={proyek.durasi}
          tanggal={proyek.tanggal}
          anggaran={proyek.anggaran}
        />
      </div>
 
      {/* Deskripsi + Timeline */}
      <DeskripsiDP deskripsi={proyek.deskripsi} />
 
      {/* Update Proyek + Komentar */}
      <UpdateDP />
 
      {/* Transparansi Dana */}
      <TransparansiDP />
    </main>
  );
}