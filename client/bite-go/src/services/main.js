import api from './api';
const domain = "";

export const getImageFromServer = async (filename) => api.get(domain+`/${filename}`);

export const uploadAccountImage = async (type,data) => api.patch(domain+`/upload-images/${type}`,data);
 
export const cancelOrder = async (type,id) => api.delete(domain+`/order/${id}/${type}`);
  