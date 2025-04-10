import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { CreateDeliveryDto, UpdateDeliveryDto } from "../dto/delivery.dto";
import { Delivery } from "../models/delivery.model";
import { GenerateSalt, hashingPassword } from "../utilities/security";
import { UpdateLocationDto } from "../dto/main.dto";
import { findDelivery } from "../utilities/helper.methods";


export const CreateDelivey = async (req: Request, res: Response): Promise<void> => {
    try {   
        const deliveryData = plainToClass(CreateDeliveryDto, req.body);
        const errors = await validate(deliveryData, { skipMissingProperties: false });

        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        
        const { email, password, driverName, phone, address, pincode, vehicleType } = deliveryData;
        const exists = await Delivery.findOne({email: email});

        if(exists){
            res.status(400).json({ success: false, message: 'Delivery is already exists'});
            return;
        };

        const salt = await GenerateSalt();
        const hashedPassword = await hashingPassword(password, salt); 
 
        const result = await Delivery.create({
            email: email,
            password: hashedPassword,
            driverName: driverName, 
            phone: phone,
            address: address,
            salt: salt,
            pincode: pincode,
            vehicleType: vehicleType
        });
 
        await result.save(); 

        res.status(201).json({ success: true, message: "Delivery account was created successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getDeliveryProfile = async (req: Request, res: Response): Promise<void> => {
     try {   
            const user = req.user;
    
            if(!user){
                res.status(401).json({ success: false, message: 'Unauthorized access'});
                return;
            };
    
            const profile = await Delivery.findById(user.id);
    
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

export const editDeliveryProfile = async (req: Request, res: Response): Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        }; 

        const profile = await Delivery.findById(user.id);

        if(!profile){
            res.status(404).json({ success: false, message: 'Delivery was not found'});
            return;
        };
 
        const deliveryData = plainToClass(UpdateDeliveryDto, req.body);
        const errors = await validate(deliveryData, { skipMissingProperties: false });

        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        
        const { driverName, phone, address, pincode, vehicleType, estimatedTime, isApproved, latitude, longtude } = deliveryData;
        profile.driverName = driverName;
        profile.pincode =pincode;
        profile.phone =phone;
        profile.address =address;
        profile.estimatedTime =estimatedTime;
        profile.isApproved =isApproved;
        profile.latitude =latitude;
        profile.longtude =longtude;
        if (vehicleType === "Bike" || vehicleType === "Car" || vehicleType === "Van") profile.vehicleType = vehicleType;

        await profile.save();

        res.status(200).json({ success: true, message:"Profile is updated successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateDeliveyStatus = async (req: Request, res: Response) : Promise<void> =>  {
    try {  
            const user = req.user;
            if(!user) {   
                res.status(404).json({success:false, message: "No delivery was found"});
                return;
            }
            const delivery = await findDelivery(user.id);
            if(delivery){
                delivery.status = !delivery.status;
                await delivery.save();
                res.status(200).json({success:true, message: "Delivery status was updated successfully"});  
            }
            
        } catch (error) {
            res.status(500).json({ message: 'Internal server error'});
        }
        return;
};

export const updateDeliveryLocation = async (req: Request, res: Response): Promise<void> => {
    try {  
            const user = req.user;
            if(!user) {  
                res.status(404).json({success:false, message: "No delivery was found"});
                return;
            }

            const deliveryData = plainToClass(UpdateLocationDto, req.body);
            const errors = await validate(deliveryData, { skipMissingProperties: false });
            if(errors.length > 0){
                res.status(400).json({ success: false, message: 'All fields are required', errors });
                return;
            };
            const { latitude, longtude } = deliveryData;
            const delivery = await findDelivery(user.id);
            if(delivery){
                delivery.longtude = longtude;
                delivery.latitude = latitude;
                await delivery.save();
                res.status(200).json({success:true, message: "Delivery location status was updated successfully"});  
                return;
            }
            
        } catch (error) {
            res.status(500).json({ message: 'Internal server error'});
        }
        return;
};
