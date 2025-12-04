import React from "react";
import { featureData } from "./featureData";
import FeaturesCard from "./FeaturesCard";
import { motion, useScroll, useTransform } from "framer-motion";

const Features = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 50]); // background shift
  const y2 = useTransform(scrollY, [0, 500], [0, -30]); // opposite shift

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Gradient Parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 bg-gradient-to-b bg-transparent to-black"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Everything You Need to Stay Healthy
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive, AI-powered tools designed for real recovery and long-term wellness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {featureData.map((item, index) => (
            <FeaturesCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              color={item.color}
              items={item.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
