import React from 'react'
import LayOut from '../../components/LayOut/LayOut'
import WhatTenaPlus from './AbouttenaPlus/WhatTenaPlus'
import HowItWork from './HowItWork/HowItWork'
import WhatMakesUsDifference from './WhatMakesDifference/WhatMakesUsDifference'
import Notice from './Notice'

const About = () => {
  return (
    <LayOut>
      <div className="min-h-screen bg-[url('/src/assets/images/bg2.jpeg')] bg-cover bg-center bg-fixed">
        <WhatTenaPlus/>
        {/* <HowItWork/> */}
        <WhatMakesUsDifference/>
        <Notice/>
      </div>
    </LayOut>
  )
}

export default About