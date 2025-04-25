import { Request, Response } from "express";
import { Transaction } from "../models/transaction.model";
import { Vendor } from "../models/vendor.model"; 
import { Delivery } from "../models/delivery.model";
import { Admin } from "../models/admin.model";
import { User } from "../models/user.model";
import { CreateAdminDto } from "../dto/admin.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { GenerateSalt, hashingPassword } from "../utilities/security";
import { findDelivery, findVendor } from "../utilities/helper.methods";
import { Order } from "../models/order.model";
 
export const createAdmin = async (req: Request, res: Response): Promise<void> => {
     try {   
            const adminData = plainToClass(CreateAdminDto, req.body);
            const errors = await validate(adminData, { skipMissingProperties: false });
    
            if(errors.length > 0){
                res.status(400).json({ success: false, message: 'All fields are required', errors });
                return;
            };
            
            const { email, password, name} = adminData;
            const exists = await Admin.findOne({email: email});
    
            if(exists){
                res.status(400).json({ success: false, message: 'Admin already exists'});
                return;
            };
    
            const salt = await GenerateSalt();
            const hashedPassword = await hashingPassword(password, salt); 
     
            const result = await Admin.create({
                email: email,
                password: hashedPassword, 
                name: name,
                salt: salt
            });
    
            if(!result || !result._id){
                res.status(400).json({ success: false, message: 'Admin could not be created'});
                return;
            }    
    
            res.status(201).json({ success: true, message: "Admin was created successfully" });
    
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
        return;
}; 

export const getEntityById = async (req: Request, res: Response) : Promise<void> => {
    try { 
        const id = req.params.id;
        const type = req.params.type;
        const entity = type === process.env.USER 
                    ? await User.find() 
                    : type === process.env.ADMIN 
                    ? await Admin.find()
                    : type === process.env.DELIVERY 
                    ? await Delivery.find()
                    : await Vendor.find(); 
                
        if(!entity){
            res.status(404).json({ success: false, message: `${type} was not found`});
            return;
        };      

        const match = entity.filter(x=>x.id == id);

        res.status(200).json({success:true, entity: match }); 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error});
    }
    return;
}; 

export const getEntity= async (req: Request, res: Response) : Promise<void> => {
    try {  
        const type = req.params.type;
        
        if(typeof type !== "string"){
            res.status(400).json({success:false, message: "Type is not valid"});
            return;
        }

        const entity = type === process.env.USER 
                    ? await User.find() 
                    : type === process.env.ADMIN 
                    ? await Admin.find()
                    : type === process.env.DELIVERY 
                    ? await Delivery.find()
                    : await Vendor.find();

        if(entity.length === 0) {
            res.status(404).json({success:false, message: "Nothing was found"});
            return;
        } 

        res.status(200).json({success:true, data: entity}); 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const deleteEntityById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const id = req.params.id;
        const type = req.params.type;

        type === process.env.USER 
            ? await User.findByIdAndDelete(id) 
            : type === process.env.ADMIN 
            ? await Admin.findByIdAndDelete(id) 
            : type === process.env.DELIVERY 
            ? await Delivery.findByIdAndDelete(id) 
            : await Vendor.findByIdAndDelete(id) ;       
  

        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error'});
    }
    return;
};

export const getTransactions = async (req: Request, res: Response):Promise<void> => {
    try {    
        const transactions = await Transaction.find().limit(10);
  
        if(transactions.length === 0){
            res.status(404).json({ success: false, message: 'Nothing was found'});
            return;
        }  

        res.status(200).json({ success: true, transactions });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getTransactionById = async (req: Request, res: Response):Promise<void> => {
    try {    
        const transactionId = req.params.id;
        const transaction = await Transaction.findById(transactionId);
  
        if(transaction){
            res.status(404).json({ success: false, message: 'Nothing was found'});
            return;
        }  

        res.status(200).json({ success: true, transaction });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const approveAccount = async (req: Request, res: Response):Promise<void> => {
    try {    
        const id = req.params.id;
        const type = req.params.type;

        const entity = type === process.env.DELIVERY   
                    ? await findDelivery(id)
                    : await findVendor(id) ;

        if(!entity){
            res.status(404).json({ success: false, message: 'Nothing was found'});
            return;
        }  

        entity.isApproved = true;

        if (!entity.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected' });
            return;
        } 

        await entity.save();

        res.status(200).json({ success: true, message: 'Account is approved by admin' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getOrders = async (req: Request, res: Response):Promise<void> => {
    try {    
        const orders = await Order.find().limit(20);
  
        if(orders.length === 0){
            res.status(404).json({ success: false, message: 'Nothing was found'});
            return;
        }  

        res.status(200).json({ success: true, orders });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getOrderById = async (req: Request, res: Response):Promise<void> => {
    try {    
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
  
        if(!order){
            res.status(404).json({ success: false, message: 'Nothing was found'});
            return;
        }  

        res.status(200).json({ success: true, order });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const deleteOrder = async (req: Request, res: Response):Promise<void> => {
    try {    
        const orderId = req.params.id;
        await Order.findByIdAndDelete(orderId); 
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
