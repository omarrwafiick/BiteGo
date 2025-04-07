import e, { Request, Response } from "express";
import { CreateVendorDto, UpdateVendorDto } from "../dto/vendor.dto";
import { Vendor } from "../models/vendor.model";   
import { z } from 'zod'; 
import { GenerateSalt, GenerateSignature, hashingPassword } from "../utilities/security";
import { findVendor } from "../utilities/helper.methods";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export const getVendors = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendors = await Vendor.find();

        if(!vendors) {
            res.status(404).json({success:false, message: "No vendor was found"});
            return;
        } 

        res.status(200).json({success:true, vendors: vendors}); 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const getVendorProfile = async (req: Request, res: Response) : Promise<void> => {
    try {
        const user = req.user;

        if(user) { 
            const vendor = await findVendor(user.id);
            if(vendor){
                res.status(200).json({vendor}); 
                return;
            }  
        }

        res.status(404).json({success:false, message: "No vendor was found"});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const updatetVendorProfile = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendorData = plainToClass(UpdateVendorDto, req.body);
        const errors = await validate(vendorData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
                
        const { email, name, phone, menu } = req.body as UpdateVendorDto;
        
        const user = req.user;

        if(user) { 
            const vendor = await findVendor(user.id);
            if(vendor){
                vendor.name = name;
                vendor.email = email;
                vendor.phone = phone;
                vendor.menu = menu;
                await vendor.save();
                res.status(200).json({success:true, message: "Vendor was updated successfully"});  
                return;
            }
        }

        res.status(404).json({success:false, message: "No vendor was found"});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const updateVendorService = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const user = req.user;
        if(user) { 
            const vendor = await findVendor(user.id);
            if(vendor){
                vendor.serviceAvailable = !vendor.serviceAvailable;
                await vendor.save();
                res.status(200).json({success:true, message: "Vendor service status was updated successfully"});  
                return;
            }
        }

        res.status(404).json({success:false, message: "No vendor was found"});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const getVendorByID = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendorID = req.params.id;
        const vendor = await findVendor(vendorID);

        if(!vendor) {
            res.status(404).json({success:false, message: `Vendor was not found with ID: ${vendorID}`});
            return;
        } 

        res.status(200).json({success:true, vendor}); 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const createVendor = async (req: Request, res: Response) : Promise<void> => {
    try { 
    const vendorData = plainToClass(CreateVendorDto, req.body);
    const errors = await validate(vendorData, { skipMissingProperties: false });
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
    });
 
    await newVendorModel.save();

    const jwt = GenerateSignature({id: newVendorModel.id, name: name, email: email});

    res.status(201).json({success:true, message: "Vendor is created Successfully", vendor: newVendorModel, token: jwt}); 
      
    } catch (error) {
        if (error instanceof z.ZodError) res.status(400).json({ errors: error.errors });
           
        else res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
