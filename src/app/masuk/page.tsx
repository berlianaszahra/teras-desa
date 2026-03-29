'use client'
 
import { useState } from "react"
import Container from "@/components/loginContainer/Container"
import Masuk from "@/components/masuk/Masuk"
 
export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login:', { username, password })
    // TODO: panggil API login di sini
  }
 
  return (
    <Container mode="masuk">
      <Masuk
        username={username}
        password={password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onGoogleLogin={() => console.log('Login Google')}
      />
    </Container>
  )
}
 