export default function About() {
  return (
    <section className="w-full flex justify-center py-12 md:py-20 lg:py-24 bg-[#F5F1E9]">

      <div className="w-full max-w-[1196px] px-4 md:px-10 flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">

        {/* LEFT */}
        <div className="relative w-full max-w-[500px] lg:w-[596px] h-[350px] md:h-[450px] lg:h-[513px] pt-20 md:pt-28 lg:pt-32">

          {/* Background */}
          <div className="absolute inset-0 rounded-2xl md:rounded-[30px] overflow-hidden z-0">
            <div className="absolute inset-0 bg-[#3F5210]" />
            <div className="absolute w-[70%] h-[70%] bg-[#2F3E0C] rounded-full top-6 left-6 md:top-8 md:left-10" />
          </div>

          {/* Image */}
          <img
            src="/images/bapak.webp"
            alt="Image Bapak Desa"
            className="
              absolute 
              w-[80%] max-w-[474px] h-auto 
              left-1/2 -translate-x-1/2
              bottom-[-5px] md:bottom-[-8px] lg:bottom-[-12px]
              z-20
              drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]
            "
          />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[485px] flex flex-col gap-3 md:gap-4 text-center lg:text-left">

          <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-[#252525]">
            Tentang Kami
          </h2>

          <p className="text-base md:text-lg lg:text-[20px] text-[#252525]">
            TerasDesa
          </p>

          {/* Garis */}
          <div className="w-full h-2 md:h-3 rounded-full bg-gradient-to-r from-[#3F5210] to-[#8DB824]" />

          <p className="text-sm md:text-base lg:text-[20px] leading-relaxed text-[#252525] text-justify lg:text-left">
            TerasDesa adalah platform digital yang membantu meningkatkan transparansi dan partisipasi masyarakat dalam pembangunan desa. 
            Melalui platform ini, warga dapat memantau penggunaan dana desa, melihat progres proyek pembangunan, serta melaporkan permasalahan fasilitas secara langsung. 
            TerasDesa hadir untuk mendorong pengelolaan desa yang lebih terbuka, akuntabel, dan responsif terhadap kebutuhan masyarakat.
          </p>

        </div>
      </div>
    </section>
  );
}