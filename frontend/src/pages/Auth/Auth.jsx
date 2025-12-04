import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import logo from "../../assets/images/logo.jpg";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state?.redirect || "/";
  const msg = location.state?.msg;

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading({ signIn: true, signUp: false });
    setError("");

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      setEmail("");
      setPassword("");
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ signIn: false, signUp: false });
    }
  };

  const handleSignUp = async () => {
    setLoading({ signIn: false, signUp: true });
    setError("");

    try {
      await setPersistence(auth, browserSessionPersistence);
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      setEmail("");
      setPassword("");
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading({ signIn: false, signUp: false });
    }
  };

  return (
    <div className="min-h-screen bg-[url('/src/assets/images/authbg.jpeg')] flex flex-col items-center justify-center py-6 px-4">
      {/* Back to Home */}
      <Link to="/" className="w-full max-w-sm mb-6">
        <button className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm">
          Back to Home
        </button>
      </Link>

      {/* Auth Card */}
      <section className="w-full max-w-sm bg-[url('/src/assets/images/auh.jpeg')] rounded-xl shadow-lg border border-orange-600 p-6">
        {/* Logo */}
        <Link to="/" className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="TenaPlus Logo" className="w-14 rounded-full shadow-md" />
            <span className="text-xl font-bold text-white">TenaPlus</span>
          </div>
        </Link>

        {msg && <small className="text-xs text-emerald-400">{msg}</small>}

        {/* Sign In Form */}
        <div className="border border-gray-700 rounded-lg p-4 bg-transparent mt-4">
          <h1 className="text-xl font-bold text-white mb-4">Sign in</h1>
          {error && (
            <p className="text-xs text-red-400 mb-3 p-2 bg-red-900/30 rounded border border-red-700">
              {error}
            </p>
          )}

          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-colors"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-xs font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading.signIn}
              className={`w-full ${
                loading.signIn ? "bg-gray-600 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
              } text-white font-medium py-2 rounded-lg shadow-md text-sm transition-all duration-300`}
            >
              {loading.signIn ? "Please wait..." : "Continue"}
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3">
            By continuing, you agree to{" "}
            <Link to="/terms" className="text-emerald-400 hover:text-emerald-500 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-emerald-400 hover:text-emerald-500 hover:underline">
              Privacy Notice
            </Link>.
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="grow border-t border-gray-700"></div>
          <span className="shrink mx-2 text-xs text-gray-400 bg-gray-900 px-2">New to TenaPlus?</span>
          <div className="grow border-t border-gray-700"></div>
        </div>

        {/* Sign Up */}
        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading.signUp}
          className={`w-full ${
            loading.signUp ? "bg-gray-600 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700 border border-gray-600"
          } text-gray-200 font-medium py-2 rounded-lg shadow-md text-sm transition-all duration-300 flex items-center justify-center space-x-1 mb-2`}
        >
          {loading.signUp ? "Please wait..." : "Create your TenaPlus account"}
        </button>

        {/* Footer Links */}
        <div className="mt-6 pt-4 border-t border-gray-700 text-center">
          <div className="flex flex-wrap gap-3 justify-center text-xs text-gray-400">
            <Link to="/terms" className="hover:text-emerald-400 hover:underline">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-emerald-400 hover:underline">
              Privacy
            </Link>
            <Link to="/help" className="hover:text-emerald-400 hover:underline">
              Help
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-3">© 2025 TenaPlus. Your health, our priority.</p>
        </div>
      </section>
    </div>
  );
};

export default Auth;
