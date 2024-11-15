'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import Button from "../components/Button"

const Register= () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const router = useRouter()

    const handleRegister = async (e: FormEvent) => {
      e.preventDefault()

      if(password !== confirmPassword) {
        alert('Password do not match')
        return
      }

        try {
          const response = await axios.post('/api/register', {
            username,
            password
          });

          if(response.status === 200) {
            alert(response.data.message || 'Registration successful');
            router.push('/')
          } else {
            alert(response.data.message || 'Registration failed')
          }
        
        } catch (error) {
          console.error('Registration error', error);
          alert('An error occurred during registration')
        }
    }
  
    return (
        <>
        <Button
        click={() => router.push('/')}
        className="border-2 border-black px-1 ml-6 mt-4 rounded-lg bg-black text-white">
       <>Back</>
        </Button>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-40 font-[family-name:var(--font-geist-sans)] animate-popUp registryForm">
       <h1 className=" text-white registryH1">Register Account</h1>
  
       <form 
       className="border-4 border-black p-10 rounded-xl flex flex-col text-xl bg-gradient-to-br from-gray-100 to-gray-400 registerPage-glow-effect"

       onSubmit={handleRegister}>

        <label htmlFor="username" className="mb-1">Enter Username</label>
        <input type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-2 border-black block mb-2"
        required/>

        <label htmlFor="password" className="mb-1">Enter Password</label>
        <input type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-black block mb-2"

        required/>

        <label htmlFor="password" className="mb-1">Enter Password Again</label>
        <input type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border-2 border-black block"
        required/>

         <button
         type="submit"
         className="text-xl border-2 border-black rounded-lg px-2 mt-8 bg-black text-white registryBtn">
          Register</button>
       </form>
  
      </div>
    </>
    );
}

export default Register
