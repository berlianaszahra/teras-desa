interface RegisterFormProps {
    username: string
    email: string
    password: string
    onUsernameChange: (val: string) => void
    onEmailChange: (val: string) => void
    onPasswordChange: (val: string) => void
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
    onGoogleRegister,
    onSwitchToLogin
}: RegisterFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">

            <h2 className="text-xl font-bold text-center">Buat Akun</h2>

            {/* Google */}
            <button
                type="button"
                onClick={onGoogleRegister}
                className="flex items-center justify-center gap-2 border rounded-xl px-4 py-2 text-sm"
            >
                <span className="font-bold">G</span> Google
            </button>

            <span className="text-center text-xs text-gray-400">Atau</span>

            {/* Input */}
            <input
                type="text"
                placeholder="Nama Pengguna"
                value={username}
                onChange={e => onUsernameChange(e.target.value)}
                className="border rounded-xl px-4 py-2 text-sm outline-none"
            />

            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => onEmailChange(e.target.value)}
                className="border rounded-xl px-4 py-2 text-sm outline-none"
            />

            <input
                type="password"
                placeholder="Kata sandi"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}
                className="border rounded-xl px-4 py-2 text-sm outline-none"
            />

            {/* Submit */}
            <button
                type="submit"
                className="bg-[#3a5a2a] text-white rounded-xl py-2 text-sm font-medium"
            >
                Buat Akun
            </button>

            {/* Switch ke login */}
            <p className="text-center text-sm">
                Sudah punya akun?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-[#3a5a2a] font-semibold"
                >
                    Masuk
                </button>
            </p>

        </form>
    )
}