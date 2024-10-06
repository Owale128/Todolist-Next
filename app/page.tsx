'use client';
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Home() {
  const router = useRouter()

  const goToTodolist = (e: FormEvent) => {
    e.preventDefault()
    router.push('/Todolist')
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1 className="text-6xl">Login Page</h1>

     <form onSubmit={goToTodolist}>
      <button type="submit" className="text-3xl">Click To Login</button>
     </form>

    </div>
  );
}
