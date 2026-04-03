import Image from "next/image";
import Link from "next/link";

export default function HeaderAdmin() {
  return (
    <header className="flex items-center justify-between px-6 md:px-[60px] py-4 md:py-10">
      <div className="flex items-center gap-2">
        <div className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] relative">
          <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
        </div>
        <span className="text-xl md:text-[40px] font-bold text-[#ECEEE7] font-poppins">
          TerasDesa
        </span>
      </div>

      <div className="flex items-center">
        <span className="text-2xl md:text-[48px] font-bold text-[#ECEEE7] font-poppins">
          Admin
        </span>
      </div>
    </header>
  );
}