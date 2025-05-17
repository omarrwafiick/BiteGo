import { Request, Response } from "express"; 
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateOfferDto, UpdateOfferDto } from "../dto/offer.dto";
import { Offer } from "../models/offer.model"; 
import { checkUser } from "../utilities/getUser";
import { Types } from 'mongoose';
import { getCurrentTime } from "../utilities/helper.methods";
import { FoodItem } from "../models/fooditem.model";
 

export const getVendorOffers = async (req: Request, res: Response) : Promise<void> => {
    try { 
       const vendor = await checkUser(req, res, String(process.env.VENDOR)); 
       const offers = await Offer.find({vendorId: vendor._id});   
       if(!offers){
            res.status(404).json({ message: 'Nothing was found'});
            return;
       }

       res.status(200).json({success:true, offers});  
    } catch (error) {
       res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const addVendorOffers = async (req: Request, res: Response) : Promise<void> => {
    try { 
        const offerData = plainToClass(CreateOfferDto, req.body);
        const errors = await validate(offerData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        const vendor = await checkUser(req, res, String(process.env.VENDOR)); 
        const { discountPercentage, validTo, isActive, foodItemId } = req.body as CreateOfferDto; 

        const foodItem = await FoodItem.findById(foodItemId);
        if(!foodItem){
            res.status(404).json({ success: false, message: 'Item was not found'});
            return;
        } 

        const newOffer = await Offer.create({
            pinCode: vendor.pinCode, 
            discountPercentage: Types.Decimal128.fromString(discountPercentage.toString()),
            validFrom: new Date(),  
            validTo: getCurrentTime(validTo),
            isActive: isActive,
            vendorId: vendor._id,
            foodItems: [foodItemId]
        }); 

        if(!newOffer || !newOffer._id){
            res.status(400).json({ success: false, message: 'Offer could not be created'});
            return;
        } 

        res.status(201).json({success:true, message: "Offer was created successfully"});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};
 
export const addFoodItemToOffer = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const vendor = await checkUser(req, res, String(process.env.VENDOR)); 
        const offerId = req.params.offerid; 
        const foodItemId = req.params.itemid; 

        const offer = await Offer.findById(offerId);
        
        const foodItem = await FoodItem.findById(foodItemId);

        if(!offer || !foodItem){
            res.status(404).json({ success: false, message: 'Offer could not be created'});
            return;
        } 

        offer.foodItems = [...offer.foodItems??[], foodItem._id];

        if(!offer.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
        
        }
        await offer.save();

        res.status(201).json({success:true, message: "Offer was updated successfully"});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const updateOffers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const offerData = plainToClass(UpdateOfferDto, req.body);
        const errors = await validate(offerData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        }; 

        const { discountPercentage, validTo, isActive} = req.body as UpdateOfferDto;
 
        const offetId = req.params.id;

        const offer = await Offer.findById(offetId);

        if(!offer){ 
            res.status(404).json({ success: false, message: 'Offer was not found'});
            return;
        };
 
        offer.discountPercentage = Types.Decimal128.fromString(discountPercentage.toString());
        offer.validTo = getCurrentTime(validTo) ;
        offer.isActive = isActive; 

        if (!offer.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        await offer.save();
 
        res.status(200).json({success:true, message: "Offer was updated successfully"});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const removeVendorOffer = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const offerId = req.params.id;
        const offer = await Offer.findByIdAndDelete(offerId);
        
        if (!offer) { 
            res.status(404).json({ success: false, message: 'Offer was not found' });
            return;
        };
        
        res.status(200).json({success:true, message: "Vendor was removed from offer successfully"});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const getUserOffers = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const pincode = req.params.pincode;

        const offers = await Offer.find({ pinCode: pincode, isActive: true});  

        if(!offers){
            res.status(404).json({ success: false, message: 'No offer was found' });
            return;
        }
  
        res.status(200).json({success:true, offers});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const verifyUserOffer = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const offerId = req.params.id;

        const offer = await Offer.findById(offerId);  

        if(!offer || !offer.isActive){
            res.status(404).json({ success: false, message: 'Offer is not available' });
            return;
        }
  
        res.status(200).json({success:true, message: "Offer is available"});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error});
    }
    return;
};


