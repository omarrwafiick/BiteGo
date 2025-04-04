import mongoose, { Schema, Document } from "mongoose";
import { CreateVendorDto } from "../dto/vendor.dto";

interface VendorDoc extends Document, CreateVendorDto{
    salt: string;  
    profilePicture?: string;  
    serviceAvailable: boolean;   
    rating?: number; createdAt: Date;
    updatedAt: Date;  
};

const VendorSchema = new Schema({ 
    name:{ type : String, required: true },
    ownerName:{ type : String, required: true }, 
    pinCode:{ type : String, required: true },
    address:{ type : String, required: true  },
    phone:{ type : String, required: true, unique: true  },
    email:{ type : String, required: true, unique: true },
    password:{ type : String, required: true },
    salt: { type : String, required: true  },
    profilePicture: { type: String, default: "" }, 
    serviceAvailable: { type : Boolean, required: true  }, 
    rating:  { type : Number },  
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    isApproved: { type: Boolean, default: false }
}, {
    toJSON:{
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps : true
});
  
const Vendor = mongoose.model<VendorDoc>('Vendor', VendorSchema);

export default Vendor ;