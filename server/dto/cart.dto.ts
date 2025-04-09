import mongoose from "mongoose";
import { IsNotEmpty } from 'class-validator';

export class CreateCartItem {
  @IsNotEmpty()
  foodId: mongoose.Types.ObjectId;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  price: number;
} 
