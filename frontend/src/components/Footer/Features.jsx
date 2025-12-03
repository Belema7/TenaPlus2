import React from "react";

const Features = () => {
  return (
    <div>
      {/* Features */}
      <h3 className="text-lg font-semibold mb-4 text-white">Features</h3>

      <ul className="space-y-3">
        {[
          "Personalized Routines",
          "Medication Reminders",
          "Progress Tracking",
          "Motivational Support",
          "Health Analytics",
          "AI Health Advice",
        ].map((feature) => (
          <li key={feature}>
            <span className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm cursor-pointer">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;
