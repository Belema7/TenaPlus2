import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import NavbarButton from "../../components/Sidebar/NavbarButton";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white text-black">
      {/* SIDEBAR DESKTOP */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-[#004F3B] text-white z-30">
        <Sidebar />
      </div>

      {/* SIDEBAR MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR MOBILE SLIDE-IN */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#004F3B] text-white z-50 transform transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar close={() => setOpen(false)} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col w-full lg:pl-64">
        {/* FIXED HEADER */}
        <header className="sticky top-0 left-0 right-0 z-30 bg-[#101828] px-4 sm:px-6 lg:px-8 py-4 shadow-md">
          <div className="flex items-center justify-between lg:justify-end">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <NavbarButton open={open} setOpen={setOpen} />
            </div>
            
            {/* Dashboard Header - Will align properly on right */}
            <DashboardHeader />
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;