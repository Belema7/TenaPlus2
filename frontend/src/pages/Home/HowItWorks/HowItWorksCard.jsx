import React from 'react'


export default function HowItWorksCard({ step, color, icon: Icon, title, description }) {
    return (
        <div className="text-center group p-6 rounded-2xl hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-xl border border-transparent hover:border-gray-100">
            <div
                className={`relative mb-6 mx-auto w-20 h-20 bg-${color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
            >
                <div
                    className={`absolute -top-2 -right-2 w-8 h-8 bg-${color}-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md`}
                >
                    {step}
                </div>


                <Icon className={`h-8 w-8 text-${color}-600`} />
            </div>


            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    )
}