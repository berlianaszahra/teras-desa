'use client'

import { useState } from "react"

interface RegisterFormProps {
  username: string
  name: string
  email: string
  password: string
  phone_number: string
  onUsernameChange: (v: string) => void
  onNameChange: (v: string) => void
  onEmailChange: (v: string) => void
  onPasswordChange: (v: string) => void
  onPhoneNumberChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  onGoogleRegister: () => void
}

function GoogleIcon() {
  return (
    < img src="/images/google2.png" alt="Logo Google" className="w-4 h-4" />
  )
}

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

export default function RegisterForm({
  username, name, email, password, phone_number,
  onUsernameChange, onNameChange, onEmailChange, onPasswordChange, onPhoneNumberChange,
  onSubmit, onGoogleRegister,
}: RegisterFormProps) {
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState({ username: false, name: false, email: false, password: false, phone_number: false })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = {
      username: !username,
      name: !name,
      email: !email,
      password: !password,
      phone_number: !phone_number,
    }
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return
    onSubmit(e)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 w-full">
      <h1 className="text-[36px] font-bold text-[#252525] font-poppins leading-tight tracking-tight">
        Buat Akun
      </h1>

      <button
        type="button"
        onClick={onGoogleRegister}
        className="flex items-center justify-center gap-2 border-2 border-[#252525] rounded-[10px] py-2 px-4 w-full hover:bg-gray-50 font-semibold text-[#252525] text-sm font-poppins"
      >
        <GoogleIcon />
        Daftar dengan Google
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#252525]/20" />
        <span className="text-xs text-[#252525]/50 font-poppins">Atau</span>
        <div className="flex-1 h-px bg-[#252525]/20" />
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Masukkan nama lengkap"
          value={name}
          onChange={(e) => { onNameChange(e.target.value); setErrors(p => ({ ...p, name: false })) }}
          className={`border-2 rounded-[10px] px-3 py-2 text-[#252525] text-sm font-poppins placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.name ? 'border-red-500' : 'border-[#252525]'}`}
        />
        {errors.name && <span className="text-xs text-red-500 font-poppins">Nama lengkap wajib diisi</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Masukkan username"
          value={username}
          onChange={(e) => { onUsernameChange(e.target.value); setErrors(p => ({ ...p, username: false })) }}
          className={`border-2 rounded-[10px] px-3 py-2 text-[#252525] text-sm font-poppins placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.username ? 'border-red-500' : 'border-[#252525]'}`}
        />
        {errors.username && <span className="text-xs text-red-500 font-poppins">Username wajib diisi</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => { onEmailChange(e.target.value); setErrors(p => ({ ...p, email: false })) }}
          className={`border-2 rounded-[10px] px-3 py-2 text-[#252525] text-sm font-poppins placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.email ? 'border-red-500' : 'border-[#252525]'}`}
        />
        {errors.email && <span className="text-xs text-red-500 font-poppins">Email wajib diisi</span>}
      </div>

      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => { onPasswordChange(e.target.value); setErrors(p => ({ ...p, password: false })) }}
            className={`border-2 rounded-[10px] px-3 py-2 text-[#252525] text-sm font-poppins w-full placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.password ? 'border-red-500' : 'border-[#252525]'}`}
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#252525]/40 hover:text-[#556117]">
            <EyeIcon open={showPass} />
          </button>
        </div>
        {errors.password && <span className="text-xs text-red-500 font-poppins">Kata sandi wajib diisi</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="tel"
          placeholder="Masukkan Nomor Telepon"
          value={phone_number}
          onChange={(e) => { onPhoneNumberChange(e.target.value); setErrors(p => ({ ...p, phone_number: false })) }}
          className={`border-2 rounded-[10px] px-3 py-2 text-[#252525] text-sm font-poppins placeholder:text-[#252525]/40 focus:outline-none focus:border-[#556117] ${errors.phone_number ? 'border-red-500' : 'border-[#252525]'}`}
        />
        {errors.phone_number && <span className="text-xs text-red-500 font-poppins">Nomor telepon wajib diisi</span>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#628019] hover:bg-[#394A0E] border border-[#ECEEE7] text-[#ECEEE7] font-semibold text-lg py-2.5 rounded-xl font-poppins mt-1"
      >
        Buat Akun
      </button>
    </form>
  )
}