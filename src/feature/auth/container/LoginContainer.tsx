'use client'
import {useState} from "react"
import Image from 'next/image'
import LoginForm from '../component/LoginForm' 
import RegisterForm from "../component/RegisterForm"

type AuthMode = 'login' | 'register'

export default function LoginContainer() {
    const [mode, setMode] = useState<AuthMode>('login')
    const [username, setUsername] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const handleLoginSubmit = (e : React.FormEvent) => {
        e.preventDefault() 
        if (mode == 'login') {
            console.log('Login dengan', {username, password})
        } else {
            console.log('Register dengan', {username, email, password})
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col bg-cover bg-center"
        style={{backgroundImage : "url('/image/bg.webp')"}}
        >
            {/* navbar logo */}
            <div className="flex items-center gap-2 p-6">
                <Image src="/image/logo-1.webp" alt="TerasDesa" width={32} height={32} />
                <span className="text-white font-bold text-lg">TerasDesa</span>
            </div>

            {/* card */}
            <div className="flex-1 flex items-center justify-center">
                <div className="flex rounded-[78px] overflow-hidden shadow-2xl w-[881px] h-[554px] ">
                    {/* panel kiri */}
            <div className="bg-white w-1/2 p-10 flex flex-col justify-center">
                {mode === 'login' ? (
                    <LoginForm 
                    username={username}
                    password={password}
                    onUsernameChange={setUsername}
                    onPasswordChange={setPassword}
                    onSubmit={() => handleLoginSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    onGoogleLogin={() => console.log('Login Google')}
                    onSwitchToRegister={() => setMode('register')}
                    />
                ) : (
                    <RegisterForm
                    username={username}
                    email={email}
                    password={password}
                    onUsernameChange={setUsername}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onSubmit={() => handleLoginSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    onGoogleRegister={() => console.log('Google Register')}
                    onSwitchToLogin={() => setMode('login')}
                    />
                )}
            </div>

            {/* panel kanan */}
            <div className="bg-[#3a5a2a] w-1/2 p-10 flex flex-col justify-center text-white text-center gap-4">
                <h3 className="text-2xl font-bold"> 
                    {mode === 'login' ? 'Selamat Datang Kembali!' : 'Selamat Datang!'}
                    </h3>   
                <p className="text-sm leading-relaxed">
                    Kami menghargai partisipasimu dalam membangun layanan publik yang lebih baik.
                    Laporkan, pantau, dan bantu ciptakan perubahan positif.
                </p>
                <button 
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="border border-white rounded-[12px] px-6 py-2 text-sm font-medium hover:bg-white hover:text-[#3a5a2a] transition w-full">
                    {mode === 'login' ? 'Buat Akun' : 'Masuk'}
                    </button>
                </div>

            </div>
        </div>
    </div>

            
    
)}





