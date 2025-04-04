import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express"; 
 
const storage = multer.diskStorage({
  destination: "../assets/uploads", 
  filename: (req: Request, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
