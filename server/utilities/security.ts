import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import { Request, Response } from "express";
import { AuthPayload } from '../dto/auth.dto';
import { randomBytes } from 'crypto';

export const GenerateSalt = async () => await bcryptjs.genSalt();

export const hashingPassword = async (password:string, salt: string) => await bcryptjs.hash(password, salt);

export const validatePassword = async (password:string, dbPassword:string, salt: string) => await hashingPassword(password, salt) === dbPassword;
 
export const GenerateSignature = (payload: AuthPayload) => jwt.sign(payload, String(process.env.JWT_SECRET), {expiresIn: '1d'});

export const ValidateSignature = (req: Request) => {
    const token = req.cookies['token']; 
    if (token) {
        try {
            const payload = jwt.verify(token, String(process.env.JWT_SECRET)) as AuthPayload;
            req.user = payload; 
            return true;
        } catch (err) {
            console.error("Token verification failed:", err);
            return false; 
        }
    }
    return false;   
};


export const generateOTP = (): number => Math.floor(100000 + Math.random() * 900000);

export const generateOrderID = (): string =>  generateOTP().toString();

export const setCookie = (res: Response, token: string) : void => { 
    res.cookie("token", token, {
        httpOnly: false,        
        secure: process.env.NODE_ENV === 'production',
        sameSite: "strict",     
        maxAge: 3 * 24 * 60 * 60 * 1000 
    }); 
};

export const clearCookie = (res: Response): void =>{
    res.clearCookie('token');
}; 

 
  