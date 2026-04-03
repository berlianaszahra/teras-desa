'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E9] flex items-center justify-center px-4">
      <div className="bg-[#E6E5D9] border border-[#3F5210] rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center flex flex-col gap-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-[#9F490E] flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4M12 17h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" stroke="#FDF5E3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#190B02]">403</h1>
        <h2 className="text-xl font-semibold text-[#3F5210]">Akses Ditolak</h2>
        <p className="text-base text-[#5E5151]">
          Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya dapat diakses oleh administrator.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="w-full py-3 bg-[#3F5210] text-[#FDF5E3] rounded-xl font-semibold hover:bg-[#2e3d0c] transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/masuk"
            className="w-full py-3 bg-[#FDF5E3] border border-[#3F5210] text-[#3F5210] rounded-xl font-semibold hover:bg-[#e8e0cc] transition-colors"
          >
            Masuk dengan Akun Lain
          </Link>
        </div>
      </div>
    </div>
  );
}
