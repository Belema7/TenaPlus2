import React from "react";
import { Heart, Stethoscope, Activity } from "lucide-react";
import { motion } from "framer-motion";

const AboutTenaPlus = () => {
  const features = [
    { icon: Stethoscope, title: "Personalized Care", description: "AI-driven recommendations and recovery plans tailored to your unique needs.", color: "emerald" },
    { icon: Heart, title: "Motivational Support", description: "Daily encouragement and milestone tracking to keep you on track.", color: "teal" },
    { icon: Activity, title: "Progress Monitoring", description: "Track your health metrics, trends, and improvements easily.", color: "cyan" },
  ];

  return (
    <section className="py-20 px-6 bg-transparent text-white">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Heart className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What is TenaPlus?</h2>
        <p className="text-lg text-gray-400 leading-relaxed">
          TenaPlus is an innovative AI health assistant designed to support patients in their recovery journey 
          after hospital visits. We combine cutting-edge artificial intelligence with compassionate care to 
          provide personalized health management solutions that adapt to your unique needs.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-transparent rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-green-600  hover:border-red-400/40"
            >
              <div className={`w-14 h-14 mx-auto mb-6 rounded-xl flex items-center justify-center bg-${feature.color}-500/20`}>
                <Icon className={`h-7 w-7 text-${feature.color}-400`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutTenaPlus;
