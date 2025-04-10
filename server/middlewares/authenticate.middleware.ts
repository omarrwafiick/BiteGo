import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../dto/auth.dto";
import { ValidateSignature } from "../utilities/security";

declare global{
    namespace Express{
        interface Request {
            user?:AuthPayload
        }
    }
}; 

export const ValidateSignatureMiddleWare = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    const validate = await ValidateSignature(req);
    if(validate) next();
    else res.status(401).json({success: false, message: "User is not authenticated"});
    return;
};