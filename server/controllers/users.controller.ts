import { Request, Response } from "express"; 
import { plainToClass } from 'class-transformer'
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { validate } from 'class-validator';
import { generateOTP, GenerateSalt, GenerateSignature, hashingPassword } from "../utilities/security";
import { User } from "../models/user.model";
import { sendOtp } from "../utilities/notification";
 
export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {   
        const userData = plainToClass(CreateUserDto, req.body);
        const errors = await validate(userData, { skipMissingProperties: false });

        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        //setting data 
        const { email, password, firstName, lastName, phone, address } = userData;
        const exists = await User.findOne({email: email});

        if(exists){
            res.status(400).json({ success: false, message: 'User already exists'});
            return;
        };

        const salt = await GenerateSalt();
        const hashedPassword = await hashingPassword(password, salt);
        const otp = generateOTP();
        const otpExp = new Date().getTime() + (30 * 60 * 1000);
 
        const result = await User.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
            salt: salt,
            otp: otp,
            otpExp: otpExp
        });

        if(!result){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }   

        await result.save();

        await sendOtp(otp, phone);

        const token = GenerateSignature({ 
            id: result.id, 
            email: email, 
            verified: result.isVerified});
        res.status(200).json({ success: true, token, message: "Otp is sent via email" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const verifyAccount = async (req: Request, res: Response): Promise<void> => {
    try {   
        const { otp } = req.body;
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };

        const profile = await User.findById(user.id);

        if(!profile || !(profile.otp === parseInt(otp) && profile.otpExp >= new Date() )){
            res.status(400).json({ success: false, message: 'Invalid otp or user not found'});
            return;
        };

        profile.isVerified = true;

        const result = await profile.save();

        const token = GenerateSignature({ 
                    id: result.id,  
                    email : result.email,
                    verified: result.isVerified
                });

        res.status(200).json({ success: true, token });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const requestOtp = async (req: Request, res: Response): Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };

        const profile = await User.findById(user.id);

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };

        const otp = generateOTP();
        const otpExp = new Date();

        profile.otp = otp;
        profile.otpExp = otpExp;

        await profile.save();
        await sendOtp(otp, profile.phone);
 
        res.status(200).json({ success: true, message: "Otp is sent via email" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
 
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };

        const profile = await User.findById(user.id);

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
  
        res.status(200).json({ success: true, profile});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const editProfile = async (req: Request, res: Response): Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        }; 

        const profile = await User.findById(user.id);

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
 
        const userData = plainToClass(UpdateUserDto, req.body);
        const errors = await validate(userData, { skipMissingProperties: false });

        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        //update data
        const { firstName, lastName, phone, address } =  userData;
        profile.firstName =firstName;
        profile.lastName =lastName;
        profile.phone =phone;
        profile.address =address;

        await profile.save();

        res.status(200).json({ success: true, message:"Profile is updated successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};