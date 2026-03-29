'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LoginContainerProps {
  mode: 'masuk' | 'daftar'
  children: React.ReactNode
}

export default function LoginContainer({ mode, children }: LoginContainerProps) {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.webp')" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 p-6">
        <Image src="/images/logo-tr.webp" alt="TerasDesa" width={50} height={50} />
        <span className="text-black font-bold text-xl font-poppins">TerasDesa</span>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative flex shadow-2xl w-[881px] h-[554px]">

          {/* Kiri: Form (di-inject dari page masing-masing) */}
          <div className="bg-[#FFFCF5] w-full rounded-[78px] px-14 py-10 pr-[48%] flex flex-col justify-center">
            {children}
          </div>

          {/* Kanan: Panel Hijau */}
          <div
            className="absolute right-0 top-0 h-full w-[47%] px-10 flex flex-col justify-center text-white text-center gap-5
                        rounded-tl-[150px] rounded-tr-[78px] rounded-bl-[150px] rounded-br-[78px]"
            style={{ background: 'linear-gradient(to bottom, #394A0E, #88B021)' }}
          >
            <h3 className="text-3xl font-bold font-poppins leading-tight">
              {mode === 'masuk' ? 'Selamat Datang Kembali!' : 'Selamat Datang!'}
            </h3>
            <p className="text-sm leading-relaxed font-poppins text-[#ECEEE7]">
              Kami menghargai partisipasimu dalam membangun layanan publik yang lebih baik.
              Laporkan, pantau, dan bantu ciptakan perubahan positif.
            </p>
            <p className="text-xs text-[#ECEEE7]/60 font-poppins">
              {mode === 'masuk' ? 'Belum punya akun?' : 'Sudah punya akun?'}
            </p>

            {/* Tombol navigasi pakai Link */}
            <Link href={mode === 'masuk' ? '/daftar' : '/masuk'}>
              <button className="border border-[#ECEEE7] bg-[#628019] hover:bg-[#4e6513] text-[#ECEEE7] rounded-[12px] px-4 py-2.5 text-sm font-semibold font-poppins w-full">
                {mode === 'masuk' ? 'Buat Akun' : 'Masuk'}
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}