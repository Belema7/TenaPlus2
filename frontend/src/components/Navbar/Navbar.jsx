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
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-emerald-500 font-medium transition-colors"
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <NavLink
                to="/auth"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                 Get Started
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard"
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="block text-gray-700 hover:text-emerald-500 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}

            {!user ? (
              <NavLink
                to="/auth"
                className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </NavLink>
            ) : (
              <NavLink
                to="/dashboard"
                className="block w-full text-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
