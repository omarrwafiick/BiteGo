import mongoose, { Schema } from "mongoose"; 

export interface IAdmin extends mongoose.Document {
  name: string; 
  email: string;  
  password: string;  
  salt:string;
  resetToken?: string;
  resetTokenExpiration?: Date;
}
 
const AdminSchema = new Schema<IAdmin>({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    salt: { type : String, required: true  },
    resetToken: { type : String, default: "" },
    resetTokenExpiration: { type : Date, default: Date.now() },
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
   
const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export  { Admin };