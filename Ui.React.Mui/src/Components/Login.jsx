import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

export default function Login({setCookies}) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken', 'tokenExpiration', 'tokenType']);

  
  async function handleLogin() {
    const bodyContent = {
      email: email,
      password: password
    }

    
    const res = await fetch("http://localhost:5273/login", {
      method: "POST",
      headers: {
                  'content-type': 'application/json'          
              },
      body: JSON.stringify(bodyContent)

    })

    const data = await res.json()
    console.log(data)

    setCookies("accessToken", data.accessToken)
    setCookies("refreshToken", data.refreshToken)
    setCookies("tokenExpiration", data.expiresIn)
    setCookies("tokenType", data.tokenType)

    setEmail("")
    setPassword("")
  }

  return (
    <form>
        <TextField
            required
            label="Email"
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

        <TextField
            required
            label="Password"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        
        <Button onClick={handleLogin}>Login</Button>
        
    </form>
  )
}
