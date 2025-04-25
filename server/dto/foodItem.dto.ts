import { Length, IsString, IsNotEmpty, IsBoolean, IsDecimal } from 'class-validator';
import { Decimal128 } from 'mongoose';

export class CreateFoodItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(12, 155)
    @IsNotEmpty()
    description: string;

    @IsDecimal()
    price: Decimal128;

    @IsString()
    @IsNotEmpty()
    category: "Fast Food" | "Dessert" | "Beverage" | "Main Course";

    @IsBoolean()
    available: boolean;

    @IsDecimal()
    readyTime: Decimal128;
}
