import React from "react";
import { Target, HeartHandshake, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const MissionOfTenaPlus = () => {
  const values = [
    {
      icon: HeartHandshake,
      title: "Compassion-Driven",
      description: "We put empathy and human connection at the heart of recovery.",
    },
    {
      icon: Sparkles,
      title: "Intelligent Innovation",
      description: "Leveraging smart technology to make recovery simpler and more effective.",
    },
    {
      icon: Users,
      title: "Accessible to All",
      description: "Breaking barriers so everyone can access high-quality post-hospital care.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Icon + Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-3xl mb-8 shadow-lg"
          >
            <Target className="h-10 w-10 text-emerald-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Our Mission
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto text-xl md:text-2xl text-gray-300 leading-relaxed mb-16"
          >
            To <span className="text-emerald-400 font-semibold">empower every individual</span> on their health recovery journey by delivering{" "}
            <span className="text-emerald-400 font-semibold">intelligent, personalized, and truly accessible</span> tools that seamlessly bridge the gap between hospital discharge and full recovery at home.
          </motion.p>

          {/* Core Promise */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mb-20"
          >
            <p className="text-2xl md:text-3xl font-medium text-gray-200 italic">
              “Because recovery shouldn’t end at the hospital door.”
            </p>
          </motion.div>

          {/* Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="group relative bg-transparent rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-600  hover:border-emerald-400/40"
              >
                <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
                  <value.icon className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Final Callout */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 text-center"
          >
            <p className="text-lg md:text-xl text-gray-300 font-medium">
              We believe that <span className="text-emerald-400">continuous support</span> is not a luxury —{" "}
              <span className="text-emerald-400">it’s a right</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionOfTenaPlus;
