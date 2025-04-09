import mongoose, { Schema, Document } from "mongoose";
import { CreateFoodItemDto } from "../dto/foodItem.dto";

export interface IFoodItem extends Document, CreateFoodItemDto {
  vendorId: mongoose.Types.ObjectId;
  images: string[]; 
  rating: number;
};

const FoodItemSchema = new Schema<IFoodItem>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ["Fast Food", "Dessert", "Beverage", "Main Course"] },
  images: { type: [String] },
  available: { type: Boolean, default: true }, 
  rating: { type: Number },
  readyTime: { type: Number }
},{
  toJSON:{
      transform(doc, ret){ 
          delete ret.__v;
          delete ret.createdAt;
          delete ret.updatedAt;
      }
  },
  timestamps : true
});

const FoodItem = mongoose.model<IFoodItem>("FoodItem", FoodItemSchema);
export { FoodItem } ;
