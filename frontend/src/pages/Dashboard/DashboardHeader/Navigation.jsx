import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Info } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center gap-2 bg-gray-800/60 rounded-full px-2 py-1.5">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isActive
              ? "bg-emerald-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`
        }
      >
        <Home className="w-4 h-4" />
        Home
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) =>
          `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isActive
              ? "bg-emerald-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`
        }
      >
        <Info className="w-4 h-4" />
        About
      </NavLink>
    </nav>
  );
};

export default Navigation;
