import mongoose, { Schema, Types } from "mongoose";  

export interface IContact extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  subject: string;  
  message: string;  
}

const ContactSchema = new Schema<IContact>({  
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    subject: { type: String, required: true },
    message: { type: String, required: true },
  }, {
    toJSON:{
        transform(doc, ret){ 
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps : true
  });
   
const Contact = mongoose.model<IContact>("Contact", ContactSchema);
export  { Contact };