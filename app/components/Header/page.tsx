import { useRouter } from "next/navigation"

const Header = () => {
 const router = useRouter()

 const logOut = () => {
  if(confirm('Are you sure?')){
    localStorage.removeItem('token');
    router.push('/')
  }
 }
 
  return (
    <div>
      <button 
      onClick={logOut}
      className="border-2 border-black px-2 ml-4 mt-5 rounded-lg bg-white"
      >
        Logout
      </button>
    </div>
  )
}

export default Header
