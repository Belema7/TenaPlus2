import React, { useState, useContext } from "react";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DataContext } from "../DataProvider/DataProvider";

const Navbar = () => {
  const [{ user }] = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="bg-[url('/src/assets/images/bg1.jpeg')] fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo className="text-white font-bold text-xl" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-white transition-colors duration-300 relative 
                  ${isActive ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-emerald-500" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <NavLink
                to="/auth"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              >
                Get Started
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-black/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 pt-24 space-y-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `block text-gray-300 hover:text-white text-lg transition-colors duration-300 
                ${isActive ? "font-semibold text-emerald-400" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {!user ? (
            <NavLink
              to="/auth"
              className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </NavLink>
          ) : (
            <NavLink
              to="/dashboard"
              className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
