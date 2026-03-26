export default function Hero() {
  return (
    <section className="w-full flex justify-center pt-[120px]">
      <div className="w-[1196px] flex flex-col gap-[40px]">

        <h1 className="text-[64px] font-bold text-[#252525]">
          Jelajah Desa
        </h1>

        <div className="relative w-full h-[265px] rounded-[30px] overflow-hidden">

          <div className="absolute inset-0 bg-[url('/image.png')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="relative z-10 p-[64px] text-white">
            <p className="text-[40px] font-medium">
              Total Dana Terpakai
            </p>
            <h2 className="text-[64px] font-semibold">
              Rp 1.314.800.000
            </h2>
          </div>

        </div>
      </div>
    </section>
  );
}