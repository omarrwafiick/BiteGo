import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';
 
export class CreatePaymentDto { 
    @IsNotEmpty()
    @IsDecimal()
    amount: number; 

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