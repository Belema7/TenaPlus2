// FeaturesCard.jsx

import React from "react";
import { CheckCircle2 } from "lucide-react";

const FeaturesCard = ({ icon: Icon, title, description, color, items }) => {
  return (
    <div className="p-6 shadow-md rounded-2xl bg-white hover:shadow-xl transition">
      {/* ICON */}
      <div className={`p-3 rounded-xl bg-${color}-100 w-fit mb-4`}>
        <Icon className={`text-${color}-600`} size={32} />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mb-4">{description}</p>

      {/* ITEMS LIST */}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-gray-700">
            <CheckCircle2 className={`text-${color}-600`} size={18} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturesCard;
