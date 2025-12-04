import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import logo1 from '../../../assets/images/logo1.jpg';
import { motion, useScroll, useTransform } from "framer-motion";

const heroImage = logo1;

const HeroSectionOfAboutUs = () => {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 400], [0, 30]);

  return (
    <section className="relative py-24 bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            About <span className="text-emerald-400">TenaPlus</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Revolutionizing post-hospital care through AI-powered health assistance 
            and personalized recovery support. Our mission is to help patients regain 
            independence and maintain wellness in a smart, effortless way.
          </p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-400 text-emerald-300 rounded-xl hover:bg-emerald-400/10 transition-all duration-300"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - Hero Image */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-transparent blur-2xl rounded-full"></div>
          <img
            src={heroImage}
            alt="About TenaPlus"
            className="relative w-full max-w-sm lg:max-w-md drop-shadow-2xl rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSectionOfAboutUs;
