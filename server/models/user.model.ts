import mongoose from "mongoose"; 

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;  
  address: string; 
  profilePicture?: string; 
  salt:string;
  otp:number;
  otpExp:Date;
  latitude?:number;
  longtude?:number;
  isVerified:boolean;
  orderHistory?: mongoose.Types.ObjectId[];  
  cart?: mongoose.Types.ObjectId;  
};

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    salt: { type : String, required: true  },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String, default: "" }, 
    otp: { type: Number }, 
    otpExp: { type: Date }, 
    latitude: { type: Number, default: 0 }, 
    longtude: { type: Number, default: 0 }, 
    isVerified: { type: Boolean, default: false }, 
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null }], 
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" , default: null}, 
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
   
const User = mongoose.model<IUser>("User", UserSchema);
export { User } ;