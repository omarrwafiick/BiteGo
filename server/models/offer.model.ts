import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOffer extends Document { 
  discountPercentage: Types.Decimal128;
  pinCode: string;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;  
  vendorId?: Types.ObjectId;
  foodItems?: Types.ObjectId[];
}
 
const OfferSchema = new Schema<IOffer>({  
  discountPercentage: { type: Types.Decimal128, required: true },
  pinCode:{ type : String, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  foodItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" }],
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
}, {
  toJSON:{ 
      transform(doc, ret){ 
          delete ret.createdAt;
          delete ret.updatedAt;
      }
  },
  timestamps : true
});

const Offer = mongoose.model<IOffer>("Offer", OfferSchema);

export { Offer };