import React from 'react'
import LayOut from '../../components/LayOut/LayOut'
import WhatTenaPlus from './AbouttenaPlus/WhatTenaPlus'
import HowItWork from './HowItWork/HowItWork'
import WhatMakesUsDifference from './WhatMakesDifference/WhatMakesUsDifference'
import Notice from './Notice'

const About = () => {
  return (
    <LayOut>
      <WhatTenaPlus/>
      <HowItWork/>
      <WhatMakesUsDifference/>
      <Notice/>
    </LayOut>
  )
}

export default About