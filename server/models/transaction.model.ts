import mongoose, { Schema, Types } from "mongoose";  

export interface ITransaction extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  vendorId: mongoose.Schema.Types.ObjectId;  
  orderId: mongoose.Schema.Types.ObjectId;  
  offerId?: mongoose.Schema.Types.ObjectId;
  orderTotalValue:Types.Decimal128;
  orderNetValue:Types.Decimal128;
  status?: boolean; 
  paymentMethod: "Card" | "Strip" | "Cash"; 
}

const TransactionSchema = new Schema<ITransaction>({  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, 
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: "Offer" },
    orderTotalValue: { type: Types.Decimal128, required: true  },  
    orderNetValue: { type: Types.Decimal128, required: true  },  
    status: { type: Boolean, default: false },
    paymentMethod: { type: String, enum: ["Card", "Strip", "Cash"], required: true },
  }, {
    toJSON:{
        transform(doc, ret){ 
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps : true
  });
   
const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);
export  { Transaction };