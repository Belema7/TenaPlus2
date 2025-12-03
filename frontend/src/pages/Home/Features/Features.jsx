// Features.jsx

import React from "react";
import { featureData } from "./featureData";
import FeaturesCard from "./FeaturesCard";

const Features = () => {
    return (
        <div className="bg-emerald-200/40 py-4 md:py-12">
            {/* Section Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Everything You Need to Stay Healthy
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Comprehensive, AI-powered tools designed for real recovery and long-term wellness.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 p-4 max-w-7xl mx-auto">
                {featureData.map((item, index) => (
                    <FeaturesCard
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        color={item.color}
                        items={item.items}
                    />
                ))}
            </div>
        </div>
    );
};

export default Features;
