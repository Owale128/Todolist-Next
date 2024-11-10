import Image from 'next/image'
import Sharingan from './spinnerImg/Sharingan.png'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center mb-10 border-2 border-white rounded-full">
      <div className="w-28 h-28 rounded-full animate-spin">
      <Image src={Sharingan} alt='SharinganImage'></Image>
      </div>
    </div>
  )
}

export default Spinner
