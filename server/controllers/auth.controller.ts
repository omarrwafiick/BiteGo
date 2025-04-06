import { Request, Response } from "express";
import { LoginDto } from "../dto/main.dto"; 
import { GenerateSignature, validatePassword } from "../utilities/security";
import { findAdmin, findUser, findVendor } from "../utilities/helper.methods";
import { User } from "../models/user.model";
import { Admin } from "../models/admin.model";
import { Vendor } from "../models/vendor.model";

export const Login = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { email, password, type} = req.body as LoginDto;

        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required.' });
            return;
        }

        const exists = type === process.env.USER ? await findUser(email) : type === process.env.ADMIN ?  await findAdmin(email) : await findVendor(email);

        if (!exists) {
            res.status(404).json({ success: false, message: `${type} not found with email: ${email}` });
            return;
        }

        const passwordValidation = await validatePassword(password, exists.password, exists.salt);

        if (!passwordValidation) {
            res.status(400).json({ success: false, message: 'Incorrect password' });
            return;
        }   

        const token = GenerateSignature({ 
            id: exists.id, 
            name: type === process.env.USER 
                ? (exists as InstanceType<typeof User>).firstName 
                : type === process.env.ADMIN 
                    ? (await findAdmin(email) as InstanceType<typeof Admin>).name 
                    : (await findVendor(email) as InstanceType<typeof Vendor>).name, 
            verified: type === process.env.USER ?(exists as InstanceType<typeof User>).isVerified : false, 
            email :email
        });  
        
        res.status(200).json({ success: true, vendor: exists, token });

    } catch (error) {
        console.error(error); 
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
