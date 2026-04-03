'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login, getCurrentUser, loginWithGoogle } from "@/lib/api"
import { useAuth } from "@/lib/auth-context"
import Container from "@/components/loginContainer/Container"
import Masuk from "@/components/masuk/Masuk"
import { useGoogleLogin } from "@react-oauth/google"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.token)
      const user = await getCurrentUser()
      await refreshUser()
      toast.success('Berhasil masuk!')
      router.push(user.data.role === 'admin' ? '/admin/dashboard' : '/users/jelajah-desa')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login gagal, coba lagi'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('')
      try {
        const res = await loginWithGoogle(tokenResponse.access_token)
        localStorage.setItem('token', res.data.token)
        const user = await getCurrentUser()
        await refreshUser()
        toast.success('Berhasil masuk!')
        router.push(user.data.role === 'admin' ? '/admin/dashboard' : '/users/jelajah-desa')
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Login Google gagal'
        setError(errorMessage)
      }
    },
    onError: () => setError('Login Google gagal'),
  })

  return (
    <Container mode="masuk">
      {error && (
        <p className="text-red-500 text-sm font-poppins text-center">{error}</p>
      )}
      <Masuk
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onGoogleLogin={() => handleGoogleLogin()}
      />
      {loading && <p className="text-center text-sm font-poppins">Loading...</p>}
    </Container>
  )
}