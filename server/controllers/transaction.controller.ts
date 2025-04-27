import { Request, Response } from "express";  
import { plainToClass } from "class-transformer";
import { validate } from "class-validator"; 
import { Offer } from "../models/offer.model";  
import { CreateTransactionDto } from "../dto/transaction.dto"; 
import { Transaction } from "../models/transaction.model";
import { checkUser } from "../utilities/getUser";
import { Types } from "mongoose";
 
export const addTransaction = async (req: Request, res: Response) : Promise<void> => {
    try { 
        const paymentData = plainToClass(CreateTransactionDto, req.body);
        const errors = await validate(paymentData, { skipMissingProperties: true });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
        const user = await checkUser(req, res, String(process.env.USER)); 

        const { totalAmount, paymentMode, offerId, vendorId } = req.body as CreateTransactionDto;
 
        const offer = await Offer.findById(offerId);
 
        let netAmount =  Types.Decimal128.fromString(totalAmount.toString()); 

        if (offer && offer.isActive && netAmount) {
            const net = netAmount.toString();
            const discount = offer.discountPercentage.toString();
        
            const netNumber = parseFloat(net);
            const discountNumber = parseFloat(discount);
        
            const cut = netNumber * discountNumber;
            const final = netNumber - cut;
        
            netAmount = Types.Decimal128.fromString(final.toFixed(2)); 
        }
        
        const newTransaction = await Transaction.create({
            userId: user.id,
            vendorId:vendorId, 
            offerId: offerId || "", 
            orderTotalValue: totalAmount,
            orderNetValue: netAmount,
            paymentMethod: paymentMode, 
            status: true
        }); 

        if (!newTransaction || !newTransaction._id){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
 
        res.status(201).json({success:true, transactionId: newTransaction._id});  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error});
    }
    return;
};
