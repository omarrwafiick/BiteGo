import api from './api';
const domain = "/offer";
//for user
export const getUserOffers = async (pincode) => api.get(domain+`/user/${pincode}`);

export const verifyUserOffer = async (id) => api.get(domain+`/user/verify/${id}`);

export const getVendorOffers = async (id) => api.get(domain+`/vendor`);
 
//for vendor
 
export const addVendorOffers = async (data) => api.post(domain+`/vendor`, data);

export const updateOffers = async (data, id) => api.put(domain+`/vendor/${id}`, data);

export const removeVendorOffer = async (id) => api.delete(domain+`/vendor/${id}`);

export const addFoodItemToOffer = async (offerid, itemid) => api.put(domain+`/add-item/vendor/${offerid}/${itemid}`);

 