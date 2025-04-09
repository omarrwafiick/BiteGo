import { IsNotEmpty } from 'class-validator'; 

export class CreateOfferDto{ 
    @IsNotEmpty()
    pinCode: string; 
    @IsNotEmpty()
    discountPercentage: number;
    @IsNotEmpty()
    validFrom: Date;
    @IsNotEmpty()
    validTo: Date;
    @IsNotEmpty()
    isActive: boolean;
}

export class UpdateOfferDto{ 
    @IsNotEmpty()
    discountPercentage: number; 
    @IsNotEmpty()
    validTo: Date;
    @IsNotEmpty()
    isActive: boolean;
}