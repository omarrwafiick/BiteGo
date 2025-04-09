import { Request, Response } from "express";  
import { plainToClass } from "class-transformer";
import { validate } from "class-validator"; 
import { Offer } from "../models/offer.model";  
import { CreatePaymentDto } from "../dto/payment.dto";
import { User } from "../models/user.model";
import { Transaction } from "../models/transaction.model";

export const addUserPayment = async (req: Request, res: Response) : Promise<void> => {
    try {
        const paymentData = plainToClass(CreatePaymentDto, req.body);
        const errors = await validate(paymentData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        const user = req.user;
        
        if(!user){
             res.status(401).json({ success: false, message: 'Unauthorized access' });
             return;
        }

        const isUser = await User.findById(user.id);

        if(!isUser){
            res.status(403).json({ success: false, message: 'Only user can make a payment' });
             return;
        }

        const { amount, paymentMode, offerId, vendorId, orderId } = req.body as CreatePaymentDto;

        let totalAmount: number = Number(amount);
        const offer = await Offer.findById(offerId);
        if(offer && offer.isActive){
            totalAmount = totalAmount - (totalAmount * offer.discountPercentage)
        }; 

        const newTransaction = await Transaction.create({
            userId: isUser.id,
            vendorId:vendorId,
            orderId: orderId,
            offerId: offerId || 0,
            orderValue: totalAmount , 
            paymentMethod: paymentMode, 
            status: true
        });

        await newTransaction.save();
        res.status(201).json({success:true, transaction: newTransaction});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};
