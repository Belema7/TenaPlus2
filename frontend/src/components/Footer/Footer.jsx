import React from "react";
import MainFooter from "./MainFooter";
import QuickLinks from "./QuickLinks";
import Features from "./Features";
import ContactInfo from "./ContactInfo";
import FooterBottomBar from "./FooterBottomBar";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <MainFooter />
          <QuickLinks />
          <Features />
          <ContactInfo />
        </div>

        {/* Bottom Bar */}
        <FooterBottomBar/>
      </div>
    </footer>
  );
};

export default Footer;
