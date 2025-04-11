import mongoose, { Schema, Document } from "mongoose"; 

export interface IFoodItem extends Document { 
  name: string;
  description: string;
  price: number;
  category: "Fast Food" | "Dessert" | "Beverage" | "Main Course" | "UnKnown";
  available: boolean;
  readyTime: number;
  vendorId: mongoose.Types.ObjectId;
  images: string[]; 
  rating?: number;
};

const FoodItemSchema = new Schema<IFoodItem>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true }, 
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ["Fast Food", "Dessert", "Beverage", "Main Course", "UnKnown"], default: "UnKnown" },
  images: { type: [String], required: true  },
  available: { type: Boolean, default: true }, 
  rating: { type: Number, default: 0 },
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
export { FoodItem };
