import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ children, role }) => {
  const user = useAuth();
  if (!user) return <Navigate to="/" />;

  if (role === 'admin' && user.is_admin) return children;
  if (role === 'teacher' && user.is_teacher) return children;
  if (role === 'student' && user.is_student) return children;

  return <Navigate to="/" />;
};

export default PrivateRoute;
