import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { CreateCartItem, UpdateCartItems } from "../dto/cart.dto";
import { Cart } from "../models/cart.model";
import { FoodItem } from "../models/fooditem.model";
import { findUser } from "../utilities/helper.methods";  
import { Types } from "mongoose";

export const manageCart = async (req: Request, res: Response):Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile = await User.findById(user.id).populate('cart');

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
         
        const cartData = plainToClass(CreateCartItem, req.body);
        const errors = await validate(cartData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };    
        
        const { foodId, quantity } = cartData;
         
        const foodItem = await FoodItem.findById(foodId); 

        if(!foodItem){
            res.status(404).json({ success: false, message: 'Food Item was not found'});
            return;
        };
         
        if (profile.cart) {
            const userCart = await Cart.findById(profile.cart);
            if (userCart) {
                if (userCart.items && userCart.items.length > 0) {
                    let itemExists = userCart.items.find(i => String(i.foodId) == String(foodItem._id));
                    if (itemExists) {
                        itemExists.quantity += quantity; 
                        itemExists.price = foodItem.price; 
                    } else {  
                        userCart.items.push({
                            foodId: foodItem._id, 
                            quantity: quantity, 
                            price: foodItem.price
                        });
                    }
                } else { 
                    userCart.items = [{
                        foodId: foodItem._id, 
                        quantity: quantity, 
                        price: foodItem.price
                    }];
                } 
          
                await userCart.save();
         
                res.status(200).json({ success: true, message: 'Cart updated successfully.' });
                return ;
            } else { 
                 res.status(404).json({ success: false, message: 'Cart not found for this user.' }); return ;
            }
        } 
        //new cart to user
        const newCart = await Cart.create({
            userId: profile.id,
            items: {
                foodId: foodItem._id,
                quantity: quantity,
                price: foodItem.price
            }
        }); 

        if(!newCart || !newCart._id){
            res.status(400).json({ success: false, message: 'Cart could not be created'});
            return;
        }
        
        profile.cart = newCart._id;
        await profile.save();
        res.status(200).json({ success: true, message: "Cart item is added successfully"});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getCartItems = async (req: Request, res: Response):Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile = await findUser(user.id); 
        
        const cartItems = await Cart.findOne({userId: profile?.id}).populate('items.foodId.offerId');

        if(!cartItems){
            res.status(404).json({ success: false, message: 'Item was not found'});
            return;
        };

        res.status(200).json({ success: true, cartItems});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    try {   
        const user = req.user; 

        const profile = await findUser(user?.id); 

        const cart = await Cart.findOne({ userId: profile?.id });
        if (!cart ) {
            res.status(404).json({ success: false, message: 'Cart was not found' });
            return; 
        }

        const itemId = req.params.id;

        if(cart.items){ 
            const itemIndex = cart.items.findIndex(i => i.foodId.toString() === itemId);

            if (itemIndex === -1) {
                res.status(404).json({ success: false, message: 'Item was not found' });
                return;
            }
    
            cart.items.splice(itemIndex, 1);
        } 

        if (!cart.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        } 
        await cart.save(); 

        res.status(200).json({ success: true, message: 'Cart item was removed successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const clearCart = async (req: Request, res: Response):Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile = await User.findById(user.id); 
        
        const cart = await Cart.findOne({userId: profile?.id});

        if(!cart){
            res.status(404).json({ success: false, message: 'Cart was not found'});
            return;
        };

        cart.items = [];

        if (!cart.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }
        await cart.save();

        res.status(200).json({ success: true,  message: 'Cart is now empty'});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateCart = async (req: Request, res: Response):Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile = await User.findById(user.id).populate('cart');

        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
         
        const cartData = plainToClass(UpdateCartItems, req.body);
        const errors = await validate(cartData, { skipMissingProperties: false });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };     
         
        if (profile.cart) {
            const userCart = await Cart.findById(profile.cart);
            if (userCart) {
                if (userCart.items && userCart.items.length > 0) { 
                    const cartItems = cartData.cartItems.map(item => ({
                            foodId: new Types.ObjectId(item.foodId),
                            quantity: item.quantity,
                            price: Types.Decimal128.fromString(item.price.toString())
                    }));

                    userCart.items = [...userCart.items, ...cartItems];

                    await userCart.save();
            
                    res.status(200).json({ success: true, message: 'Cart is updated successfully' });
                }   
                return ;
            } else { 
                 res.status(404).json({ success: false, message: 'Cart not found for this user.=' }); return ;
            }
        }    

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};