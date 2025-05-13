import { IsString, IsNotEmpty } from 'class-validator';

export class ContactDto{ 
  @IsString() 
  @IsNotEmpty()
  subject: string;  

  @IsString()
  @IsNotEmpty()
  message: string; 
}
 
