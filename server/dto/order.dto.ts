import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsDecimal } from 'class-validator';
import { Decimal128 } from 'mongoose';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    vendorId: string;
 
    @IsNotEmpty()
    items: Items; 

    @IsString()
    @IsNotEmpty()
    remarks: string;

    @IsString()
    @IsNotEmpty()
    deliveryId: string; 

    @IsBoolean()
    appliedOffers: boolean; 

    @IsString()
    @IsNotEmpty()
    transactionId: string;
    
    @IsDecimal()
    readyTime: Decimal128;

    @IsString()
    @IsNotEmpty()
    status: string;
    
}

class Items{
    @IsString() 
    @IsNotEmpty()
    foodId: string;  

    @IsNumber()
    quantity: number; 

    @IsNumber()
    price: number;  
}