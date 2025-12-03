import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
const CompactCTA = () => {
  return (
    <div className="mt-20 text-center">
      {/* Compact CTA */}
      <div className="inline-block bg-white rounded-2xl px-10 py-8 shadow-xl border border-cyan-100">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Ready to Transform Your Health?
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Join thousands already managing their health better — with AI that truly cares.
        </p>
        <Link to="/auth">
        <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          Get Started Free
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        </Link>
      </div>
    </div>
    
  )
}

export default CompactCTA