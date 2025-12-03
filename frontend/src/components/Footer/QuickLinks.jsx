import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const QuickLinks = () => {
  return (
    <div>
      {/* Quick Links */}
      <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>

      <ul className="space-y-3">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Dashboard", path: "/dashboard" },
          { name: "Medicine Input", path: "/dashboard/medicineinput" },
        ].map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 text-sm flex items-center gap-2"
            >
              <ArrowRight className="h-3 w-3" />
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
