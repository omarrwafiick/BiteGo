import { Admin } from "../models/admin.model";
import { User } from "../models/user.model";
import { Vendor } from "../models/vendor.model";

export const findVendor = async (id: string | undefined, email?:string) =>{
    return email ? await Vendor.findOne({email: email}) : await Vendor.findById(id);
};

export const findUser = async (id: string | undefined, email?:string) =>{
    return email ? await User.findOne({email: email}) : await User.findById(id);
};

export const findAdmin = async (id: string | undefined, email?:string) =>{
    return email ? await Admin.findOne({email: email}) : await Admin.findById(id);
};