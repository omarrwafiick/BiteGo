import React from 'react'
import  AppStore  from '../store/appStore';
import { Navigate } from 'react-router-dom';

const DeliveryRoute = ({ children }) => {
  const isAuthenticated = AppStore((state) => state.isAuthenticated);
  const role = useStore((state) => state.role);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(role.toLowerCase()!=="delivery"){
    return <Navigate to="/" />;
  }

  return children;
};

export default DeliveryRoute;