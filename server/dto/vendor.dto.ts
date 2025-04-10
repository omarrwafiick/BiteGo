import { IFoodItem } from "../models/fooditem.model";
import { Length, IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateVendorDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    ownerName:string; 

    @IsString()
    @IsNotEmpty()
    pinCode:string;

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @Length(6,12)
    password:string;
    
    menu: IFoodItem[];

    orders: [];

    isApproved: boolean;
}


export class UpdateVendorDto{
    @IsString()
    @IsNotEmpty()
    phone:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    name:string;

    menu: [];
}

