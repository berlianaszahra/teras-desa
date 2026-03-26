export default function Why() {
  return (
    <section className="w-full flex justify-center py-12 md:py-20 lg:py-24 bg-[#F5F1E9]">

      <div className="w-full max-w-[1196px] px-4 md:px-10 flex flex-col items-center gap-8 md:gap-12">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#252525]">
            Mengapa TerasDesa?
          </h2>

          <div className="w-[150px] md:w-[300px] h-2 md:h-[10px] mx-auto mt-3 md:mt-4 rounded-full 
                          bg-gradient-to-r from-[#3F5210] to-[#8DB824]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">

          <Card
            title="Transparansi Dana"
            desc="Masyarakat dapat melihat penggunaan dana desa secara terbuka, mulai dari anggaran hingga progres pembangunan."
            image="/images/transparansi dana.webp"
          />

          <Card
            title="Pengelolaan Dana"
            desc="Membantu pemerintah desa mengelola proyek, laporan, dan anggaran secara lebih terstruktur dan efisien."
            image="/images/pengelolaan dana.webp"
          />

          <Card
            title="Monitoring Proyek"
            desc="Pantau perkembangan proyek desa secara real-time."
            image="/images/monitoring.webp"
          />

          <Card
            title="Partisipasi"
            desc="Mendorong warga untuk berpartisipasi aktif dalam pembangunan desa."
            image="/images/partisipasi.webp"
          />

          <Card
            title="Laporan Warga"
            desc="Warga dapat melaporkan berbagai permasalahan desa dengan mudah."
            image="/images/laporan warga.webp"
          />

          <Card
            title="Akses Informasi"
            desc="Informasi proyek dan anggaran mudah diakses masyarakat."
            image="/images/akses info.webp"
          />

        </div>

      </div>
    </section>
  )
}

function Card({
  title,
  desc,
  image,
}: {
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start
                    p-4 md:p-6 gap-4 md:gap-6
                    bg-[#F3EDE7]
                    shadow-sm md:shadow-md rounded-xl md:rounded-[16px]
                    hover:scale-[1.02] transition">

      {/* IMAGE */}
      <div className="w-full md:w-[180px] h-[160px] md:h-[180px] rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} className="w-full h-full object-cover" />
      </div>

      {/* TEXT */}
      <div className="flex flex-col justify-center gap-2 text-center md:text-left">

        <h3 className="text-base md:text-xl lg:text-[24px] font-semibold text-[#26310A]">
          {title}
        </h3>

        <p className="text-sm md:text-base lg:text-[18px] text-[#252525] leading-relaxed">
          {desc}
        </p>

      </div>
    </div>
  )
}