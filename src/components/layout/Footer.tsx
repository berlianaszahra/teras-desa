export default function Footer() {
  return (
    <footer className="w-full bg-[#2F3E0C] text-[#E2E5DB] px-4 md:px-10 lg:px-[100px] py-10 md:py-16">

      <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-16">

        {/* LEFT */}
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">

          {/* Logo */}
          <img
            src="/images/logo-tr.webp"
            alt="logo"
            className="w-[80px] md:w-[110px]"
          />

          {/* Follow */}
          <p className="text-lg md:text-xl font-semibold">
            Follow us!
          </p>

          {/* Social */}
          <div className="flex gap-4 text-lg md:text-xl">
            <span>𝕏</span>
            <span>📸</span>
            <span>▶</span>
            <span>in</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="grid grid-cols-2 gap-8 md:gap-[70px] text-center md:text-left">

          {/* Tentang Kami */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h4 className="text-sm md:text-base font-semibold">
              Tentang Kami
            </h4>

            <p className="text-sm md:text-base">Profil TerasDesa</p>
            <p className="text-sm md:text-base">Keamanan</p>
            <p className="text-sm md:text-base">Hubungi kami</p>
          </div>

          {/* Tautan */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h4 className="text-sm md:text-base font-semibold">
              Tautan Lainnya
            </h4>

            <p className="text-sm md:text-base">Dashboard Transparansi</p>
            <p className="text-sm md:text-base">Monitoring Proyek Desa</p>
            <p className="text-sm md:text-base">Laporan Warga</p>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 md:mt-12 text-center text-xs md:text-sm">
        © 2026 TerasDesa. All rights reserved. Sistem Informasi Transparansi Desa
      </div>

    </footer>
  );
}