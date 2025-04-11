import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    type: string;
}


export class UpdateLocationDto{  
    @IsNumber()
    latitude?:number;
     
    @IsNumber()
    longtude?:number;
}