import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import FoodSearch from '../pages/public/food-search'
import Login from '../pages/public/login'
import Signup from '../pages/public/signup'
import ForgotPassword from '../pages/public/forgot-password'
import RestaurantDetails from '../pages/public/restaurant-details'
import Home from '../pages/public/home'
import AdminManageOrders from '../pages/admin/manage-orders'
import HomManageUsersAndVendorse from '../pages/admin/manage-users-vendors'
import DeliveryOrders from '../pages/delivery/delivery-orders'
import DeliveryProfile from '../pages/delivery/delivery-profile'
import Cart from '../pages/user/cart'
import OrderHistory from '../pages/user/order-history'
import Payment from '../pages/user/payment'
import UserProfile from '../pages/user/user-profile'
import VendorProfile from '../pages/vendor/vendor-profile'
import ManageMenu from '../pages/vendor/manage-menu'
import ManageOffers from '../pages/vendor/manage-offers'
import VendorManageOrders from '../pages/vendor/manage-orders'
import NotFound from '../pages/public/not-found'

const RoutesConfig  = () => ( 
  <Routes>
    <Route path="/" element={<Home />} />  
    <Route path="/search" element={<FoodSearch />} />  
    <Route path="/resturant-details" element={<RestaurantDetails />} />  
    <Route path="/forget-password" element={<ForgotPassword />} />  
    <Route path="/signup" element={<Signup />} />  
    <Route path="/login" element={<Login />} />  
    <Route path="/admin/orders" element={<AdminManageOrders />} />  
    <Route path="/admin/users" element={<HomManageUsersAndVendorse />} />  
    <Route path="/delivery/orders" element={<DeliveryOrders />} />  
    <Route path="/delivery/profile" element={<DeliveryProfile />} />  
    <Route path="/user/profile" element={<UserProfile />} />  
    <Route path="/user/cart" element={<Cart />} />  
    <Route path="/user/orders" element={<OrderHistory />} />  
    <Route path="/user/payment" element={<Payment />} />  
    <Route path="/vendor/orders" element={<VendorManageOrders />} />  
    <Route path="/vendor/menus" element={<ManageMenu />} />  
    <Route path="/vendor/profile" element={<VendorProfile />} />  
    <Route path="/vendor/offers" element={<ManageOffers />} />  
    <Route path="*" element={<NotFound />} />
  </Routes>
);
export default RoutesConfig; 
 