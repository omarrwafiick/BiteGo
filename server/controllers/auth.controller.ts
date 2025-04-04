import { Request, Response, NextFunction } from "express";
import { LoginVendorDto } from "../dto/vendor.dto";
import { findVendor } from "./vendors.controller";
import { GenerateSignature, validatePassword } from "../utilities/security";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { email, password } = <LoginVendorDto>req.body;

        const exists = await findVendor('', email);

        if(!exists) {
            res.status(400).json({success:false, message: `Vendor was not found with email: ${email}`});
            return;
        }

        const passwordValidation = await validatePassword(password, exists.password, exists.salt);

        if(!passwordValidation){
            res.status(400).json({success:false, message: "Incorrect password"});
            return;
        }   

        const jwt = GenerateSignature({id: exists.id, name: exists.name, email: email});
           
        res.status(200).json({success:true, vendor: exists, token: jwt});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};