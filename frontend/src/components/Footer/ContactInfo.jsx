import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfo = () => {
  return (
    <div>
      {/* Contact Info */}
      <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-emerald-400" />
          <span className="text-gray-300 text-sm">+12519---</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-emerald-400" />
          <span className="text-gray-300 text-sm">team2@gmail.com</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <span className="text-gray-300 text-sm">Addis Abebe, Ethiopia</span>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold mb-3 text-white">Stay Updated</h4>

        <div className="flex">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-emerald-400"
          />

          <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-r-lg transition-all duration-200 text-sm font-medium">
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
