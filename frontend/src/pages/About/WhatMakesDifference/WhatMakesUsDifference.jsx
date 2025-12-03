import React from 'react';
import { differenceData } from './differenceData';
import WhatMakesUsDifferenceCard from './WhatMakesUsDifferenceCard';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatMakesUsDifference = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-teal-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 text-teal-600 font-semibold text-sm uppercase tracking-wider mb-4">
            <Sparkles className="w-5 h-5" />
            What Sets Tena+ Apart
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Recovery, <span className="text-teal-600">Reimagined</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another health app. We're your dedicated recovery partner — combining cutting-edge AI with genuine human care.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {differenceData.map((item, index) => (
            <WhatMakesUsDifferenceCard
              key={item.title}
              {...item}
              index={index}
            />
          ))}
        </div>

        {/* Closing Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-2xl md:text-3xl font-medium text-gray-800">
            Because <span className="text-teal-600 font-bold">you deserve more</span> than just getting by.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            You deserve to <span className="text-teal-600 font-semibold">thrive</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatMakesUsDifference;