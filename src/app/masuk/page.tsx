'use client'
 
import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import Container from "@/components/loginContainer/Container"
import Masuk from "@/components/masuk/Masuk"
 
export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] =useState(false)
  const [error, setError] = useState('')
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/users', {
        email: email,
        password: password,
      })

      localStorage.setItem('token', res.data.data.token)
      router.push('/')
    }
    catch (err) {
      const error = err as { response?: { data?: { message?: string } } }
      setError(error.response?.data?.message || 'Login gagal, coba lagi')
    } finally { 
      setLoading(false)
    }
    
  }
 
  return (
    <Container mode="masuk">
      {error && (
        <p className="text-red-500 text-sm text-center font-poppins">{error}</p>
      )}
      <Masuk
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onGoogleLogin={() => console.log('Login Google')}
      />
      {loading && <p className="text-center text-sm font-poppins">Loading...</p>}
    </Container>
  )
}
 