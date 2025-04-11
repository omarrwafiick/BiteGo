import { IsEmail, Length, IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';

class MainEntity{
  
  @IsString()
  @IsNotEmpty()
  @Length(12, 70) 
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

  @IsBoolean()
  isApproved: boolean;

  @IsNumber() 
  latitude: number;

  @IsNumber() 
  longtude: number;
};