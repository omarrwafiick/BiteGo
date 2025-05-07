import api from './api';
const domain = "/auth";

export const login = async (credentials) => api.post(domain+'/login', credentials);

export const logout = async () => api.post(domain+'/logout');

export const forgetPassword = async (type) => api.post(domain+`/forget-password/${type}`);

export const resetPassword = async (type, token) => api.post(domain+`/reset-password/${type}/${token}`);

export const checkAuth = async (type) => api.post(domain+`/check-auth/${type}`);
  