import mongoose, { Schema, Document } from "mongoose";

export interface IDelivery extends Document {
  email: string;  
  password: string;  
  salt: string;  
  resetToken?: string;
  resetTokenExpiration?: Date;
  profilePicture?: string;  
  address: string;  
  driverName: string;
  phone: string;
  pincode: string;
  vehicleType: "Bike" | "Car" | "Van"; 
  status?: boolean; 
  estimatedTime?: Number; 
  isApproved: boolean;
  latitude?:number;
  longtude?:number;
}

const DeliverySchema = new Schema<IDelivery>({
  driverName: { type: String, required: true },
  email:{ type : String, required: true, unique: true },
  password:{ type : String, required: true },
  salt: { type : String, required: true  },
  resetToken: { type : String, default: "" },
  resetTokenExpiration: { type : Date, default: Date.now() },
  profilePicture: { type: String, default: "" }, 
  phone: { type: String, required: true, unique: true },
  pincode:{ type : String, required: true },
  vehicleType: { type: String, enum: ["Bike", "Car", "Van"], required: true },
  status: { type: Boolean, default: false }, 
  estimatedTime: { type: Number, default: 0  }, 
  isApproved: { type: Boolean, default: false },
  latitude: { type: Number, default: 0 }, 
  longtude: { type: Number, default: 0 }
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

const Delivery = mongoose.model<IDelivery>("Delivery", DeliverySchema);
 
export { Delivery} ;
