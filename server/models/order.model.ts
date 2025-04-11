import mongoose, { Schema } from "mongoose"; 

export interface IOrder extends mongoose.Document {
    userId: mongoose.Types.ObjectId; 
    vendorId: mongoose.Types.ObjectId; 
    items: {
      foodId: mongoose.Types.ObjectId;  
      quantity: number; 
      price: number;  
    }[];
    totalAmount: number;   
    remarks?: string;
    deliveryId: mongoose.Schema.Types.ObjectId; 
    readyTime: number;
    status?: "Pending" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";
}

const OrderSchema = new Schema<IOrder>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    items: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true }, 
    remarks:  { type: String },
    deliveryId:  { type: mongoose.Schema.Types.ObjectId, ref: "Delivery", required: true }, 
    readyTime:  { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"], default: "Pending" },
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
    
  
const Order = mongoose.model<IOrder>("Order", OrderSchema);
export { Order } ;