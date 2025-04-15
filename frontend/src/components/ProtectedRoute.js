// Import necessary module to redirect unauthenticated users
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if a userId exists in localStorage (indicates logged-in user)
  const user = localStorage.getItem('userId');

  // If user is logged in, render the protected component
  // Otherwise, redirect the user to the login page
  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
