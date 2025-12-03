import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 flex flex-col items-center justify-center py-4 px-4">

      {/* Back to Home */}
      <Link to="/" className="w-full max-w-sm mb-4">
        <button className="flex items-center justify-center bg-green-400 hover:bg-green-500 text-white font-semibold py-1.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm">
          Back to Home
        </button>
      </Link>

      {/* Auth Card */}
      <section className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-200 p-4">

        {/* Logo */}
        <Link to="/" className="flex justify-center mb-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="TenaPlus Logo" className="w-14" />
            <span className="text-xl font-bold text-gray-900">TenaPlus</span>
          </div>
        </Link>

        {msg && <small className="text-xs text-blue-600">{msg}</small>}

        {/* Sign In Form */}
        <div className="border border-gray-200 rounded-lg p-3 bg-white mt-2">
          <h1 className="text-xl font-bold text-gray-900 mb-3">Sign in</h1>
          {error && <p className="text-xs text-red-600 mb-2 p-1 bg-red-50 rounded border border-red-200">{error}</p>}

          <form onSubmit={handleSignIn}>
            <div className="mb-3">
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading.signIn}
              className={`w-full ${loading.signIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'} text-white font-medium py-2 rounded-lg shadow-sm text-sm transition-all duration-200`}
            >
              {loading.signIn ? "Please wait..." : "Continue"}
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-2">
            By continuing, you agree to{" "}
            <Link to="/terms" className="text-teal-600 hover:text-teal-700 hover:underline">Terms</Link> and{" "}
            <Link to="/privacy" className="text-teal-600 hover:text-teal-700 hover:underline">Privacy Notice</Link>.
          </p>
        </div>

        {/* Divider */}
        <div className="relative flex items-center my-4">
          <div className="grow border-t border-gray-300"></div>
          <span className="shrink mx-2 text-xs text-gray-500 bg-white px-1">New to TenaPlus?</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Sign Up */}
        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading.signUp}
          className={`w-full ${loading.signUp ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-50 border-gray-300'} text-gray-900 font-medium py-2 rounded-lg border shadow-sm text-sm transition-all duration-200 flex items-center justify-center space-x-1 mb-2`}
        >
          {loading.signUp ? "Please wait..." : "Create your TenaPlus account"}
        </button>

        {/* Footer Links */}
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-600">
            <Link to="/terms" className="hover:text-teal-600 hover:underline">Terms</Link>
            <Link to="/privacy" className="hover:text-teal-600 hover:underline">Privacy</Link>
            <Link to="/help" className="hover:text-teal-600 hover:underline">Help</Link>
          </div>
          <p className="text-xs text-gray-500 mt-2">© 2025 TenaPlus. Your health, our priority.</p>
        </div>

      </section>
    </div>
  );
};

export default Auth;
