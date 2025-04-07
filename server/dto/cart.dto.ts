import mongoose from "mongoose";
import { IsEmpty } from 'class-validator';

export class CreateCartItem {
  @IsEmpty()
  foodId: mongoose.Types.ObjectId;
  @IsEmpty()
  quantity: number;
  @IsEmpty()
  price: number;
} 
