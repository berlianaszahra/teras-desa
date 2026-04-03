import Image from "next/image";
import Link from "next/link";

export default function HeaderAdmin() {
  return (
    <header className="flex items-center justify-between px-4 md:px-[44px] py-4 md:py-[65px]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-[50px] md:w-[67px] h-[50px] md:h-[61px] relative">
          <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
        </div>
        <span className="text-xl md:text-[32px] font-bold text-[#190B02]">
          TerasDesa
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 md:gap-4">
        <Link href="/admin/upload-proyek">
          <button className="bg-[#556117] hover:bg-[#394A0E] text-white font-semibold text-sm md:text-base font-poppins px-4 md:px-6 py-2 md:py-3 rounded-xl transition-colors">
            + Tambah Proyek
          </button>
        </Link>

        {/* Avatar */}
        <div className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-full bg-[#556117] flex items-center justify-center">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
      </div>
    </header>
  );
}