interface LoginFormProps {
    username: string
    password: string
    onUsernameChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
    onGoogleLogin: () => void
    onSwitchToRegister: () => void
}

export default function LoginForm({
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    onGoogleLogin,
}: LoginFormProps) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-center">Masuk</h2>

            <button type="button" onClick={onGoogleLogin} className="border rounded-xl py-2">
                Google
            </button>

            <input
                type="text"
                placeholder="Nama Pengguna"
                value={username}
                onChange={e => onUsernameChange(e.target.value)}
                className="border rounded-xl px-4 py-2"
            />

            <input
                type="password"
                placeholder="Kata sandi"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}
                className="border rounded-xl px-4 py-2"
            />

            <button type="submit" className="bg-[#3a5a2a] text-white rounded-xl py-2">
                Masuk
            </button>
        </form>
    )
}