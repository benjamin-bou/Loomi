import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== roleRequired) {
      return <Navigate to="/" replace />;
    }
  } catch (e) {
    console.error('Invalid token', e);
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;