import { IsNotEmpty, IsNumber, IsString } from 'class-validator'; 

export class CreateCartItem {
  @IsString()
  @IsNotEmpty()
  foodId: string; 
  @IsNumber()
  quantity: number; 
} 
