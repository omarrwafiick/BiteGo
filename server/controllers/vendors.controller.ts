import { Request, Response } from "express";
import { CreateVendorDto, UpdateVendorDto } from "../dto/vendor.dto"; 
import { findVendor } from "../utilities/helper.methods";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator"; 
import { UpdateLocationDto } from "../dto/main.dto";
import { GenerateSalt, hashingPassword } from "../utilities/security";
import { Vendor } from "../models/vendor.model";
import { checkUser } from "../utilities/getUser";

export const createVendor = async (req: Request, res: Response) : Promise<void> => {
    try { 
    const vendorData = plainToClass(CreateVendorDto, req.body);
    const errors = await validate(vendorData, { skipMissingProperties: true });
    if(errors.length > 0){
        res.status(400).json({ success: false, message: 'All fields are required', errors });
        return;
    };    
    
    const { name, ownerName, pinCode, address, phone, email, password } = <CreateVendorDto>req.body; 
 
    const exists = await findVendor('', email);

    if(exists) {
        res.status(400).json({success:false, message: "Vendor is already exists"});
        return;
    } 

    const salt = await GenerateSalt();
    const hashedPassword = await hashingPassword(password, salt);

    const newVendorModel = await Vendor.create({
        name: name,
        ownerName: ownerName, 
        pinCode: pinCode,
        address: address,
        phone: phone,
        email: email,
        password: hashedPassword,
        rating: 0,
        salt: salt,
        serviceAvailable: false,
        coverImages: [], 
        isApproved: false
    });
     
    if(!newVendorModel || !newVendorModel._id){
        res.status(400).json({ success: false, message: 'Vendor could not be created'});
        return;
    } 

    res.status(201).json({success:true, message: "Vendor is created Successfully", vendor: newVendorModel}); 
      
    } catch (error) {  
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getVendorProfile = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendor = await checkUser(req, res, String(process.env.VENDOR));
                               
        if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }            

        res.status(200).json({success:true, message: "Vendor is created Successfully", vendor}); 
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const updatetVendorProfile = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendorData = plainToClass(UpdateVendorDto, req.body);
        const errors = await validate(vendorData, { skipMissingProperties: true });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
                
        const { name, phone, menu, pinCode } = req.body as UpdateVendorDto;
        
        const vendor = await checkUser(req, res, String(process.env.VENDOR));
                               
        if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }   

        vendor.name = name; 
        vendor.phone = phone;
        vendor.pinCode = pinCode;
        if(menu.length > 0){
            vendor.menu.push(menu);
        } 

        if (!vendor.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        
        await vendor.save();

        res.status(200).json({success:true, message: "Vendor was updated successfully"});   
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error});
    }
    return;
};

export const updateVendorService = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const vendor = await checkUser(req, res, String(process.env.VENDOR));
                               
        if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }   

        vendor.serviceAvailable = !vendor.serviceAvailable; 

        if (!vendor.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        await vendor.save();
        res.status(200).json({success:true, message: "Vendor service status was updated successfully"});   
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const updateVendorLocation = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const vendor = await checkUser(req, res, String(process.env.VENDOR));
                               
        if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }   

        const vendorData = plainToClass(UpdateLocationDto, req.body);
        const errors = await validate(vendorData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
 
        vendor.longitude = vendorData.longitude;
        vendor.latitude = vendorData.latitude;  

        if (!vendor.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        await vendor.save();
        res.status(200).json({success:true, message: "Vendor location status was updated successfully"});    
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};


