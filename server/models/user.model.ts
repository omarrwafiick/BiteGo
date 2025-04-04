import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string; 
  email: string;
  password: string;
  phone: string;  
  address: string; 
  profilePicture?: string; 
  orderHistory?: mongoose.Types.ObjectId[]; 
  createdAt: Date;  
};

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String, default: "" }, 
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    createdAt: { type: Date, default: Date.now },
});
   
const User = mongoose.model<IUser>("User", UserSchema);
export default User;