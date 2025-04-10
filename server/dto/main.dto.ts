import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    type: string;
}


export class UpdateLocationDto{ 
    @IsNotEmpty()
    @IsNumber()
    latitude?:number;
    
    @IsNotEmpty()
    @IsNumber()
    longtude?:number;
}