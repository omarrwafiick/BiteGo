import { IsNotEmpty } from 'class-validator';

export class CreatePaymentDto { 
    @IsNotEmpty()
    amount: string; 
    @IsNotEmpty()
    paymentMode: string; 
    @IsNotEmpty()
    offerId: string; 
    @IsNotEmpty()
    vendorId: string; 
    @IsNotEmpty()
    orderId: string;   
}