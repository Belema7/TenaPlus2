import React from 'react'
import HeroSectionOfAboutUs from './HeroSectionOfAboutUs'
import AboutTenaPlus from './AbouttenaPlus'
import MissionOfTenaPlus from './MissionOfTenaPlus'

const WhatTenaPlus = () => {
  return (
    <div className="min-h-screen bg-[url('/src/assets/images/bg1.jpeg')] bg-cover bg-center bg-fixed">
        <HeroSectionOfAboutUs/>
        <AboutTenaPlus/>
        <MissionOfTenaPlus/>
    </div>
  )
}

export default WhatTenaPlus