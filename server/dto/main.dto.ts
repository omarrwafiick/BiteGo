import { IsDecimal, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Decimal128 } from "mongoose";

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
    @IsDecimal()
    latitude?:Decimal128;
     
    @IsDecimal()
    longtude?:Decimal128;
}