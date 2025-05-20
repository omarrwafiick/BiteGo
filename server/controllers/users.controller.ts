import { Request, Response } from "express"; 
import { plainToClass } from 'class-transformer'
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { validate } from 'class-validator';
import { generateOTP, GenerateSalt, GenerateSignature, hashingPassword, setCookie } from "../utilities/security";
import { User } from "../models/user.model";
import { sendOtp } from "../utilities/notification"; 
import { checkUser } from "../utilities/getUser";
import { Contact } from "../models/contact.model";
import { ContactDto } from "../dto/contact.dto";
   
export const CreateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = plainToClass(CreateUserDto, req.body);
        const errors = await validate(userData, { skipMissingProperties: false });

        if (errors.length > 0) {
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        }
        
        const { email, password, firstName, lastName, phone, address } = userData;

        const exists = await User.findOne({ email: email });
        if (exists) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }

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

        if (!result || !result._id) {
            res.status(400).json({ success: false, message: 'User creation failed' });
            return;
        }

        //await sendOtp(otp, phone);
 
        res.status(201).json({ success: true, message: "Otp is sent via sms" });
    } catch (error) {
         console.error('Error in CreateUser:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });    
    }
    return;
};

export const verifyUserAccount = async (req: Request, res: Response): Promise<void> => {
    try {   
        const { otp } = req.body;
        const user = await checkUser(req, res, String(process.env.USER)); 

        if(!user || !(user.otp === parseInt(otp) && user.otpExp >= new Date() )){
            res.status(400).json({ success: false, message: 'Invalid otp or user not found'});
            return;
        };
 
        user.isVerified = true;

        if (!user.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        await user.save();

        const token = GenerateSignature({ 
            id: user.id, 
            name: user.firstName,
            verified: user.isVerified, 
            email : user.email, 
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

        res.status(200).json({ success: true, profile});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {   
        const profile = await checkUser(req, res, String(process.env.USER)); 

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

        if (!profile.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        await profile.save();

        res.status(200).json({ success: true, message:"Profile is updated successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const contact = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const user = await checkUser(req, res, String(process.env.USER)); 
        const contactData = plainToClass(ContactDto, req.body);
            
        const errors = await validate(contactData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };

        const { subject, message } = contactData; 
      
        const result = await Contact.create({
             message,
             subject,
             userId: user._id
        }); 
        
        res.status(201).json({success:true, message: "Contact message was created successfully"});  
         
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};