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

        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required.' });
            return;
        }

        const exists = 
            type === process.env.USER 
            ? await findUser(email) 
            : type === process.env.ADMIN 
            ? await findAdmin(email) 
            : type === process.env.DELIVERY 
            ? await findDelivery(email)
            : await findVendor(email) ;

        if (!exists) {
            res.status(404).json({ success: false, message: `${type} not found with email: ${email}` });
            return;
        }

        const passwordValidation = await validatePassword(password, exists.password, String(exists.salt));

        if (!passwordValidation) {
            res.status(400).json({ success: false, message: 'Incorrect password' });
            return;
        }   

        if (!( ('isApproved' in exists && exists.isApproved) || ('isVerified' in exists && exists.isVerified))){
            res.status(400).json({ success: false, message: "You can't login until admin approves your request or verifies your account" });
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
        
        res.status(200).json({ success: true, vendor: exists });

    } catch (error) { 
        res.status(500).json({ success: false, message: 'Internal server error' });
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
        const result = await profile.save();   

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        res.status(300).json({success: true, redirectTo: `${process.env.CLIENT_ADDRESS}/reset-password/${resetToken}`});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

    return;
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => { 
    try {   
        const type = req.params.type;

        const profile= await checkUser(req, res, type);   
        
        if(!profile){
            res.status(404).json({ success: false, message: `${type} was not found`});
            return;
        };
        
        const today = new Date(Date.now())
        const password  = req.body.password;  
        const resetToken  = req.params.token; 
        if( profile.resetTokenExpiration && (today > profile.resetTokenExpiration || resetToken !== profile.resetToken) ){
            res.status(400).json({ success: false, message: 'Reset token is expired or incorrect'});
            return;
        }

        const hashedPassword = await hashingPassword(password, String(profile.salt));

        profile.password = hashedPassword;
        profile.resetToken = "";
        profile.resetTokenExpiration = today;
        const result = await profile.save();  

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

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
        
        if(!profile){
            res.status(404).json({ success: false, message: `${type} was not found`});
            return;
        };

        if (!( ('isApproved' in profile && profile.isApproved) || ('isVerified' in profile && profile.isVerified))){
            res.status(401).json({ success: false, message: "You can't login until admin approves your request or verifies your account" });
            return;
        }

        res.status(200).json({ success: true, authenticated: true});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

    return;
};