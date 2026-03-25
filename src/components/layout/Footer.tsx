export default function Footer() {
  return (
    <footer className="w-full bg-[#2F3E0C] text-[#E2E5DB] px-[100px] py-[70px]">

      <div className="flex justify-between flex-wrap gap-16">

        {/* LEFT */}
        <div className="flex flex-col gap-4">

          {/* Logo */}
          <img
            src="/images/logo-tr.webp"
            alt="logo"
            className="w-[110px]"
          />

          {/* Follow */}
          <p className="text-[24px] font-semibold">
            Follow us!
          </p>

          {/* Social */}
          <div className="flex gap-4 text-xl">
            <span>𝕏</span>
            <span>📸</span>
            <span>▶</span>
            <span>in</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-[70px]">

          {/* Tentang Kami */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[16px] font-semibold">
              Tentang Kami
            </h4>

            <p className="text-[16px]">Profil TerasDesa</p>
            <p className="text-[16px]">Keamanan</p>
            <p className="text-[16px]">Hubungi kami</p>
          </div>

          {/* Tautan */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[16px] font-semibold">
              Tautan Lainnya
            </h4>

            <p className="text-[16px]">Dashboard Transparansi</p>
            <p className="text-[16px]">Monitoring Proyek Desa</p>
            <p className="text-[16px]">Laporan Warga</p>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center text-[16px]">
        © 2026 TerasDesa. All rights reserved. Sistem Informasi Transparansi Desa
      </div>

    </footer>
  );
}