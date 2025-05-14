import api from './api';
const domain = "/admin";

export const addAdmin = async (newAdmin) => api.post(domain+'/signup', newAdmin);

export const getAllEntities = async (type) => api.get(domain+`/entity/${type}`);

export const getEntitiyById = async (id, type) => api.get(domain+`/entity/${id}/${type}`);

export const deleteEntitiyById = async (id, type) => api.delete(domain+`/entity/${id}/${type}`);

export const getTransactions = async () => api.get(domain+`/transactions`);

export const getTransactionById = async (id) => api.get(domain+`/transactions/${id}}`);

export const approveAccount = async (id, type) => api.patch(domain+`/approve-account/${id}/${type}}`);
 
export const getOrder = async () => api.get(domain+`/order}`);

export const getOrderById = async (id) => api.get(domain+`/order/${id}}`);

export const deleteOrderById = async (id) => api.delete(domain+`/order/${id}}`);

export const updateUser = async (data) => api.patch(domain+`/update-user`,data);
