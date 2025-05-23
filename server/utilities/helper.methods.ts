import { Admin } from "../models/admin.model";
import { Delivery } from "../models/delivery.model";
import { User } from "../models/user.model";
import { Vendor } from "../models/vendor.model";

export const findVendor = async (id: string  = '', email:string = '') =>{
    return email ? await Vendor.findOne({email: email}) : await Vendor.findById(id);
};

export const findUser = async (id: string  = '', email:string = '') =>{
    return email ? await User.findOne({email: email}) : await User.findById(id);
}; 

export const findAdmin = async (id: string  = '', email:string = '') =>{
    return email ? await Admin.findOne({email: email}) : await Admin.findById(id);
};

export const findDelivery = async (id: string  = '', email:string = '') =>{
    return email ? await Delivery.findOne({email: email}) : await Delivery.findById(id);
};

export const getCurrentTime = (validToInput:string) =>{
    const now = new Date();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();
    const milliseconds = now.getUTCMilliseconds();
    const fullDateTimeString = `${validToInput}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}Z`;
    return new Date(fullDateTimeString);
};

