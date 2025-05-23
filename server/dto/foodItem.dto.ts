import { Length, IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator'; 

export class FoodItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(12, 155)
    @IsNotEmpty()
    description: string;
  
    price: number;

    @IsString()
    @IsNotEmpty()
    category: "Fast Food" | "Dessert" | "Beverage" | "Main Course";

    available: boolean;
 
    readyTime: number;
}
 
