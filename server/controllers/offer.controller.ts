import { Request, Response } from "express"; 
 import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateOfferDto, UpdateOfferDto } from "../dto/offer.dto";
import { Offer } from "../models/offer.model";
import { generateOfferCode } from "../utilities/security";
import { checkUser } from "../utilities/getUser";
import { Types } from 'mongoose';

export const getVendorOffers = async (req: Request, res: Response) : Promise<void> => {
    try { 
       const vendor = await checkUser(req, res, String(process.env.VENDOR));
       
       if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }        

        const offers = await Offer.find().populate('vendors');  

        let vendorOffers: any[] = []
        if(offers){
            offers.map((offer)=>{
                if(offer.vendors){
                    offer.vendors.map(vendor => {
                        if(String(vendor) === String(vendor.id)){
                            vendorOffers.push(offer);
                        }
                    });
                }
            });
        };

        res.status(200).json({success:true, vendorOffers});  
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
       
       if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }    

        const { pinCode, discountPercentage, validFrom, validTo, isActive } = req.body as CreateOfferDto;

        const newOffer =await Offer.create({
            pinCode: pinCode,
            code: generateOfferCode(), 
            discountPercentage: discountPercentage, 
            validFrom: validFrom, 
            validTo: validTo, 
            isActive: isActive,
            vendors: [vendor]
        });

        await newOffer.save();

        if(!newOffer || !newOffer._id){
            res.status(404).json({ success: false, message: 'Offer could not be created'});
            return;
        } 

        res.status(201).json({success:true, message: "Offer was created successfully"});  
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

        let disc = Number(discountPercentage);
        offer.discountPercentage = Types.Decimal128.fromString(disc.toString());
        offer.validTo = validTo;
        offer.isActive = isActive;

        const offerResult = await offer.save();

        if (!offerResult.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
 
        res.status(200).json({success:true, message: "Offer was updated successfully"});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const removeVendorFromOffer = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendor = await checkUser(req, res, String(process.env.VENDOR));
       
       if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        } 
 
        const offerId = req.params.id;
        const offer = await Offer.findById(offerId);
        
        if (!offer || !offer.vendors) { 
            res.status(404).json({ success: false, message: 'Offer was not found' });
            return;
        };

        offer.vendors = offer.vendors.filter(vendorId => !vendorId === vendor?.id);

        const offerResult = await offer?.save();

        if (!offerResult.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

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
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};


