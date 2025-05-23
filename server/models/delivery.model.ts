import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDelivery extends Document {
  _id: Types.ObjectId;
  driverName: string;
  email: string;  
  password: string;  
  salt: string;  
  resetToken?: string;
  resetTokenExpiration?: Date;
  profilePicture?: string;  
  address: string;  
  phone: string;
  pincode: string;
  vehicleType: "Bike" | "Car" | "Van"; 
  status?: boolean; 
  estimatedTime?: Types.Decimal128; 
  isApproved: boolean; 
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
  status: { type: Boolean, default: true }, 
  estimatedTime: { type: Types.Decimal128, default: 0  }, 
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

const Delivery = mongoose.model<IDelivery>("Delivery", DeliverySchema);
 
export { Delivery} ;
