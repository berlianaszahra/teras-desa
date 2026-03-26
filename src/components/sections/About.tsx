export default function About() {
    return (
        <section className="w-full flex justify-center py-24 bg-[#F5F1E9]">
      
      <div className="w-[1196px] flex items-center gap-16">

        {/* LEFT (Image / Shape) */}
        <div className="relative w-[596px] h-[513px] rounded-[30px] overflow-hidden">

        {/* kotak belakang */}
        <div className="absolute inset-0 bg-[#3F5210] rounded-[30px] z-0" />

        {/* lingkaran */}
        <div className="absolute w-[507px] h-[448px] bg-[#2F3E0C] rounded-full top-8 left-10 z-10" />

        {/* gambar */}
        <img
src="/images/bapak.webp"
            alt="Image Bapak Desa"
            className="absolute w-[474px] h-[601px] top-[-60px] left-[30px] z-20"
        />

</div>

        {/* RIGHT (Text) */}
        <div className="w-[485px] flex flex-col gap-4">

          <h2 className="text-[40px] font-bold text-[#252525]">
            Tentang Kami
          </h2>

          <p className="text-[20px] text-[#252525]">
            TerasDesa
          </p>

          {/* garis */}
          <div className="w-full h-[12px] rounded-full 
                          bg-gradient-to-r from-[#3F5210] to-[#8DB824]" />

          <p className="text-[20px] leading-[131.8%] text-[#252525] text-justify">
            TerasDesa adalah platform digital yang membantu meningkatkan transparansi dan partisipasi masyarakat dalam pembangunan desa. 
            Melalui platform ini, warga dapat memantau penggunaan dana desa, melihat progres proyek pembangunan, serta melaporkan permasalahan fasilitas secara langsung. 
            TerasDesa hadir untuk mendorong pengelolaan desa yang lebih terbuka, akuntabel, dan responsif terhadap kebutuhan masyarakat.
          </p>

        </div>
      </div>
    </section>
    )
}