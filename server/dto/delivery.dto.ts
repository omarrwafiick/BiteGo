import { IsEmail, Length, IsString, IsNumber, IsNotEmpty, IsDecimal } from 'class-validator';
import { Decimal128 } from 'mongoose';

class MainEntity{ 
  @IsString()
  @IsNotEmpty()
  @Length(8, 70) 
  driverName: string; 

  @IsNotEmpty()
  @Length(12, 12)
  phone: string;  

  @IsNotEmpty()
  @IsString()
  address: string; 

  @IsNotEmpty()
  @IsString()
  pincode: string; 

  @IsNotEmpty()
  @IsString() 
  vehicleType: string; 
}

export class CreateDeliveryDto extends MainEntity { 
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;   
  
  @IsString() 
  @IsNotEmpty()
  @Length(6, 12)
  password: string;  
};

export class UpdateDeliveryDto  extends MainEntity{ 
    
  @IsNumber() 
  estimatedTime: number; 
 
};