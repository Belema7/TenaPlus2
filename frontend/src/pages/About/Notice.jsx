import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Notice = () => {
  return (
    <section className="py-16 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-transparent rounded-2xl p-8 shadow-xl border border-emerald-500/40 transition-all duration-300">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            {/* Optional icon placeholder */}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Important Notice
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            TenaPlus is designed to assist with health management and recovery support,{" "}
            <span className="font-semibold text-emerald-400">
              not to substitute professional medical care
            </span>. Always consult with your healthcare provider for medical advice, diagnosis, or treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <button className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </Link>
            <button className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border-2 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-semibold rounded-lg transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Notice
