import React from 'react'
import HowItWorksCard from './HowItWorksCard'
import { howItWorksData } from './howItWorksData'

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          How TenaPlus Works
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-20">
          Your AI-powered companion guides you step-by-step toward a healthier life.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {howItWorksData.map((item) => (
            <HowItWorksCard key={item.step} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
