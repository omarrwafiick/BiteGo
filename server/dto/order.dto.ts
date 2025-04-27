import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsDecimal } from 'class-validator';  

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
    
    @IsNumber()
    readyTime: number;

   
    status: string; 
}

class Items{
    @IsString() 
    @IsNotEmpty()
    foodId: string;  

    @IsNumber()
    quantity: number;  
}