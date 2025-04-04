import { Request, Response, NextFunction } from "express"; 

export const uploadUserImage = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        const { id } = req.params; 

        //find user or vendor then add image url on server to him
        
        if (!req.file) {
           res.status(400).json({ message: "No file uploaded" });
           return;
        }
    
        res.json({
          success: true,
          message: "File uploaded successfully",
          filePath: `/uploads/${req.file.filename}`, // Path to the uploaded file
        });
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
      return;
};
