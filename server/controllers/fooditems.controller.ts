import { Request, Response } from "express"; 
import { FoodItemDto } from "../dto/foodItem.dto";
import { FoodItem } from "../models/fooditem.model";
import { Vendor } from "../models/vendor.model";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";  
import { IFoodItem } from "../models/fooditem.model";
import { checkUser } from "../utilities/getUser"; 
import path from 'path';
import fs from 'fs';
import { Types } from "mongoose";

export const addFoodItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const vendor = await checkUser(req, res, String(process.env.VENDOR)); 

        const foodData = plainToClass(FoodItemDto, req.body);
        const errors = await validate(foodData, { skipMissingProperties: false });
        
        if (errors.length > 0) {
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return 
        }

        const { name, description, price, category, available, readyTime } = req.body as FoodItemDto;
        
        const exists = await FoodItem.find({ name, category, vendorId: vendor._id });
        if (exists.length > 0) {
            console.log("Item already exists");
            res.status(400).json({ success: false, message: 'Item already exists' });
            return;
        }

        const newFood = await FoodItem.create({
            vendorId: vendor.id,
            name,
            description,
            price,
            category,
            available,
            readyTime,
            images: [] 
        });

        if (!newFood || !newFood._id) {
            console.log("Food item could not be created");
            res.status(400).json({ success: false, message: 'Food item could not be created' });
            return;
        }

        if (req.files && Array.isArray(req.files)) {
            const imagePaths = [];
          
            for (const file of req.files) {
              const filename = `${Date.now()}-${file.originalname}`;
              const filepath = path.join(__dirname, "../assets/uploads", filename);
              fs.writeFileSync(filepath, file.buffer); 
              imagePaths.push(filename);
            }
          
            newFood.images = imagePaths;
            await newFood.save();
        }

        await vendor.menu.push(newFood);   
        await vendor.save();

        res.status(200).json({ success: true, message: "Food item was created successfully" });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ message: 'Internal server error', error });
    }
};

export const getFoodItems = async (req: Request, res: Response): Promise<void>  => {
    try {  
        const vendor = await checkUser(req, res, String(process.env.VENDOR)); 

        const foodItems = await FoodItem.find({vendorId: vendor?.id});

        if(!foodItems){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }      
 
        const foodItemsWithImages = await Promise.all(foodItems.map(async (foodItem) => {
            const foodItemWithImages = { ...foodItem.toObject() }; 
             
            foodItemWithImages.images = await Promise.all(foodItem.images.map(async (image: any) => {
                const imagePath = path.join(__dirname, "../assets/uploads", image);
        
                if (fs.existsSync(imagePath)) {
                    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${image}`;
                    return imageUrl;
                } else {
                    return null;
                }
            }));
        
            return foodItemWithImages;
        }));
  
        res.status(200).json({ success: true, foodItemsWithImages });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getFoodAvailable = async (req: Request, res: Response): Promise<void> => {
    try {  
        const pincode = req.params.pincode; 
 
        const result = await Vendor.find({pinCode: pincode, serviceAvailable: true})
            .sort([['rating', 'descending']])
            .populate('menu');  

        if(result.length === 0){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }  

        res.status(200).json({ success: true, result });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getTopResturant = async (req: Request, res: Response): Promise<void>  => {
    try {  
        const pincode = req.params.pincode; 
 
        const result = await Vendor.find({pinCode: pincode, serviceAvailable: true})
            .sort([['rating', 'descending']])
            .limit(10);
  
        if(result.length === 0){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }  

        res.status(200).json({ success: true, result });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
 
export const getFoodIn30Minute = async (req: Request, res: Response): Promise<void> => {
    try {  
        const pincode = req.params.pincode; 
 
        const result = await Vendor.find({pinCode: pincode, serviceAvailable: true})
            .populate('menu');
            
        if(result.length === 0){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }  

        const foodResult:any = []; 

        result.map( (vendor) => {
            const foods = vendor.menu as [IFoodItem];
            foodResult.push(...foods.filter(food => Number(food.readyTime) <= 30));
        });

        res.status(200).json({ success: true, foodResult });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const searchFood = async (req: Request, res: Response): Promise<void> => {
    try {  
        const pincode = req.params.pincode; 
 
        const result = await Vendor.find({pinCode: pincode, serviceAvailable: true}) 
            .populate('menu');
  
        if(result.length === 0){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }  

        const foodResult:any = []; 
        
        result.map( (items) => { 
            if(items.menu){ 
                foodResult.push(...items.menu);
            }
        });

        res.status(200).json({ success: true, foodResult });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getResturantById = async (req: Request, res: Response): Promise<void> => {
    try {  
        const id = req.params.id; 
 
        const result = await Vendor.findById(id).populate('menu');
         
        if(!result){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }  

        res.status(200).json({ success: true, result });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const updateVendorMenu = async (req: Request, res: Response) : Promise<void> => {
    try {
        const vendorData = plainToClass(FoodItemDto, req.body);
        const errors = await validate(vendorData, { skipMissingProperties: true });
        if(errors.length > 0){
            res.status(400).json({ success: false, message: 'All fields are required', errors });
            return;
        };
                
        const { name, description, price, category, available, readyTime } = req.body as FoodItemDto;

        const id = req.params.id; 

        const foodItem = await FoodItem.findById({_id: id});

        if(!foodItem){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }      
 
        foodItem.name= name;  
        foodItem.description= description;    
        foodItem.price = Types.Decimal128.fromString(price.toString());    
        foodItem.category= category;    
        foodItem.available= available;      
        foodItem.readyTime= Types.Decimal128.fromString(readyTime.toString());      

        await foodItem.save();

        res.status(200).json({success:true, message: "Vendor was updated successfully"});   
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error});
    }
    return;
};

export const removeFoodItems = async (req: Request, res: Response): Promise<void>  => {
    try {  
        const vendor = await checkUser(req, res, String(process.env.VENDOR)); 

        const itemId = req.params.id;

        const foodItems = await FoodItem.findOneAndDelete({vendorId: vendor?.id, _id: itemId});

        if(!foodItems){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }       
  
        res.status(200).json({ success: true });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};

export const getVendorMenu = async (req: Request, res: Response) : Promise<void> => {
    try {  
        const vendorid = req.params.vendorid; 

        const foodItems= await FoodItem.findById({vendorid});

        if(!foodItems){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }       

        res.status(200).json({success:true, foodItems});   
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error});
    }
    return;
};

