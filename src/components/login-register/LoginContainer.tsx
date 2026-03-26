'use client'
import { useState } from "react"
import Image from 'next/image'
import LoginForm from './LoginForm' 
import RegisterForm from "./RegisterForm"

type AuthMode = 'login' | 'register'

export default function LoginContainer() {
    const [mode, setMode] = useState<AuthMode>('login')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (mode === 'login') {
            console.log('Login:', { username, password })
        } else {
            console.log('Register:', { username, email, password })
        }
    }

    return (
        <div 
            className="min-h-screen w-full flex flex-col bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.webp')" }}
        >
            {/* Navbar */}
            <div className="flex items-center gap-2 p-4 md:p-6">
                <Image src="/images/logo-tr.webp" alt="TerasDesa" width={40} height={40} />
                <span className="text-black font-bold text-lg md:text-xl">TerasDesa</span>
            </div>

            {/* Card */}
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="flex flex-col lg:flex-row w-full max-w-[900px] shadow-2xl rounded-[40px] overflow-hidden">

                    {/* LEFT */}
                    <div className="bg-white w-full p-6 md:p-10 flex justify-center items-center">
                        <div className="w-full max-w-md">
                            {mode === 'login' ? (
                                <LoginForm
                                    username={username}
                                    password={password}
                                    onUsernameChange={setUsername}
                                    onPasswordChange={setPassword}
                                    onSubmit={handleSubmit}
                                    onGoogleLogin={() => console.log('Google Login')}
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
                                    onSubmit={handleSubmit}
                                    onGoogleRegister={() => console.log('Google Register')}
                                    onSwitchToLogin={() => setMode('login')}
                                />
                            )}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-1/2 bg-gradient-to-b from-[#394A0E] to-[#88B021] text-white flex flex-col justify-center items-center p-6 md:p-10 text-center">
                        <h3 className="text-2xl md:text-3xl font-bold">
                            {mode === 'login' ? 'Selamat Datang Kembali!' : 'Selamat Datang!'}
                        </h3>

                        <p className="text-sm mt-3">
                            Laporkan, pantau, dan bantu ciptakan perubahan positif.
                        </p>

                        <button
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="mt-5 border border-white rounded-xl px-4 py-2 hover:bg-white hover:text-[#3a5a2a] transition"
                        >
                            {mode === 'login' ? 'Buat Akun' : 'Masuk'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}