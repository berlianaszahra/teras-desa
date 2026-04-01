export default function Footer() {
  return (
    <footer className="w-full bg-[#2F3E0C] text-[#E2E5DB] px-4 md:px-10 lg:px-[100px] py-10 md:py-16">

      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16">

        {/* LEFT */}
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">

          {/* Logo (FIXED) */}
          <img
            src="/images/logo-tr.webp"
            alt="logo"
            className="
              w-16 sm:w-20 md:w-24 lg:w-28
              h-auto
              object-contain
              brightness-110
              drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]
            "
          />

          {/* Follow */}
          <p className="text-lg md:text-xl font-semibold">
            Follow us!
          </p>

          {/* Social */}
          <div className="flex gap-4 text-lg md:text-xl">
            <span className="cursor-pointer hover:opacity-70 "><img src="/images/twitter.png" alt="Twitter" className="w-6 h-6 object-contain" /></span>
            <span className="cursor-pointer hover:opacity-70"><img src="/images/instagram.png" alt="Instagram" className="w-6 h-6 object-contain" /></span>
            <span className="cursor-pointer hover:opacity-70"><img src="/images/youtube.png" alt="YouTube" className="w-6 h-6 object-contain" /></span>
            <span className="cursor-pointer hover:opacity-70"><img src="/images/linkedin.png" alt="LinkedIn" className="w-6 h-6 object-contain" /></span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-8 md:gap-[70px] text-center md:text-left">

          {/* Tentang Kami */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h4 className="text-sm md:text-base font-semibold">
              Tentang Kami
            </h4>

            <p className="text-sm md:text-base hover:opacity-70 cursor-pointer">
              Profil TerasDesa
            </p>
            <p className="text-sm md:text-base hover:opacity-70 cursor-pointer">
              Keamanan
            </p>
            <p className="text-sm md:text-base hover:opacity-70 cursor-pointer">
              Hubungi kami
            </p>
          </div>

          {/* Tautan */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h4 className="text-sm md:text-base font-semibold">
              Tautan Lainnya
            </h4>

            <p className="text-sm md:text-base hover:opacity-70 cursor-pointer">
              Dashboard Transparansi
            </p>
            <p className="text-sm md:text-base hover:opacity-70 cursor-pointer">
              Monitoring Proyek Desa
            </p>
            <p className="text-sm md:text-base hover:opacity-70 cursor-pointer">
              Laporan Warga
            </p>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 md:mt-12 text-center text-xs md:text-sm opacity-80">
        © 2026 TerasDesa. All rights reserved. Sistem Informasi Transparansi Desa
      </div>

    </footer>
  );
}