export default function Why () {
    return (
        <section className="w-full flex justify-center py-24">
      
      <div className="w-[1196px] flex flex-col items-center gap-12">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-[40px] font-bold text-[#252525]">
            Mengapa TerasDesa?
          </h2>

          <div className="w-[300px] h-[10px] mx-auto mt-4 rounded-full 
                          bg-gradient-to-r from-[#3F5210] to-[#8DB824]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-8">

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
            desc="Pantau perkembangan proyek desa secara real-time, termasuk progres pekerjaan dan status pembangunan."
            image="/images/monitoring.webp"
          />

          <Card
            title="Partisipasi"
            desc="Mendorong warga untuk berpartisipasi aktif dalam mengawasi dan juga mendukung pembangunan desa."
            image="/images/partisipasi.webp"
          />

          <Card
            title="Laporan Warga"
            desc="Warga dapat melaporkan berbagai permasalahan desa dengan mudah dan cepat melalui sistem pelaporan."
            image="/images/laporan warga.webp"
          />

          <Card
            title="Akses Informasi"
            desc="Informasi terkait proyek pembangunan dan anggaran desa dapat diakses masyarakat secara mudah."
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
    <div
      className="flex flex-row justify-center items-start 
                 p-8 gap-[26px]
                 w-[555px] h-[288px]
                 bg-[#F3EDE7]
                 shadow-md rounded-[16px]"
    >
      
      {/* IMAGE */}
      <div className="w-[224px] h-[224px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={image}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col justify-center items-start gap-2 w-[241px] h-[224px]">
        
        <h3 className="text-[24px] font-semibold text-[#26310A] leading-[131.8%]">
          {title}
        </h3>

        <p className="text-[20px] text-[#252525] leading-[131.8%] text-justify">
          {desc}
        </p>

      </div>
    </div>
  );
}