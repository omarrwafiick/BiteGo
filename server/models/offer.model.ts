import mongoose, { Schema, Document } from "mongoose";

export interface IOffer extends Document {
  code: string;
  discountPercentage: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  createdAt: Date;
}

const OfferSchema = new Schema<IOffer>({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Offer = mongoose.model<IOffer>("Offer", OfferSchema);

export { Offer };