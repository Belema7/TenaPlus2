import React from "react";
import Greeting from "./Greeting";
import Navigation from "./Navigation";
import Profile from "./Profile";

const DashboardHeader = () => {
  return (
    <header className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <Greeting />
      <Navigation />
      <Profile />
    </header>
  );
};

export default DashboardHeader;
