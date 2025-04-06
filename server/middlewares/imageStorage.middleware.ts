import multer from "multer";
import path from "path";
import { Request } from "express"; 
 
const imageStorage = multer.diskStorage({
  destination: "../assets/uploads", 
  filename: (req: Request, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});


export default imageStorage;
