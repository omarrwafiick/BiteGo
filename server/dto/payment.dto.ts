import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';
import { Decimal128 } from 'mongoose';

export class CreatePaymentDto { 
    @IsNotEmpty()
    @IsDecimal()
    amount: Decimal128; 

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