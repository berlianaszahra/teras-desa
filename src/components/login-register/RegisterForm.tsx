interface RegisterFormProps {
  username: string
  email: string
  password: string
  onUsernameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
  onGoogleRegister: () => void
  onSwitchToLogin: () => void
}

export default function RegisterForm({
  username,
  email,
  password,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">

      <h2 className="text-xl font-bold text-center">Buat Akun</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        className="border rounded-[12px] px-4 py-2"
        placeholder="Nama Pengguna"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="border rounded-[12px] px-4 py-2"
        placeholder="E-mail"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="border rounded-[12px] px-4 py-2"
        placeholder="Kata Sandi"
      />

      <button
        type="submit"
        className="bg-[#3a5a2a] text-white py-2 rounded-[12px]"
      >
        Daftar
      </button>

    </form>
  )
}