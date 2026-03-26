export default function HeroSP() {
  return (
    <section className="px-[122px] pt-[237px] flex flex-col gap-10">
      {/* Judul */}
      <h1 className="text-[64px] font-bold text-[#252525] leading-[131.8%]">
        Semua Proyek
      </h1>
 
      {/* Banner Total Dana */}
      <div
        className="w-full h-[265px] rounded-[30px] flex flex-col justify-center px-16"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/images/bg jelajah desa.webp') center/cover no-repeat",
        }}
      >
        <p className="text-[40px] font-medium text-white leading-[131.8%]">
          Total Dana Terpakai
        </p>
        <p className="text-[64px] font-semibold text-white leading-[131.8%]">
          Rp 1.314.800.000
        </p>
      </div>
    </section>
  );
}
 