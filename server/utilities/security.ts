import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { VendorPayloadDto } from '../dto/vendor.dto';
import { Request } from "express";
import { AuthPayload } from '../dto/auth.dto';

export const GenerateSalt = async () => await bcryptjs.genSalt()

export const hashingPassword = async (password:string, salt: string) => await bcryptjs.hash(password, salt);

export const validatePassword = async (password:string, dbPassword:string, salt: string) => await hashingPassword(password, salt) === dbPassword;
 
export const GenerateSignature = (payload: AuthPayload) => jwt.sign(payload, String(process.env.JWT_SECRET), {expiresIn: '1d'});

export const ValidateSignature = (req: Request) => {
    const token = req.get("Authorization"); 
    if(token){ 
        const payload = jwt.verify(token.split(" ")[1], String(process.env.JWT_SECRET)) as AuthPayload;
        req.user = payload;
        return true;
    }
    return false;
};

export const generateOTP = (): number => Math.floor(100000 + Math.random() * 900000);

