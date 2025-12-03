import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../../../components/DataProvider/DataProvider";

const DailyMotivation = () => {
  const [{ motivationTrigger }] = useContext(DataContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // only fetch when medication added
    const fetchMotivation = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/daily-motivation");
        const data = await res.json();
        setMessage(data.motivation);
      } catch {
        setMessage("Stay healthy and keep going! 💪");
      }
      setLoading(false);
    };

    // Only run when the global trigger changes
    if (motivationTrigger > 0) {
      fetchMotivation();
    }
  }, [motivationTrigger]);

  return (
    <div className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-white rounded-xl p-6 shadow-lg mb-6">
      <h2 className="text-lg font-semibold mb-2">💡 Daily Motivation</h2>
      <p className="text-sm sm:text-base">{loading ? "Loading..." : message}</p>
    </div>
  );
};
export default DailyMotivation;

