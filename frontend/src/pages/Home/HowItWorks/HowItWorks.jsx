import React from 'react'
import HowItWorksCard from './HowItWorksCard'
import { howItWorksData } from './howItWorksData'

export default function HowItWorks() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                    How TenaPlus Works
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
                    Your AI-powered companion guides you step-by-step toward a healthier life.
                </p>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {howItWorksData.map((item) => (
                        <HowItWorksCard key={item.step} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}