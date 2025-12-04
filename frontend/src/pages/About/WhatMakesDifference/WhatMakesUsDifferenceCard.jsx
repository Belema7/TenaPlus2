import React from 'react';
import { motion } from 'framer-motion';

const WhatMakesUsDifferenceCard = ({ title, description, icon: Icon, gradient, light, border, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group relative overflow-hidden rounded-3xl bg-transparent px-8 py-1 shadow-lg hover:shadow-2xl transition-all duration-500 border border-red-600 hover:border-${border}`}
    >
      {/* Gradient Background Orb (Decorative) */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

      <div className="relative z-10 flex flex-col items-start">
        {/* Icon */}
        <div className={`w-16 h-16 ${light} rounded-2xl flex items-center justify-center mb-6 ring-8 ring-gray-900 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-8 h-8 text-${gradient.split(' ')[1].split('-')[1]}-400`} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-lg text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Subtle Arrow */}
        <div className="mt-6 flex items-center text-emerald-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
          <span className="text-sm font-medium mr-2">Learn more</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default WhatMakesUsDifferenceCard;
