import { Request, Response } from "express";
import { checkUser } from "../utilities/getUser";

export const uploadAccountImage = async (req: Request, res: Response): Promise<void> => { 
    try {
        const type = req.params.type;

        if(type === process.env.ADMIN){
            res.status(403).json({ success: false, message: "Forbidden route" });
            return 
        }
        
        const user = await checkUser(req, res, type);  
        
        if (!user) {
          res.status(401).json({ success: false, message: "Unauthorized access" });
          return 
        }
       
        if (!req.file) {
           res.status(400).json({ success: false, message: "No image uploaded" });
           return;
        }
     
        user.profilePicture = `/uploads/${req.file.filename}`;
        await user.save();
    
        res.status(200).json({ success: true, message: "Profile picture updated successfully", profilePicture: user.profilePicture });
    
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    
}; 