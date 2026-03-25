interface RegisterFormPops {
    username : string
    email : string
    password : string
    onUsernameChange : (val : string) => void
    onEmailChange : (val : string ) => void
    onPasswordChange : (val : string ) => void
    onSubmit : (e : React.FormEvent) => void
    onGoogleRegister : () => void
    onSwitchToLogin : () => void
}

export default function RegisterForm ({
    username,
    email,
    password,
    onUsernameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onGoogleRegister,
    onSwitchToLogin
} : RegisterFormPops) {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold text-center">Buat Akun</h2>

            <button
                type = "button"
                onClick={onGoogleRegister}
                className="flex items-center justify-center gap-2 border rounded-[12px] px-4 py-2 text-sm"
            >
                <span className="font-bold">G</span>Google
            </button>

            <span className="text-center text-xs text-black">Atau</span>

            <input
                type="text"
                placeholder="Nama Pengguna"
                value={username}
                onChange={e => onUsernameChange(e.target.value)}
                className="border rounded-[12px] px-4 py-2 text-sm outline-none"
            />

            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={e => onEmailChange(e.target.value)}
                className="border rounded-[12px] px-4 py-2 text-sm outline-none"
            />

            <input
                type = "password"
                placeholder="Kata sandi"
                value={password}
                onChange={e => onPasswordChange(e.target.value)}
                className="border rounded-[12px] px-4 py-2 text-sm outline-none"
            />

            <button
                type = "button"
                onClick={onSubmit}
                className="bg-[#3a5a2a] text-white rounded-[12px] py-2 text-sm font-medium"
                >Buat Akun</button>


        </div>
    )
}



