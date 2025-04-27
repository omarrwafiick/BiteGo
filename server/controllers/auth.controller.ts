import { Request, Response } from "express";
import { LoginDto } from "../dto/main.dto"; 
import { clearCookie, GenerateSignature, hashingPassword, setCookie, validatePassword } from "../utilities/security";
import { findAdmin, findDelivery, findUser, findVendor } from "../utilities/helper.methods";
import { User } from "../models/user.model";
import { Admin } from "../models/admin.model";
import Crypto from "crypto"; 
import { Vendor } from "../models/vendor.model";  
import { Delivery } from "../models/delivery.model";  
import { checkUser } from "../utilities/getUser";
  
export const login = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { email, password, type} = req.body as LoginDto;

        if (!email || !password || !type) {
            res.status(400).json({ success: false, message: 'All fields are required.' });
            return;
        }
 
        const exists = 
            type === process.env.USER 
            ? await findUser(undefined, email) 
            : type === process.env.ADMIN 
            ? await findAdmin(undefined,email) 
            : type === process.env.DELIVERY 
            ? await findDelivery(undefined, email)
            : await findVendor(undefined, email) ;

        if (!exists) {
            res.status(404).json({ success: false, message: `${type} not found with email: ${email}` });
            return;
        }

        const passwordValidation = await validatePassword(password, exists.password, String(exists.salt));

        if (!passwordValidation) {
            res.status(400).json({ success: false, message: 'Incorrect password' });
            return;
        }   

        if (
            ('isApproved' in exists && !exists.isApproved) ||
            ('isVerified' in exists && !exists.isVerified)
          ) {
            res.status(400).json({
              success: false,
              message: "You can't login until admin approves your request or verifies your account"
            });
            return;
          }
        const entity = type === process.env.USER 
            ? (exists as InstanceType<typeof User>) 
            : type === process.env.ADMIN 
            ? (exists as InstanceType<typeof Admin>)
            : type === process.env.DELIVERY 
            ? (exists as InstanceType<typeof Delivery>)
            : (exists as InstanceType<typeof Vendor>);

        const token = GenerateSignature({ 
            id: exists.id, 
            name: type === process.env.USER 
                ? (entity as InstanceType<typeof User>).firstName 
                : type === process.env.ADMIN 
                ? (entity as InstanceType<typeof Admin>).name
                : type === process.env.DELIVERY 
                ? (exists as InstanceType<typeof Delivery>).driverName
                : (exists as InstanceType<typeof Vendor>).ownerName,
            verified: type === process.env.USER ? (exists as InstanceType<typeof User>).isVerified 
                    : type === process.env.DELIVERY ? (exists as InstanceType<typeof Delivery>).isApproved
                    : type === process.env.VENDOR ? (exists as InstanceType<typeof Vendor>).isApproved
                    : true,
            email :email, 
            role: type
        });  
 
        setCookie(res, token);
        
        res.status(200).json({ success: true, account: exists });

    } catch (error) {  

        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
};
 
export const logOut = async (req: Request, res: Response): Promise<void> => { 
    clearCookie(res);
    res.status(200).json({success: true, message: "Logged out successfully"});
    return;
}; 

export const forgetPassword = async (req: Request, res: Response): Promise<void> => { 
    try {   
        const type = req.params.type;

        const profile= await checkUser(req, res, type);   
         
        if(!profile){
            res.status(404).json({ success: false, message: `${type} was not found`});
            return;
        }; 

        const resetToken = Crypto.randomBytes(20).toString("hex");
        const resetTokenExpiration = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

        profile.resetToken = resetToken;
        profile.resetTokenExpiration = resetTokenExpiration; 
        if (!profile.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        await profile.save();   

        res.status(200).json({success: true, resetToken});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } 
    return;
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => { 
    try {   
        const type = req.params.type;

        const profile= await checkUser(req, res, type);    
        
        const resetToken  = req.params.token; 
        const today = new Date(Date.now())
        const password  = req.body.password;  
        if( profile.resetTokenExpiration && (today > profile.resetTokenExpiration || resetToken !== profile.resetToken) ){
            res.status(400).json({ success: false, message: 'Reset token is expired or incorrect'});
            return;
        }

        const hashedPassword = await hashingPassword(password, String(profile.salt));

        profile.password = hashedPassword;
        profile.resetToken = "";
        profile.resetTokenExpiration = today;

        if (!profile.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        await profile.save();  

        res.status(200).json({success: true, message: "Password was reset successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => { 
    try { 
        const type = req.params.type;

        const profile= await checkUser(req, res, type);   

        if (!(('isApproved' in profile && profile.isApproved) || ('isVerified' in profile && profile.isVerified))){
            res.status(401).json({ success: false, message: "You can't login until admin approves your request or verifies your account" });
            return;
        }

        res.status(200).json({ success: true, authenticated: true});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

    return;
};