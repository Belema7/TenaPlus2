import React from "react";
import { howItWorkData } from "./HowItWorkData";
import HowItWorkCard from "./HowItWorkCard";

const HowItWork = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow these simple steps to get personalized health support with TenaPlus.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {howItWorkData.map((item) => (
          <HowItWorkCard
            key={item.step}
            step={item.step}
            title={item.title}
            description={item.description}
            Icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
