import mongoose, { Schema, Document, Types } from "mongoose"; 

export interface IFoodItem extends Document { 
  _id: Types.ObjectId;
  name: string; 
  description: string;
  price: Types.Decimal128;
  category: "Fast Food" | "Dessert" | "Beverage" | "Main Course" | "UnKnown";
  available: boolean;
  readyTime: Types.Decimal128;
  vendorId: mongoose.Types.ObjectId;
  images: string[] | any; 
  rating?: Types.Decimal128;
}; 

const FoodItemSchema = new Schema<IFoodItem>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true  },
  price: { type: Types.Decimal128, required: true },
  category: { type: String, enum: ["Fast Food", "Dessert", "Beverage", "Main Course", "UnKnown"], default: "UnKnown" },
  images: { type: [String], required: true  },
  available: { type: Boolean, default: true }, 
  rating: { type: Types.Decimal128, default: 0 },
  readyTime: { type: Types.Decimal128 } 
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
