import React from "react";
import { Menu, X } from "lucide-react";

const NavbarButton = ({ open, setOpen }) => {
  return (
    <button
      className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
      onClick={() => setOpen(!open)}
    >
      {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  );
};

export default NavbarButton;
