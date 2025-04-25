import { Request, Response } from "express";  
import { generateOrderID } from "../utilities/security";
import { User } from "../models/user.model";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateOrderDto } from "../dto/order.dto";
import { Order } from "../models/order.model"; 
import { Transaction } from "../models/transaction.model";
import { findVendor } from "../utilities/helper.methods";
import { Delivery } from "../models/delivery.model";
import { checkUser } from "../utilities/getUser";
import { notifyDelivery } from "../utilities/notification";

export const createOrder = async (req: Request, res: Response): Promise<void> => { 
    try {   
        const profile = await checkUser(req, res, String(process.env.USER));
               
        if(!profile){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }            
 
        const orderData = plainToClass(CreateOrderDto, req.body);
        const errors = await validate(orderData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };       
    
        const { transactionId, userId, vendorId, items, remarks, deliveryId, appliedOffers, readyTime } = orderData;
        
        const transaction = await Transaction.findById(transactionId);

        if(!transaction?.status){  
            res.status(404).json({ success: false, message: 'Transaction was not found or completed' });
            return; 
        };        

        const vendor = await findVendor(vendorId);
        if(!vendor){
            res.status(404).json({ success: false, message: 'No vendor was found'});
            return;
        }
 
        const orderId = generateOrderID();

        const newOrder = await Order.create({
            id: orderId,
            userId: userId,
            vendorId: vendorId,
            items: items,
            totalAmount: transaction.orderNetValue, 
            remarks: remarks,
            deliveryId: deliveryId,
            appliedOffers: appliedOffers, 
            readyTime : readyTime,
            status: "Preparing"
        });

        const orderResult = await newOrder.save();

        if(!orderResult||!orderResult._id){
            res.status(400).json({ success: false, message: 'Order could not be created'});
            return;
        }

        profile.orderHistory?.push(newOrder.id);
        await profile.save();

        const deliveryResult = await assignOrderDelivery(newOrder.id, vendorId, Number(vendor.longitude), Number( vendor.latitude), vendor.pinCode);
  
        if(!deliveryResult){
            res.status(400).json({ success: false, message: 'No delivery was found please contact support'});
            return;
        }

        res.status(200).json({ success: true, message: "Order is created successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
}; 

export const getUserOrders = async (req: Request, res: Response): Promise<void> => { 
    try {   
        const user = await checkUser(req, res, String(process.env.USER));
               
        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }  
 
        const orders = await User.findById(user.id).populate('orderHistory');
         
        if(!orders){
            res.status(404).json({ success: false, message: 'User was not found or has no orders'});
            return;
        };        
 
        res.status(200).json({ success: true, orders: orders.orderHistory});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getUserOrderDetails= async (req: Request, res: Response): Promise<void> => { 
    try {    
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('items.foodId');
        
        if(!order){
            res.status(404).json({ success: false, message: 'User was not found or has no orders'});
            return;
        };        
 
        res.status(200).json({ success: true, order});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getVendorOrders = async (req: Request, res: Response): Promise<void> => { 
    try {   
        const vendor = await checkUser(req, res, String(process.env.VENDOR));
               
        if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }           

        const orders = await Order.find({vendorId: vendor.id}).populate('items.foodId');
        
        if(!orders){
            res.status(404).json({ success: false, message: 'No order was found'});
            return;
        }
  
        res.status(200).json({ success: true, orders});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getVendorOrderDetails = async (req: Request, res: Response): Promise<void> => { 
    try {    
        const orderId = req.params.id;
        const order = await Order.find({id: orderId}).populate('items.foodId');
        
        if(!order){
            res.status(404).json({ success: false, message: 'No order was found'});
            return;
        }
  
        res.status(200).json({ success: true, order});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateVendorOrder = async (req: Request, res: Response): Promise<void> => { 
    try {    
        const orderId = req.params.id;
        const order = await Order.findOne({id: orderId}).populate('items.foodId');
        
        if(!order){
            res.status(404).json({ success: false, message: 'No order was found'});
            return;
        }
        const { remarks, readyTime } = req.body;
   
        order.remarks = remarks;
        order.readyTime = readyTime;

        const orderResult = await order.save();

        if (!orderResult.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        res.status(200).json({ success: true, message: 'Order is updated successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const assignOrderDelivery = async (orderId:string, vendorId:string, longtude: number, latitude: number, pinCode: string): Promise<boolean> => { 
    try {    
        const availableDeliveries= await Delivery.find({pincode: pinCode, isApproved: true, status: true});

        if(availableDeliveries.length === 0) return false;

        const order = await Order.findById(orderId);

        if(!order) return false;
        
        order.deliveryId = availableDeliveries[0].id;

        const orderResult = await order?.save();
        
        if (!orderResult.isModified()){ 
            return false;
        } 

    } catch (error) { 
        return false;
    }
    return true;
};

export const cancelOrder = async (req: Request, res: Response): Promise<void> => { 
    try {    
        const type = req.params.type;

        if(type === process.env.DELIVERY){
            res.status(403).json({ success: false, message: "Forbidden route" });
            return 
        }

        const user = await checkUser(req, res, type);
               
        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }    

        const orderId = req.params.id;
        const order = await Order.findOne({id: orderId});
        
        if(!order){
            res.status(404).json({ success: false, message: 'No order was found'});
            return;
        } 
   
        order.status = "Cancelled"; 

        const delivery = await Delivery.findById(order.deliveryId);
        if(delivery){ 
            await notifyDelivery("We notify you that the order of id ${} is cancelled, for more info contact support", delivery.phone);
        }
        
        const orderResult = await order.save();

        if (!orderResult.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        res.status(200).json({ success: true, message: 'Order is cancelled successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
