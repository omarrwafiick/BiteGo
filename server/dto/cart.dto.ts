import { IsNotEmpty, IsNumber, IsString } from 'class-validator'; 

export class CreateCartItem {
  @IsString()
  @IsNotEmpty()
  foodId: string;  
  @IsNumber()
  quantity: number; 
} 

export class CartItemData extends CreateCartItem {
  @IsNumber()
  price: number; 
} 


export class UpdateCartItems {
  cartItems: [CartItemData] 
} 