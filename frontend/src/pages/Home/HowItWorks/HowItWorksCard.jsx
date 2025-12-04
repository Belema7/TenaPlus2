import React from 'react'

export default function HowItWorksCard({ step, color, icon: Icon, title, description }) {
  return (
    <div className="text-center group p-8 rounded-2xl bg-transparent hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-2xl border border-yellow-900 hover:border-emerald-500/40">
      {/* Icon + Step Badge */}
      <div
        className={`relative mb-6 mx-auto w-20 h-20 bg-${color}-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        <div
          className={`absolute -top-2 -right-2 w-8 h-8 bg-${color}-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md`}
        >
          {step}
        </div>

        <Icon className={`h-8 w-8 text-${color}-400`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
