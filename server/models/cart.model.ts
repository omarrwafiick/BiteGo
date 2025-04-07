import mongoose, { Schema } from "mongoose"; 
import { CreateCartItem } from "../dto/cart.dto";

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: CreateCartItem[];
  totalAmount: number;
  createdAt?: Date;
}

const CartSchema = new Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: { type: Number, required: true },
}, { timestamps: true });
 
const Cart = mongoose.model<ICart>("Cart", CartSchema);
  
export { Cart }  ;
