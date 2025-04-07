import mongoose from "mongoose"; 

export interface IOrder extends mongoose.Document {
    userId: mongoose.Types.ObjectId; 
    vendorId: mongoose.Types.ObjectId; 
    items: {
      foodId: mongoose.Types.ObjectId;  
      quantity: number; 
      price: number;  
    }[];
    totalAmount: number; 
    status: "Pending" | "Preparing" | "Out for Delivery" | "Delivered";
    paymentMethod: "Card" | "Strip" | "Cash"; 
    remarks: string;
    deliveryId: string;
    appliedOffers: boolean;
    offerId: string;
    readyTime: number;
}

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    items: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Preparing", "Out for Delivery", "Delivered"], default: "Pending" },
    paymentMethod: { type: String, enum: ["Card", "Strip", "Cash"], required: true },
    remarks:  { type: String },
    deliveryId:  { type: mongoose.Schema.Types.ObjectId, ref: "Delivery" },
    appliedOffers:  { type: Boolean , default: false},
    offerId:  { type: mongoose.Schema.Types.ObjectId, ref: "Offer"  },
    readyTime:  { type: Number }
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