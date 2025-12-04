import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const CompactCTA = () => {
  return (
    <section className="mt-32 text-center relative overflow-hidden">
      {/* Decorative blurred glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -left-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      {/* Compact CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="inline-block bg-transparent rounded-2xl px-10 py-12 shadow-2xl border border-blue-400 hover:border-emerald-500/40 transition-all duration-300"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Ready to Transform Your Health?
        </h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          Join thousands already managing their health better — with AI that truly cares.
        </p>

        <Link to="/auth">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  )
}

export default CompactCTA
