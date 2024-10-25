'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

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
        <button 
        onClick={() => router.push('/')}
        className="border-2 border-black px-2 ml-6 mt-4 rounded-lg"
        >
        Back
        </button>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
       <h1 className="text-6xl">Register Page</h1>
  
       <form 
       className="border-4 border-black p-10 rounded-xl flex flex-col text-xl -mt-20"
       onSubmit={handleRegister}
       >

        <label htmlFor="username" className="mb-1">Enter Username</label>
        <input type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-2 border-black block mb-2"
        required
        />

        <label htmlFor="password" className="mb-1">Enter Password</label>
        <input type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-black block mb-2"
        required
        />

        <label htmlFor="password" className="mb-1">Enter Password Again</label>
        <input type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border-2 border-black block"
        required
        />

         <button
         type="submit"
         className="text-xl border-2 border-black rounded-lg px-2 mt-8">
          Registry account</button>
       </form>
  
      </div>
    </>
    );
}

export default Register
