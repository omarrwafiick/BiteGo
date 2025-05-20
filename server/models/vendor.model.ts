import mongoose, { Schema, Document, Types } from "mongoose"; 
import { IFoodItem } from "./fooditem.model";
import { IOrder } from "./order.model";

interface IVendor extends Document{
    name:string; 
    ownerName:string;  
    pinCode:string; 
    address:string; 
    phone:string; 
    email:string; 
    password:string;
    menu?: IFoodItem[]; 
    orders?: IOrder[];
    isApproved: boolean;
    salt: string;  
    resetToken?: string;
    resetTokenExpiration?: Date;
    profilePicture?: string;  
    serviceAvailable: boolean;   
    rating?: Types.Decimal128;  
};
 
const VendorSchema = new Schema<IVendor>({ 
    name:{ type : String, required: true },
    ownerName:{ type : String, required: true }, 
    pinCode:{ type : String, required: true },
    address:{ type : String, required: true  },
    phone:{ type : String, required: true, unique: true  },
    email:{ type : String, required: true, unique: true },
    password:{ type : String, required: true },
    salt: { type : String, required: true  },
    resetToken: { type : String, default: "" },
    resetTokenExpiration: { type : Date, default: Date.now() },
    profilePicture: { type: String, default: "" }, 
    serviceAvailable: { type : Boolean, required: true  }, 
    rating:  { type : Types.Decimal128, default: 0 },  
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isApproved: { type: Boolean, default: false }
}, {
    toJSON:{
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.resetToken;
            delete ret.resetTokenExpiration;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps : true
});
  
const Vendor = mongoose.model<IVendor>('Vendor', VendorSchema);

export { Vendor }  ;