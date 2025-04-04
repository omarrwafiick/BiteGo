import mongoose from "mongoose"; 

export interface IAdmin extends mongoose.Document {
  name: string;
  email: string;  
  password: string;  
  role: "SuperAdmin" | "Moderator";  
  createdAt: Date;  
}

const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["SuperAdmin", "Moderator"], default: "Moderator" },
    createdAt: { type: Date, default: Date.now },
  });
   
const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;