import React from 'react'
import LayOut from '../../components/LayOut/LayOut'
import HeroSection from './HeroSection/HeroSection'

import CompactCTA from './CompactCTA/CompactCTA'
import Features from './Features/Features'
import HowItWorks from './HowItWorks/HowItWorks'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <LayOut>
        <div className="min-h-screen">
        <HeroSection/>
        <HowItWorks/>
        <Features/>
        <CompactCTA/>
        </div>
    </LayOut>
  )
}

export default Home