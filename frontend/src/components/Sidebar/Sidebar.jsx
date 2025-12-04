import React from "react";
import logo1 from '../../assets/images/logo1.jpg';
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Pill,
  ListChecks,
  TrendingUp,
  Bell,
  MessageCircle,
  X
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/medicineinput", label: "Medication", icon: Pill },
  { to: "/dashboard/tasks", label: "Daily Tasks", icon: ListChecks },
  { to: "/dashboard/progress", label: "Progress", icon: TrendingUp },
  { to: "/dashboard/reminders", label: "Reminders", icon: Bell },
  { to: "/dashboard/aihelp", label: "AI Assistant", icon: MessageCircle }
];

const Sidebar = ({ close }) => {
  return (
    <div className="h-full flex flex-col p-6  text-white">
      {/* Mobile Close Button */}
      {close && (
        <button
          onClick={close}
          className="lg:hidden mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
          Close
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
          <img
            src={logo1}
            alt="TenaPlus Logo"
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">TenaPlus</h1>
          <p className="text-xs text-emerald-400">AI Assistant</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  close && close();
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md transform scale-[1.02]"
                    : "hover:bg-gray-800 text-gray-300 hover:text-white hover:scale-[1.02]"
                }`
              }
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
