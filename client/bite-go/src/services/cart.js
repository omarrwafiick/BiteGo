import api from './api';
const domain = "/cart";

export const manageCart = async (data) => api.post(domain+'/', data);

export const updateCart = async (data) => api.put(domain+'/', data);

export const getCartItems = async () => api.get(domain+'/');

export const deleteCartItem = async (id) => api.delete(domain+`/deleteitem/${id}`);
   
export const clearCart = async () => api.delete(domain+`/clear`);
 