import { Request, Response } from "express"; 
import { plainToClass } from 'class-transformer'
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { validate } from 'class-validator';
import { generateOTP, GenerateSalt, GenerateSignature, hashingPassword, setCookie } from "../utilities/security";
import { User } from "../models/user.model";
import { sendOtp } from "../utilities/notification";
import { UpdateLocationDto } from "../dto/main.dto"; 
import { checkUser } from "../utilities/getUser";
 
export const CreateUser = async (req: Request, res: Response): Promise<void> => {
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
            res.status(404).json({ success: false, message: 'Nothing was found'});
            return;
        }   

        const userResult = await result.save();

        if (!userResult || !userResult._id ){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        } 

        await sendOtp(otp, phone); 

        res.status(201).json({ success: true, message: "Otp is sent via email" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const verifyUserAccount = async (req: Request, res: Response): Promise<void> => {
    try {   
        const { otp } = req.body;
        const user = await checkUser(req, res, String(process.env.USER));
                       
        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }         

        if(!user || !(user.otp === parseInt(otp) && user.otpExp >= new Date() )){
            res.status(400).json({ success: false, message: 'Invalid otp or user not found'});
            return;
        };

        user.isVerified = true;

        const result = await user.save();

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        const token = GenerateSignature({ 
            id: result.id, 
            name: result.firstName,
            verified: result.isVerified, 
            email : result.email, 
            role: String(process.env.USER)
        });      
            
        setCookie(res, token);

        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const requestOtp = async (req: Request, res: Response): Promise<void> => {
    try {   
        const profile = await checkUser(req, res, String(process.env.USER));
                       
        if(!profile){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }    

        const otp = generateOTP();
        const otpExp = new Date();

        profile.otp = otp;
        profile.otpExp = otpExp;

        const result = await profile.save();

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        await sendOtp(otp, profile.phone);
 
        res.status(200).json({ success: true, message: "Otp is sent via SMS" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
 
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {   
        const profile = await checkUser(req, res, String(process.env.USER));
                       
        if(!profile){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        } 
  
        res.status(200).json({ success: true, profile});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {   
        const profile = await checkUser(req, res, String(process.env.USER));
                       
        if(!profile){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        } 
 
        const userData = plainToClass(UpdateUserDto, req.body);
        const errors = await validate(userData, { skipMissingProperties: false });

        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        
        const { firstName, lastName, phone, address } =  userData;
        profile.firstName =firstName;
        profile.lastName =lastName;
        profile.phone =phone;
        profile.address =address;

        const result = await profile.save();

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        res.status(200).json({ success: true, message:"Profile is updated successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateUserLocation = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const user = await checkUser(req, res, String(process.env.USER));
                       
        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        } 

        const userData = plainToClass(UpdateLocationDto, req.body);
            
        const errors = await validate(userData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };

        const { latitude, longtude } = userData; 
        
        if(!user){
            res.status(404).json({success:false, message: "No user was found"});
            return;
        }
        user.longtude = longtude;
        user.latitude = latitude;
        const result = await user.save();

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        } 
        res.status(200).json({success:true, message: "User location status was updated successfully"});  
         
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};