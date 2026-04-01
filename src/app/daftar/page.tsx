'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import Container from "@/components/loginContainer/Container"
import Daftar from "@/components/daftar/Daftar"

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [name , setName] = useState('')
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
      await api.post('/users', {
        username: username,
        name : name,
        email: email,
        phone_number : phone_number,
        password: password,
      })

      router.push('/masuk')

    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } }
      setError (error.response?.data?.message || 'Registrasi gagal, coba lagi')
    } finally {
      setLoading(false)
    }
  }
    
        
  return (
    <Container mode="daftar">
      {error && (
        <p className="text-red-500 text-sm font-poppins text-center"> {error} </p>
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
        onGoogleRegister={() => console.log('Register Google')}
      />
      {loading && <p className=" text-center text-sm font-poppins"> Loading...</p>}
    </Container>
  )
}