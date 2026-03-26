export default function Hero() {
  return (
    <section className="px-4 md:px-10 lg:px-[122px] pt-24 md:pt-32 lg:pt-[237px] flex flex-col gap-6 md:gap-10 bg-[#F5F1E9]">

      {/* Judul */}
      <h1 className="text-3xl md:text-5xl lg:text-[64px] font-bold text-[#252525] leading-tight">
        Jelajah Desa
      </h1>

      {/* Banner */}
      <div
        className="w-full min-h-[180px] md:min-h-[220px] lg:h-[265px] rounded-2xl md:rounded-[30px] flex flex-col justify-center px-4 md:px-10 lg:px-16"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('/images/bg jelajah desa.webp') center/cover no-repeat",
        }}
      >
        <p className="text-lg md:text-2xl lg:text-[40px] font-medium text-white">
          Total Dana Terpakai
        </p>

        <p className="text-2xl md:text-4xl lg:text-[64px] font-semibold text-white">
          Rp 1.314.800.000
        </p>
      </div>

    </section>
  )
}