import React from "react";
import { Heart, Facebook, Twitter, Instagram } from "lucide-react";

const MainFooter = () => {
  return (
    <footer className=" lg:grid-cols-3 gap-8 p bg-gray-900 text-white">
      {/* Brand Column */}
      <div className="lg:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Heart className="h-6 w-6 text-white" />
          </div>

          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            TenaPlus
          </span>
        </div>

        <p className="text-gray-300 mb-6 text-sm leading-relaxed ">
          Your AI-powered health companion for personalized care, smart reminders,
          and continuous support on your wellness journey.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {[Facebook, Twitter, Instagram].map((Icon, index) => (
            <a
              key={index}
              href="#"
              aria-label={Icon.name}
              className="w-10 h-10 bg-gray-700 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors duration-200"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
