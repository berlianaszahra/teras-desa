'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import api, { getCurrentUser } from "@/lib/axios"
import Container from "@/components/loginContainer/Container"
import Masuk from "@/components/masuk/Masuk"
import { useGoogleLogin } from "@react-oauth/google"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/users/login', { email, password })
      localStorage.setItem('token', res.data.data.token)
      const user = await getCurrentUser()
      toast.success('Berhasil masuk!')
      router.push(user.role === 'admin' ? '/admin/dashboard' : '/dashboard')
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } }
      setError(error.response?.data?.message || 'Login gagal, coba lagi')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('')
      try {
        const res = await api.post('/users/oauth/google', {
          idToken: tokenResponse.access_token,
        })
        localStorage.setItem('token', res.data.data.token)
        const user = await getCurrentUser()
        toast.success('Berhasil masuk!')
        router.push(user.role === 'admin' ? '/admin/dashboard' : '/dashboard')
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } } }
        setError(error.response?.data?.message || 'Login Google gagal')
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