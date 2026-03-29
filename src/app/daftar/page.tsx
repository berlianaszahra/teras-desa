'use client'

import { useState } from "react"
import Container from "@/components/loginContainer/Container"
import Daftar from "@/components/daftar/Daftar"

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register:', { username, email, password, phone })
    // TODO: panggil API register di sini
  }

  return (
    <Container mode="daftar">
      <Daftar
        username={username}
        email={email}
        password={password}
        phone={phone}
        onUsernameChange={setUsername}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onPhoneChange={setPhone}
        onSubmit={handleSubmit}
        onGoogleRegister={() => console.log('Register Google')}
      />
    </Container>
  )
}