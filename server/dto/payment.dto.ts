import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto { 
    @IsNotEmpty()
    @IsString()
    amount: string; 

    @IsNotEmpty()
    @IsString()
    paymentMode: string; 

    @IsNotEmpty()
    @IsString()
    offerId: string; 

    @IsNotEmpty()
    @IsString()
    vendorId: string; 

    @IsNotEmpty()
    @IsString()
    orderId: string;   
}