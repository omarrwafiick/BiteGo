import { IsEmail, Length, IsString, IsNotEmpty } from 'class-validator';

class MainEntity{ 
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @IsString()
  @Length(11, 11)
  @IsNotEmpty()
  phone: string;  

  @IsString()
  @IsNotEmpty()
  address: string; 
}

export class CreateUserDto extends MainEntity { 
  @IsString()
  @IsEmail()
  email: string; 

  @Length(6, 12)
  password: string;   
  
};

export class UpdateUserDto extends MainEntity {
}; 
 
