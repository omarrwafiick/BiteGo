import React from 'react'
import  AppStore  from '../store/appStore';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const isAuthenticated = AppStore((state) => state.isAuthenticated);
  const role = useStore((state) => state.role);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(role.toLowerCase()!=="user"){
    return <Navigate to="/" />;
  }

  return children;
};

export default UserRoute;