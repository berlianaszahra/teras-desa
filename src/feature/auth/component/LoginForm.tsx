interface LoginFormPops {
    username : string,
    password : string,
    onUsernameChange : (value : string) => void
    onPasswordChange : (value : string) => void
    onSubmit : () => void
    onGoogleLogin : () => void
    onSwitchToRegister : () => void
}

export default function LoginForm({
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    onSubmit,
    onGoogleLogin,
    onSwitchToRegister 
    } : LoginFormPops) {
        return (
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-center">Masuk</h2>

                <button 
                    type = "button"
                    onClick={onGoogleLogin}
                    className="flex items-center justify-center gap-2 border rounded-[12px] px-4 py-2 text-sm"
                > 
                <span className="font-bold" >G</span> Google
                </button>

                <span className="text-center text-xs text-gray-400" >Atau</span>

                <input
                    type = "text"
                    placeholder="Nama Pengguna"
                    value = {username}
                    onChange={e => onUsernameChange(e.target.value)}
                    className="border rounded-[12px] px-4 py-2 text-sm outline-none"
                />

                <input
                    type = "password"
                    placeholder="Kata sandi"
                    value={password}
                    onChange = {e => onPasswordChange(e.target.value)}
                    className="border rounded-[12px] px-4 py-2 text-sm outline-none"
                />


            </form>
)}
