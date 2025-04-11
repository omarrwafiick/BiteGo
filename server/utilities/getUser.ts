import { Request, Response } from "express";
import { findAdmin, findDelivery, findUser, findVendor } from "./helper.methods";

//in case we have user | delivery | admin | vendor we want to validate and get his data
export const checkUser = async (req: Request, res: Response, type: string): Promise<any | null> => { 
    try { 
        const user = req.user;
 
        if(!user){ 
            return null;
        };
        
        const profile = type === process.env.USER 
            ? await findUser(user.id) 
            : type === process.env.ADMIN 
            ? await findAdmin(user.id) 
            : type === process.env.DELIVERY 
            ? await findDelivery(user.id)
            : await findVendor(user.id) ;
        
        if(profile){ 
            return profile;
        };
    }
    catch(error){
        return null;
    }
    return null;
}