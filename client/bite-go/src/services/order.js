import api from './api';
const domain = "/order";
 
export const getOrderDetails = async (id) => api.get(domain+`/${id}`);
   
//for user   
export const createOrder = async (data) => api.post(domain+`/user`, data);
  
export const getUserOrders = async () => api.get(domain+`/user/all`);

export const getOrderStatus = async () => api.get(domain+`/user/status`);

//for vendor  
export const getVendorOrders = async () => api.get(domain+`/vendor/all`);
 
export const updateVendorOrder = async (id) => api.put(domain+`/vendor/${id}/process`);  

//for delivery

export const getDeliveryOrders = async () => api.get(domain+`/delivery/all`);