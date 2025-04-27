import { Request, Response } from "express";
import { checkUser } from "../utilities/getUser";
import path from 'path';
import fs from 'fs';

export const uploadAccountImage = async (req: Request, res: Response): Promise<void> => {  
  try {
      const type = req.params.type; 

      if(type === process.env.ADMIN){
        res.status(403).json({ success: false, message: "Forbidden route" });
        return 
      }

      const user = await checkUser(req, res, type); 

      if (req.files && Array.isArray(req.files)) {
          const imagePaths: string[] = [];

          for (const file of req.files) {
              const filename = `${Date.now()}-${file.originalname}`;
              const filepath = path.join(__dirname, "../assets/uploads", filename);
              
              try {
                  fs.writeFileSync(filepath, file.buffer);
                  imagePaths.push(filename);
              } catch (fileError) {
                  console.error("Error saving file:", fileError);  
                  res.status(500).json({ success: false, message: "Failed to save file" });
                  return;
              }
          }
 
          user.profilePicture = imagePaths[0];
          await user.save(); 
          
          res.status(200).json({ success: true, message: "Profile picture updated successfully", profilePicturePath: user.profilePicture });
      } else {
          res.status(400).json({ success: false, message: "No files uploaded" });
      }

  } catch (error) { 
      res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getImageFromServer = async (req: Request, res: Response): Promise<void>  => {
    try {  
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../assets/uploads', filename);
       
        if (fs.existsSync(filePath)) { 
          res.sendFile(filePath);
          return;
        } else { 
          res.status(404).json({ success: false, message: 'Image not found' });
        }  
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    return;
}; 