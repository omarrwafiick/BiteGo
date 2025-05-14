import { IsEmail, Length, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsEmail()
  email: string;  

  @IsString()
  @Length(6, 12)
  password: string; 
  
  @IsString()
  @Length(3, 50)
  name: string; 
};

 