import api from './api';
const domain = "/user";
 
export const signupUser = async (data) => api.post(domain+`/signup`,data);

export const createOrder = async (data) => api.post(domain+`/user/order`,data);
 
export const verifyUserAccount = async (data) => api.patch(domain+`/verify-account`,data);
 
export const requestOtp = async () => api.get(domain+`/otp`);

export const getUserProfile = async () => api.get(domain+`/profile`);
 
export const updateUserProfile = async (data) => api.patch(domain+`/update-profile`,data);
 
export const updateUserLocation = async (data) => api.patch(domain+`/update-location`,data);

export const contact = async (data) => api.post(domain+`/contact`, data);
 