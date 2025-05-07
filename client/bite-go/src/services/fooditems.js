import api from './api';
const domain = "/fooditem";

export const getFoodItems = async () => api.get(domain+'/');
 
export const addFoodItem = async (data) => api.post(domain+'/add-item', data);

export const getFoodAvailable = async (pincode) => api.get(domain+`/available/${pincode}`);
 
export const getTopResturant = async (pincode) => api.get(domain+`/top-resturants/${pincode}`);

export const getFoodIn30Minute = async (pincode) => api.get(domain+`/availablein30min/${pincode}`);

export const searchFood = async (pincode) => api.get(domain+`/search/${pincode}`);
//vendor === resturant
export const getResturantById = async (id) => api.get(domain+`/resturant/${id}`);
  