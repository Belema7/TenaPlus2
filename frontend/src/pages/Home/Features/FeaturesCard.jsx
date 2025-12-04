import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const FeaturesCard = ({ icon: Icon, title, description, color, items, index }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, index % 2 === 0 ? 15 : -15]); // staggered float

  return (
    <div className="p-8 rounded-2xl bg-transparent border border-gray-500 hover:border-emerald-500/40 shadow-lg hover:shadow-2xl transition-all duration-300 group relative">
      {/* ICON with parallax */}
      <motion.div
        style={{ y }}
        className={`p-4 rounded-xl bg-${color}-500/20 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`text-${color}-400`} size={36} />
      </motion.div>

      {/* TITLE */}
      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-300">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      {/* ITEMS LIST */}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-300">
            <CheckCircle2 className={`text-${color}-400`} size={20} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesCard;
