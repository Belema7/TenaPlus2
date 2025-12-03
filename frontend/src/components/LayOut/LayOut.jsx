import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const LayOut = ({children}) => {
  return (
    <div>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default LayOut