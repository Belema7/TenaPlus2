import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import logo from '../../../assets/images/logo.jpg'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 py-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative blurred background circle */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Your AI Assistant for a
            <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Healthier Life</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-xl leading-relaxed">
            TenaPlus helps you build better habits, track your wellbeing, remind your medications, and get smart AI-powered recommendations—all designed to support a healthier lifestyle.
          </p>

          <div className="flex sm:flex-row gap-2">
            <Link to="/auth">
              <button className="inline-flex items-center justify-center px-2 md:px-8 py-4 ml-8 md:ml-0 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Try It Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </Link>

            <Link to="/about">
              <button className="inline-flex items-center justify-center px-2 md:px-8 py-4 border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100/60 font-semibold rounded-xl transition-all duration-300">
                <PlayCircle className="h-5 w-5 mr-2" />
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Content - Image */}
        <div className="flex items-center justify-center w-full relative">
          <div className="absolute inset-0 bg-linear-to-tr from-emerald-300/20 to-transparent blur-2xl rounded-full"></div>

          <img
            src={logo}
            alt="TenaPlus"
            className="relative w-full max-w-sm lg:max-w-md drop-shadow-xl rounded-2xl"
          />
        </div>
      </div>
    </section>
  )
}
