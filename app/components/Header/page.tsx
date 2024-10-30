'use client'
import { useRouter } from "next/navigation"
import Button from "../Button/page"
import { ITheme } from "@/app/context/ThemeContext"

interface IHeader {
  toggleTheme: () => void
  theme: ITheme;
}

const Header = ({toggleTheme, theme}: IHeader) => {
 const router = useRouter()

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
      className="border-2 border-black px-2 ml-4 mt-5 rounded-lg bg-black text-white">
         <>Logout</>
      </Button>
      <Button 
      click={toggleTheme}
      className="border-2 border-black px-2 mr-4 mt-5 rounded-lg bg-black text-white">
        <>Change to: {theme.name === 'Night'? 'Day': 'Night'}</>
      </Button>
    </div>
  )
}

export default Header
