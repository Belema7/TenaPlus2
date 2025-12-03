import React from 'react'
import logo from '../../assets/images/logo.jpg'

const Logo = () => {
  return (
    <div className="flex items-center gap-3 bg-black px-3 py-2 rounded-xl select-none">
      <img 
        src={logo} 
        alt="TenaPlus Logo" 
        className="w-10 h-10 object-cover rounded-full border border-gray-700"
      /> 
      <span className="text-white font-semibold tracking-wide text-lg">
        TenaPlus
      </span>
    </div>
  )
}

export default Logo
