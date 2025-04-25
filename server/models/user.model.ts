import mongoose, { Schema, Types } from "mongoose";  

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;  
  address: string; 
  profilePicture?: string; 
  salt:string; 
  resetToken?: string;
  resetTokenExpiration?: Date;
  otp?:number;
  otpExp?:Date;
  latitude?:Types.Decimal128;
  longitude?:Types.Decimal128;
  isVerified:boolean;
  orderHistory?: mongoose.Types.ObjectId[];  
  cart?: mongoose.Types.ObjectId;  
};

const UserSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    salt: { type : String, required: true  },
    resetToken: { type : String, default: "" },
    resetTokenExpiration: { type : Date, default: Date.now() },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String, default: "" }, 
    otp: { type: Number, default: 0 }, 
    otpExp: { type: Date, default: Date.now()  }, 
    latitude: { type: Types.Decimal128, default: 0 }, 
    longitude: { type: Types.Decimal128, default: 0 }, 
    isVerified: { type: Boolean, default: false }, 
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null }], 
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" , default: null}, 
}, {
  toJSON:{
      transform(doc, ret){
          delete ret.password;
          delete ret.salt;
          delete ret.__v;
          delete ret.otp;
          delete ret.otpExp;
          delete ret.resetToken;
          delete ret.resetTokenExpiration;
          delete ret.createdAt;
          delete ret.updatedAt;
      }
  },
  timestamps : true
});
   
const User = mongoose.model<IUser>("User", UserSchema);
export { User } ;