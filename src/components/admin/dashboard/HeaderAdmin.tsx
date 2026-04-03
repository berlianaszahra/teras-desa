import Image from "next/image";

export default function HeaderAdmin() {
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 md:py-5">
      <div className="flex items-center gap-2">
        <div className="w-8 md:w-10 h-8 md:h-10 relative">
          <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
        </div>
        <span className="text-base md:text-xl font-bold text-[#ECEEE7] font-poppins">
          TerasDesa
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-lg md:text-2xl font-bold text-[#ECEEE7] font-poppins">
          Admin
        </span>
      </div>
    </header>
  );
}