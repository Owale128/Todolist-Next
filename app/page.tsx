'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Spinner from "./components/Spinner";

export default function Home() {
  const[username, setUsername] = useState('')
  const[password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if(username && password) {
      setLoading(true)

      try {
        
        const response = await axios.post('/api/login', { username, password })
        const { token } = response.data;
        localStorage.setItem('token', token)

        setTimeout(() => {
          router.push('/TodoApp')
          setLoading(false)
        }, 2000);

      } catch (error) {
        alert('User does not exist, please register!')
        console.error(error)
        setLoading(false)
      }

    } else {
      alert('Please enter both username and password')
    }
  }

  const goToRegister = (e: FormEvent) => {
    e.preventDefault()
    router.push('/register')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] animate-popUp">
     <h1 className="text-5xl text-white">Login</h1>

     <form 
     onSubmit={handleLogin}
     className="border-4 border-black p-10 rounded-xl flex flex-col text-xl bg-gradient-to-br from-gray-100 to-gray-400 homePage-glow-effect">
      
      <label htmlFor="username" className="mb-1">Username</label>
      <input type="text"
      name="username"
      className="border-2 border-black block mb-2"
      onChange={(e) => setUsername(e.target.value)}
      required/>

      <label htmlFor="password" className="mb-1">Password</label>
      <input type="password"
      name="password"
      className="border-2 border-black block"
      onChange={(e) => setPassword(e.target.value)}
      required/>

      <button type="submit"
       className="text-xl border-2 border-black rounded-lg px-2 mt-9 block bg-black text-white">
        {loading ? 'Logging in' : 'Login'}
        </button>

       <button
       type="button"
       onClick={goToRegister}
       className="text-xl border-2 border-black rounded-lg px-2 mt-4 bg-black text-white">
        Registry account
        </button>

     </form>

    {loading && <Spinner/>}
    </div>
  );
}
