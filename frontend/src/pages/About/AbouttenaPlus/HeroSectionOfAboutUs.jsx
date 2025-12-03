import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
// import heroImage from "../../../assets/images/hero-about.png"; // replace with your hero image
import logo from '../../../assets/images/logo.jpg';

const heroImage = logo;

const HeroSectionOfAboutUs = () => {
  return (
    <section className="h-200 md:h-180 py-20 bg-linear-to-r from-emerald-500 to-teal-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About <span className="text-yellow-100">TenaPlus</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Revolutionizing post-hospital care through AI-powered health assistance 
              and personalized recovery support. Our mission is to help patients regain 
              independence and maintain wellness in a smart, effortless way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <Link to="/services">
                <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>

              <Link to="/contact">
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-200">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="flex items-center justify-center w-full">
            <img
              src={heroImage}
              alt="About TenaPlus"
              className="w-62 md:w-full max-w-md object-contain rounded-full shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionOfAboutUs;
