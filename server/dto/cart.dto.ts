import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Decimal128 } from 'mongoose';

export class CreateCartItem {
  @IsString()
  @IsNotEmpty()
  foodId: string; 
  @IsNumber()
  quantity: number;
  @IsDecimal() 
  price: Decimal128;
} 
