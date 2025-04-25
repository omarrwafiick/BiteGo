import { Request, Response } from "express";  
import { plainToClass } from "class-transformer";
import { validate } from "class-validator"; 
import { Offer } from "../models/offer.model";  
import { CreatePaymentDto } from "../dto/payment.dto"; 
import { Transaction } from "../models/transaction.model";
import { checkUser } from "../utilities/getUser";

export const addTransaction = async (req: Request, res: Response) : Promise<void> => {
    try {
        const paymentData = plainToClass(CreatePaymentDto, req.body);
        const errors = await validate(paymentData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        const user = await checkUser(req, res, String(process.env.USER));
                        
        if(!user){
            res.status(403).json({ success: false, message: 'Only user can make a payment' });
             return;
        }

        const { amount, paymentMode, offerId, vendorId, orderId } = req.body as CreatePaymentDto;

        let netAmount: number = Number(amount); 
        const offer = await Offer.findById(offerId);
        if(offer && offer.isActive){
            let disc = Number(offer.discountPercentage);  
            netAmount = netAmount - (netAmount * disc);
        }; 

        const newTransaction = await Transaction.create({
            userId: user.id,
            vendorId:vendorId,
            orderId: orderId,
            offerId: offerId || 0, 
            orderTotalValue: amount,
            orderNetValue: netAmount,
            paymentMethod: paymentMode, 
            status: true
        });

        await newTransaction.save();

        if (!newTransaction || !newTransaction._id){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
 
        res.status(201).json({success:true, transaction: newTransaction});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};
