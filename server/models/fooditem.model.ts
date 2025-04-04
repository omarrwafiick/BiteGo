import mongoose, { Schema, Document } from "mongoose";

export interface IFoodItem extends Document {
  vendorId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: "Fast Food" | "Dessert" | "Beverage" | "Main Course";
  imageUrl?: string;
  available?: boolean;
  createdAt: Date;
}

const FoodItemSchema = new Schema<IFoodItem>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ["Fast Food", "Dessert", "Beverage", "Main Course"] },
  imageUrl: { type: String },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const FoodItem = mongoose.model<IFoodItem>("FoodItem", FoodItemSchema);
export default FoodItem;
