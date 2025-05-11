import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import FoodSearch from '../pages/public/food-search'
import Login from '../pages/public/login'
import Signup from '../pages/public/signup'
import ForgotPassword from '../pages/public/forgot-password'
import ResetPassword from '../pages/public/reset-password' 
import Restaurants from '../pages/public/restaurants'
import Home from '../pages/public/home'
import ManageOrders from '../pages/public/manage-orders'
import AdminManageUsersAndVendorse from '../pages/admin/manage-users-vendors'
import DeliverySignup from '../pages/delivery/delivery-signup'
import Profile from '../pages/public/profile'
import Cart from '../pages/user/cart'
import Payment from '../pages/user/payment'
import UserSignup from '../pages/user/user-signup'
import ManageMenu from '../pages/vendor/manage-menu'
import ManageOffers from '../pages/vendor/manage-offers'
import VendorSignup from '../pages/vendor/vendor-signup'
import NotFound from '../pages/public/not-found'
import VendorRouteProtector from '../components/vendor-route'
import AdminRouteProtector from '../components/admin-route'
import UserRouteProtector from '../components/user-route'
import DeliveryRouteProtector from '../components/delivery-route'
import Menus from '../pages/public/menus';

const RoutesConfig  = () => ( 
  <Routes>
    <Route path="/" element={<Home />} />  
    <Route path="/search" element={<FoodSearch />} />  
    <Route path="/restaurants" element={<Restaurants />} />  
    <Route path="/forget-password" element={<ForgotPassword />} />  
    <Route path="/reset-password/:token" element={<ResetPassword />} />   
    <Route path="/signup" element={<Signup />} />  
    <Route path="/login" element={<Login />} />  
    <Route path="/profile" element={<Profile />} />  
    <Route path="/orders" element={<ManageOrders />} />  
    <Route path="/menus" element={<Menus />} />   
    <Route path="/admin/users" element={<AdminManageUsersAndVendorse />} />   
    <Route path="/delivery/signup" element={<DeliverySignup />} />   
    <Route path="/user/cart" element={<Cart />} />   
    <Route path="/user/payment" element={<Payment />} />  
    <Route path="/user/signup" element={<UserSignup />} />   
    <Route path="/vendor/menus" element={<ManageMenu />} />   
    <Route path="/vendor/offers" element={<ManageOffers />} />  
    <Route path="/vendor/signup" element={<VendorSignup />} />   
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default RoutesConfig; 

{/* <VendorRouteProtector>
  //component
</VendorRouteProtector>  */}