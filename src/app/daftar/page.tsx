'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { register, getCurrentUser, loginWithGoogle } from "@/lib/api"
import Container from "@/components/loginContainer/Container"
import Daftar from "@/components/daftar/Daftar"
import { useGoogleLogin } from "@react-oauth/google"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone_number, setPhone_number] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register({ username, name, email, phone_number, password })
      toast.success('Akun berhasil dibuat!')
      router.push('/masuk')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registrasi gagal, coba lagi'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('')
      try {
        const res = await loginWithGoogle(tokenResponse.access_token)
        localStorage.setItem('token', res.data.token)
        const user = await getCurrentUser()
        router.push(user.data.role === 'admin' ? '/admin/dashboard' : '/dashboard')
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Daftar Google gagal'
        setError(errorMessage)
      }
    },
    onError: () => setError('Daftar Google gagal'),
  })

  return (
    <Container mode="daftar">
      {error && (
        <p className="text-red-500 text-sm font-poppins text-center">{error}</p>
      )}
      <Daftar
        username={username}
        name={name}
        email={email}
        password={password}
        phone_number={phone_number}
        onUsernameChange={setUsername}
        onNameChange={setName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onPhoneNumberChange={setPhone_number}
        onSubmit={handleSubmit}
        onGoogleRegister={() => handleGoogleRegister()}
      />
      {loading && <p className="text-center text-sm font-poppins">Loading...</p>}
    </Container>
  )
}