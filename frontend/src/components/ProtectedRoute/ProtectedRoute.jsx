import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const [{ user, loading }] = useContext(DataContext);
  const location = useLocation();

  // Show nothing (or spinner) while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // Redirect if user is not logged in
  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          msg,
          redirect,
          from: location.pathname,
        }}
      />
    );
  }

  // Render children if user is authenticated
  return children;
};

export default ProtectedRoute;
