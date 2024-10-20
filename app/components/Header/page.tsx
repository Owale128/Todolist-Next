import { useRouter } from "next/navigation"

const Header = () => {
 const router = useRouter()

 const logOut = () => {
  router.push('/')
 }
  return (
    <div>
      <button 
      onClick={logOut}
      className="border-2 border-black px-2 ml-10 mt-5 rounded-lg"
      >
        Logout
      </button>
    </div>
  )
}

export default Header
