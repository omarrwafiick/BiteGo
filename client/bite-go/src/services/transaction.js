import api from './api';
const domain = "/transaction";
 
export const addTransaction = async (data) => api.post(domain+``,data);
 