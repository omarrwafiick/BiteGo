import { IsEmail, Length, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateDeliveryDto {
  
  @IsString()
  @IsEmail()
  email: string; 

  @Length(6, 12)
  password: string;  
  
  @IsString()
  @Length(12, 70) 
  driverName: string; 

  @Length(12, 12)
  phone: string;  

  @IsString()
  address: string; 

  @IsString()
  pincode: string; 

  @IsString() 
  vehicleType: string; 
};

export class UpdateDeliveryDto {
  @IsString()
  @Length(12, 70) 
  driverName: string; 

  @Length(12, 12)
  phone: string;  

  @IsString()
  address: string; 

  @IsString()
  pincode: string; 

  @IsString() 
  vehicleType: string; 

  @IsNumber() 
  estimatedTime: number;

  @IsBoolean()
  isApproved: boolean;

  @IsNumber() 
  latitude: number;

  @IsNumber() 
  longtude: number;
};