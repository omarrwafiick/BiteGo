import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    vendorId: string;

    @IsString() 
    @IsNotEmpty()
    items: Items; 

    @IsString()
    @IsNotEmpty()
    remarks: string;

    @IsString()
    @IsNotEmpty()
    deliveryId: string; 

    @IsNotEmpty()
    appliedOffers: boolean; 

    @IsString()
    @IsNotEmpty()
    transactionId: string;
    
    @IsNotEmpty()
    readyTime: number;

    @IsNotEmpty()
    status: string;
    
}

class Items{
    @IsString() 
    @IsNotEmpty()
    foodId: string;  
    quantity: number; 
    price: number;  
}