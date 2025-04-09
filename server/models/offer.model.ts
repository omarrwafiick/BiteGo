import mongoose, { Schema, Document, Types } from "mongoose";

export interface IOffer extends Document {
  code: string;
  discountPercentage: number;
  pinCode: string;
  validFrom: Date;
  validTo: Date;
  isActive: boolean; 
  vendors: Types.ObjectId[];
}

const OfferSchema = new Schema<IOffer>({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  pinCode:{ type : String, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }],
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