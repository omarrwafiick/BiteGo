import { IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator'; 

export class CreateCartItem {
  @IsString()
  @IsNotEmpty()
  foodId: string; 
  @IsNumber()
  quantity: number;
  @IsDecimal() 
  price: number;
} 
