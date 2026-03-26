import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      
      <div className="max-w-7xl mx-auto px-10 py-4 flex items-center justify-between
                      bg-transparent rounded-2xl mt-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/images/logo-tr.webp" 
            alt="logo navbar" 
            className="w-25 h-25"
          />
          <span className="text-black font-bold text-xl">
            TerasDesa
          </span>
        </div>

        {/* Button */}
        <div className="flex items-center gap-3">

          {/* Daftar (outline) */}
          <Link href="/login">
            <button className="px-2 py-2 rounded-xl border-2 border-[#556117] w-[175px] h-[49px]
                               text-[#556117] font-semibold text-xl 
                               hover:bg-[#556117] hover:text-[#ECEEE7] transition">
              Daftar
            </button>
          </Link>

          {/* Masuk (filled) */}
          <Link href="/login">
            <button className="px-2 py-2 rounded-xl border-2 border-[#556117] bg-[#556117] w-[175px] h-[49px]
                               text-[#ECEEE7] font-semibold text-xl
                               hover:bg-[#556117] hover:text-[#ECEEE7] transition">
              Masuk
            </button>
          </Link>

        </div>
      </div>

    </nav>
  );
}