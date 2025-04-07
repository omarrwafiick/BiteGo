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

    totalAmount: number;

    @IsString()
    @IsNotEmpty()
    status: "Pending" | "Preparing" | "Out for Delivery" | "Delivered";

    @IsString()
    @IsNotEmpty()
    paymentMethod: "Card" | "Strip" | "Cash"; 

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
    offerId: string;
    
    @IsNotEmpty()
    readyTime: number;
}

class Items{
    @IsString() 
    @IsNotEmpty()
    foodId: string;  
    quantity: number; 
    price: number;  
}