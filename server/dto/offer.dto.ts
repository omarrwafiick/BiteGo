import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';  

export class MainEntity{  
    @IsNotEmpty() 
    discountPercentage: string; 
    @IsNotEmpty() 
    validTo: string;
    @IsNotEmpty()
    isActive: boolean;
}

export class CreateOfferDto extends MainEntity{ 

}

export class UpdateOfferDto extends MainEntity{  
}