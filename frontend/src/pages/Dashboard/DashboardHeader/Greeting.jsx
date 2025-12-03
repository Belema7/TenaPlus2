import React, { useContext } from "react";
import moment from "moment";
import { Calendar } from "lucide-react";
import { DataContext } from "../../../components/DataProvider/DataProvider";

const Greeting = () => {
  const [{ user }] = useContext(DataContext);

  const today = moment().format("dddd");
  const date = moment().format("MMM D, YYYY");

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* User greeting */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Hello, {user ? user.email.split("@")[0] : "Guest"}
          </h1>
          <p className="text-sm text-gray-400">Welcome back!</p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="font-medium text-white">{today}</span>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-sm">{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
