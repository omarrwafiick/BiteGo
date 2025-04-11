import { IsDate, IsNotEmpty, IsNumber } from 'class-validator'; 

export class MainEntity{  
    @IsNotEmpty()
    @IsNumber()
    discountPercentage: number; 
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