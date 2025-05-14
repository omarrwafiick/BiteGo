import api from './api';
const domain = "/vendor";
 
export const sigupVendor = async (data) => api.post(domain+`/signup`, data);

export const getVendorProfile = async () => api.get(domain+`/profile`);
 
export const updatetVendorProfile = async (data) => api.patch(domain+`/update-profile`, data);

export const updateVendorService = async (data) => api.patch(domain+`/update-service`, data);

export const updateVendorLocation = async (data) => api.patch(domain+`/update-location`, data);

export const updatetVendorMenu = async (data, id) => api.patch(domain+`/update-menu/${id}`, data);
  