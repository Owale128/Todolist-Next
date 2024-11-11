'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface IProtectedRoute {
    children: JSX.Element[]
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.replace('/')
        }
    }, [router])

  return (<>{ children }</>
  )
}

export default ProtectedRoute
