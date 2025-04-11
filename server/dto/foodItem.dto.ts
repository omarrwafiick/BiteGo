import { Length, IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateFoodItemDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(12, 155)
    @IsNotEmpty()
    description: string;

    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: "Fast Food" | "Dessert" | "Beverage" | "Main Course";

    @IsBoolean()
    available: boolean;

    @IsNumber()
    readyTime: number;
}
