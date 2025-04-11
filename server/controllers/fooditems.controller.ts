import { Request, Response } from "express"; 
import { CreateFoodItemDto } from "../dto/foodItem.dto";
import { FoodItem } from "../models/fooditem.model";
import { Vendor } from "../models/vendor.model";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";  
import { IFoodItem } from "../models/fooditem.model";
import { checkUser } from "../utilities/getUser";

export const addFoodItem = async (req: Request, res: Response): Promise<void> => {
    try { 
            const vendor = await checkUser(req, res, String(process.env.VENDOR));

            if(!vendor){
                res.status(401).json({ success: false, message: 'Unauthorized access' });
                return;
            }

            const foodData = plainToClass(CreateFoodItemDto, req.body);
            const errors = await validate(foodData, { skipMissingProperties: false });
            if(errors.length > 0){
                res.status(400).json({ success: false, message: 'All fields are required', errors });
                return;
            };
   
            const { name, description, price, category, available, readyTime} = req.body as CreateFoodItemDto;
             
            const files = req.files as [Express.Multer.File];

            const foodImages = files.map((file:Express.Multer.File) => file.fieldname)

            const newFood = await FoodItem.create({
                vendorId: vendor.id,
                name: name,
                description: description,
                price: price,
                category: category,
                images: foodImages,
                available: available,
                rating: 0,
                readyTime: readyTime
            }) ;
            const foodResult = await newFood.save();

            if(!foodResult || !foodResult._id){
                res.status(400).json({ success: false, message: 'Food item could not be created'});
                return;
            }    

            await vendor.menu.push(newFood);
            const vendorResult = await vendor.save();

            if(!vendorResult || !vendorResult._id){
                res.status(400).json({ success: false, message: 'Vendor could not be updated'});
                return;
            }  
            
            res.status(200).json({ success: true, message: "Food item was created successfully"});
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
        return;
};

export const getFoodItems = async (req: Request, res: Response): Promise<void>  => {
    try {  
        const vendor = await checkUser(req, res, String(process.env.VENDOR));

        if(!vendor){
            res.status(401).json({ success: false, message: 'Unauthorized access' });
            return;
        } 

        const foodItems = await FoodItem.find({vendorId: vendor?.id});

        if(!foodItems){
            res.status(404).json({ success: false, message: 'Nothing was not found'});
            return;
        }  

        res.status(200).json({ success: true, foodItems });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
};
//services not tied to a user it's general
 
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
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
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


