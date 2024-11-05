'use client'
import { useRouter } from "next/navigation"
import Button from "../Button/page"
import { ITheme, ThemeContext } from "@/app/context/ThemeContext"
import { useContext } from "react"

interface IHeader {
  toggleTheme: () => void
}

const Header = ({toggleTheme}: IHeader) => {
 const router = useRouter()
 const theme: ITheme = useContext(ThemeContext)

 const logOut = () => {
  if(confirm('Are you sure?')){
    localStorage.removeItem('token');
    router.push('/')
  }
 }
 
  return (
    <div className="flex justify-between">
      <Button 
      click={logOut}
      className="border-2 px-2 ml-4 mt-5 rounded-lg">
         <>Logout</>
      </Button>
      <Button 
      click={toggleTheme}
      className="border-2 px-2 mr-4 mt-5 rounded-lg">
        <>Change to: {theme.name === 'Night'? 'Day': 'Night'}</>
      </Button>
    </div>
  )
}

export default Header
