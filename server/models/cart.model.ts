import mongoose, { Schema, Types } from "mongoose";  

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items?: {
    foodId: Types.ObjectId,
    quantity: number,
    price: Types.Decimal128,
  }[]; 
  totalAmount: Types.Decimal128; 
}

const CartSchema = new Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      foodId: { type: Types.ObjectId, ref: "FoodItem" },
      quantity: { type: Number, min: 1 },
      price: { type: Types.Decimal128 },
    }
  ],
  totalAmount: { type: Types.Decimal128, default: 0 },
}, { timestamps: true });
 
const Cart = mongoose.model<ICart>("Cart", CartSchema);
  
export { Cart } ;
