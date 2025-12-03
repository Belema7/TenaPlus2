import React from "react";

const HowItWorkCard = ({ step, title, description, Icon, color }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200 text-center">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center bg-${color}-100`}>
        <Icon className={`h-7 w-7 text-${color}-600`} />
      </div>
      <div className="text-sm text-gray-500 mb-2">Step {step}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default HowItWorkCard;
