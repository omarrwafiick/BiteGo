import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { CreateCartItem } from "../dto/cart.dto";
import { Cart } from "../models/cart.model";
import { FoodItem } from "../models/fooditem.model";
import { findUser } from "../utilities/helper.methods";  
import { Types } from 'mongoose';


export const addToCart = async (req: Request, res: Response):Promise<void> => {
    try {   
        const user = req.user;

        if(!user){
            res.status(401).json({ success: false, message: 'Unauthorized access'});
            return;
        };
        
        const profile = await findUser(user.id);
        
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
        
        const { foodId, quantity, price } = cartData;
         
        const foodItem = await FoodItem.findById(foodId); 

        if(!foodItem){
            res.status(404).json({ success: false, message: 'Food Item was not found'});
            return;
        };
         
        //user have a cart already
        if(profile.cart){  
            const userCart = await Cart.findById(profile.cart.id);
            if(userCart?.items){
                let itemExists = userCart?.items.find(i => i.foodId === foodItem.id);
                if(itemExists){
                    itemExists.quantity = quantity;
                    let newPrice = (Number(quantity) * Number(price));
                    itemExists.price = Types.Decimal128.fromString(newPrice.toString());;
                } 
                else{  
                    let thePrice = Number(price) 
                    userCart?.items.push( {
                        foodId: foodItem.id,
                        quantity: quantity, 
                        
                        price: Types.Decimal128.fromString(thePrice.toString())
                    });
                };
            }
            
            await userCart?.save();
            if(!userCart?.isModified()){
                res.status(400).json({ success: false, message: 'Cart could not be updated'});
                return;
            }
            res.status(200).json({ success: true, message: "User Cart item is updated successfully"});
            return;
        };
        
        //new cart to user
        const newCart = await Cart.create({
            userId: profile.id,
            items: {
                foodId: foodItem.id,
                quantity: 1,
                price: foodItem.price
            }
        });

        await newCart.save();

        if(!newCart || !newCart._id){
            res.status(400).json({ success: false, message: 'Cart could not be created'});
            return;
        }

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
        
        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
        
        const cartItems = await Cart.findOne({userId: profile.id}).populate('items.foodId');

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

        if (!user) {
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        }

        const profile = await findUser(user.id);
        if (!profile) {
            res.status(404).json({ success: false, message: 'User was not found' });
            return;
        }

        const cart = await Cart.findOne({ userId: profile.id });
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

        const result = await cart.save(); 

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

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
        
        if(!profile){
            res.status(404).json({ success: false, message: 'User was not found'});
            return;
        };
        
        const cart = await Cart.findOne({userId: profile.id});

        if(!cart){
            res.status(404).json({ success: false, message: 'Cart was not found'});
            return;
        };

        cart.items = [];

        const result = await cart.save();

        if (!result.isModified()){
            res.status(400).json({ success: false, message: 'No changes detected'});
            return;
        }

        res.status(200).json({ success: true,  message: 'Cart is now empty'});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
