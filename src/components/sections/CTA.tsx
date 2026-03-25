export function CTA() {
return (
    <section className="relative w-full h-[585px] overflow-hidden">

    {/* Background Image */}
    <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
        backgroundImage: "url('/images/bg bawah.webp')",
        }}
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r 
                    from-[#FCEFD4]/60 to-[#968E7E]/60" />

    {/* Top Bar */}
    <div className="absolute top-0 left-0 w-full h-[82px] bg-[#A64A0D]" />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 gap-6">

        <h2 className="text-[48px] font-bold text-[#26310A] leading-[1.3] max-w-[700px]">
        Bangun Transparansi Desa Bersama TerasDesa
        </h2>

        <p className="text-[20px] text-[#3F5210] max-w-[630px] leading-relaxed">
        Pantau proyek pembangunan desa, lihat penggunaan anggaran,
        dan ikut berkontribusi dalam kemajuan desa.
        </p>

        <button className="mt-4 w-[251px] h-[56px] flex items-center justify-center
                        bg-[#556117] rounded-[16px]
                        text-white font-semibold text-[20px]
                        hover:scale-105 hover:bg-[#445012]
                        transition duration-300">
        Jelajah Desa
        </button>

    </div>
    </section>
)
}