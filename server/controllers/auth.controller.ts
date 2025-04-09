import { Request, Response } from "express";
import { LoginDto } from "../dto/main.dto"; 
import { clearCookie, GenerateSignature, hashingPassword, setCookie, validatePassword } from "../utilities/security";
import { findAdmin, findUser, findVendor } from "../utilities/helper.methods";
import { User } from "../models/user.model";
import { Admin } from "../models/admin.model";
import Crypto from "crypto"; 
import { Vendor } from "../models/vendor.model"; 

export const login = async (req: Request, res: Response): Promise<void> => { 
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

        setCookie(res, token);
        
        res.status(200).json({ success: true, vendor: exists });

    } catch (error) {
        console.error(error); 
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
        const user = req.user;

        const type = req.params.type;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile =
            type === process.env.USER ? 
            await User.findById(user.id) : 
            type === process.env.ADMIN ? await Admin.findById(user.id) : 
            await Vendor.findById(user.id);

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
        
        const resetToken = Crypto.randomBytes(20).toString("hex");
        const resetTokenExpiration = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

        profile.resetToken = resetToken;
        profile.resetTokenExpiration = resetTokenExpiration;
        await profile.save(); 

        res.status(300).json({success: true, redirectTo: `${process.env.CLIENT_ADDRESS}/reset-password/${resetToken}`});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

    return;
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => { 
    try { 
        const user = req.user;

        const type = req.params.type;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile =
            type === process.env.USER ? 
            await User.findById(user.id) : 
            type === process.env.ADMIN ? await Admin.findById(user.id) : 
            await Vendor.findById(user.id);

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
        const today = new Date(Date.now())
        const password  = req.body.password;  
        const resetToken  = req.params.reset_token; 
        if(today > profile.resetTokenExpiration || resetToken !== profile.resetToken){
            res.status(400).json({ success: false, message: 'Reset token is expired or incorrect'});
            return;
        }
        const hashedPassword = await hashingPassword(password, profile.salt);

        profile.password = hashedPassword;
        profile.resetToken = "";
        profile.resetTokenExpiration = today;
        await profile.save();  

        res.status(200).json({success: true, message: "Password was reset successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => { 
    try { 
        const user = req.user;

        const type = req.params.type;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile =
            type === process.env.USER ? 
            await User.findById(user.id) : 
            type === process.env.ADMIN ? await Admin.findById(user.id) : 
            await Vendor.findById(user.id);
        
        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
        res.status(200).json({ success: true, authenticated: true});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

    return;
};