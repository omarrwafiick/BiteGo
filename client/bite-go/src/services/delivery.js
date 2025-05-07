import api from './api';
const domain = "/delivery";

export const signupDelivery = async (data) => api.post(domain+'/signup', data);

export const getDeliveryProfile = async () => api.get(domain+'/profile');

export const updateDeliveryProfile = async (data) => api.patch(domain+'/update-profile',data);

export const updateDeliveryLocation = async (data) => api.patch(domain+'/update-location',data);
 
export const updateDeliveyStatus = async (data) => api.patch(domain+'/update-status',data);
 