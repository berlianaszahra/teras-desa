import Image from "next/image";
 
export default function HeaderAdmin() {
  return (
    <header className="flex items-center justify-between px-[44px] py-[65px]">
      {/* Logo + Nama */}
      <div className="flex items-center gap-2">
        <div className="w-[67px] h-[61px] relative">
          <Image src="/images/logo-tr.webp" alt="TerasDesa" fill className="object-contain" />
        </div>
        <span className="text-[32px] font-bold text-[#190B02] leading-[131.8%]">
          TerasDesa
        </span>
      </div>
 
      {/* Avatar admin */}
      <div className="w-[50px] h-[50px] rounded-full bg-[#556117] overflow-hidden flex items-center justify-center">
        <span className="text-white font-bold text-lg">A</span>
      </div>
    </header>
  );
}
 