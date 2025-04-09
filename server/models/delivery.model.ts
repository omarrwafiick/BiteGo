import mongoose, { Schema, Document } from "mongoose";

export interface IDelivery extends Document {
  driverName: string;
  phone: string;
  vehicleType: "Bike" | "Car" | "Van"; 
  status: "Pending" | "In Transit" | "Delivered";
  orderId: mongoose.Types.ObjectId;
  estimatedTime?: string; 
}

const DeliverySchema = new Schema<IDelivery>({
  driverName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  vehicleType: { type: String, enum: ["Bike", "Car", "Van"], required: true },
  status: { type: String, enum: ["Pending", "In Transit", "Delivered"], default: "Pending" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  estimatedTime: { type: String }, 
}, {
  toJSON:{
      transform(doc, ret){ 
          delete ret.createdAt;
          delete ret.updatedAt;
      }
  },
  timestamps : true
});

const Delivery = mongoose.model<IDelivery>("Delivery", DeliverySchema);
 
export { Delivery} ;
