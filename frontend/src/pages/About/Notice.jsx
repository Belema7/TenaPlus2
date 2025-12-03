import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
const Notice = () => {
  return (
        <section className="py-16 bg-linear-to-r from-amber-50 to-orange-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-200">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {/* <Shield className="h-8 w-8 text-amber-600" /> */}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Important Notice</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                TenaPlus is designed to assist with health management and recovery support, 
                <span className="font-semibold text-amber-700"> not to substitute professional medical care</span>. 
                Always consult with your healthcare provider for medical advice, diagnosis, or treatment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                <button className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors duration-200">
                  Get Started
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
                </Link>
                <button className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-colors duration-200">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Notice