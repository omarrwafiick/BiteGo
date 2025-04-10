import { IsEmail, Length, IsString } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  @IsEmail()
  email: string; 

  @Length(6, 12)
  password: string; 
  
  @IsString()
  @Length(3, 50)
  firstName: string;
  
  @IsString()
  @Length(3, 50)
  lastName: string;

  @Length(12, 12)
  phone: string;  

  @IsString()
  address: string; 
};

export class UpdateUserDto {
  @IsString()
  @Length(3, 50)
  firstName: string;
  
  @IsString()
  @Length(3, 50)
  lastName: string;

  @Length(12, 12)
  phone: string;  

  @IsString()
  address: string; 
}; 
 
