import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle } from 'lucide-react'
import logo1 from '../../../assets/images/logo1.jpg'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroSection() {
  const { scrollY } = useScroll()

  // Parallax transforms
  const circleY1 = useTransform(scrollY, [0, 400], [0, 40])
  const circleY2 = useTransform(scrollY, [0, 400], [0, -30])
  const imageY = useTransform(scrollY, [0, 400], [0, 25])

  return (
    <section className="relative overflow-hidden bg-transparent text-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative blurred background circles with parallax */}
      <motion.div
        style={{ y: circleY1 }}
        className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: circleY2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content with fade-in */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Your AI Assistant for a
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {' '}Healthier Life
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
            TenaPlus helps you build better habits, track your wellbeing, remind your medications, and get smart AI-powered recommendations—all designed to support a healthier lifestyle.
          </p>

          <div className="flex sm:flex-row gap-4">
            <Link to="/auth">
              <button className="inline-flex items-center justify-center px-6 md:px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Try It Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </Link>

            <Link to="/about">
              <button className="inline-flex items-center justify-center px-6 md:px-8 py-4 border-2 border-emerald-400 text-emerald-300 hover:bg-emerald-400/10 font-semibold rounded-xl transition-all duration-300">
                <PlayCircle className="h-5 w-5 mr-2" />
                Learn More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Image with parallax + fade-in */}
        <motion.div
          className="flex items-center justify-center w-full relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ y: imageY }}
        >
          <div className="absolute inset-0 blur-2xl rounded-full"></div>

          <img
            src={logo1}
            alt="TenaPlus"
            className="relative w-full max-w-sm lg:max-w-md  rounded-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
