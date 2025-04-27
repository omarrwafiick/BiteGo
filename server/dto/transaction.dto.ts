import { IsNotEmpty, IsString } from 'class-validator';
 
export class CreateTransactionDto {  
    @IsNotEmpty()
    @IsString()
    paymentMode: string; 

    @IsNotEmpty()
    @IsString()
    offerId: string; 

    @IsNotEmpty()
    @IsString()
    vendorId: string; 
 
    orderId: string;   

    @IsNotEmpty()
    totalAmount: number;
}