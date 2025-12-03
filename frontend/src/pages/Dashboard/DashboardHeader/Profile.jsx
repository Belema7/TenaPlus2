import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { DataContext } from "../../../components/DataProvider/DataProvider";
import { getAuth, signOut } from "firebase/auth";
import { Type } from "../../../Utility/action.type";

const Profile = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: Type.SET_USER, user: null });
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <div className="mt-4 md:mt-0">
      {user ? (
        <div className="flex items-center gap-3 bg-gray-800/70 rounded-xl px-4 py-2 hover:bg-gray-800 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">
              {user.email.split("@")[0]}
            </p>
            <p className="text-xs text-emerald-300">Patient</p>
          </div>

          <button
            onClick={handleSignOut}
            className="ml-2 text-xs text-red-300 hover:text-red-400"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-2 bg-gray-800/70 rounded-xl px-4 py-2 hover:bg-gray-800 transition"
        >
          <User className="w-6 h-6 text-white" />
          <span className="hidden sm:block text-sm text-gray-300">
            Sign In / Sign Up
          </span>
        </Link>
      )}
    </div>
  );
};

export default Profile;
