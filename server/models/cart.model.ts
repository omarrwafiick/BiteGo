import mongoose, { Schema } from "mongoose";  

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items?: {
    foodId: mongoose.Schema.Types.ObjectId,
    quantity: number,
    price: number,
  }[]; 
  totalAmount: number; 
}

const CartSchema = new Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: { type: Number, min: 1 },
      price: { type: Number },
    }
  ],
  totalAmount: { type: Number, default: 0 },
}, { timestamps: true });
 
const Cart = mongoose.model<ICart>("Cart", CartSchema);
  
export { Cart } ;
