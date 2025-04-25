import { IsDate, IsDecimal, IsNotEmpty } from 'class-validator'; 
import { Decimal128 } from 'mongoose';

export class MainEntity{  
    @IsNotEmpty()
    @IsDecimal()
    discountPercentage: Decimal128; 
    @IsDate()
    validTo: Date;
    @IsNotEmpty()
    isActive: boolean;
}

export class CreateOfferDto extends MainEntity{ 
    @IsNotEmpty()
    pinCode: string;  
    @IsDate()
    validFrom: Date;  
}

export class UpdateOfferDto extends MainEntity{  
}