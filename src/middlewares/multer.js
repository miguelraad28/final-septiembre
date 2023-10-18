import { randomUUID } from 'crypto';
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  const type = req.body.type;
  let destination = 'public/uploads/documents'
      if (type === 'profile') {
          destination = 'public/uploads/profiles'
      } else if (type === 'product') {
          destination = 'public/uploads/products'
      }
      cb(null, destination)
  },
  filename: (req, file, cb) => {
      cb(null, randomUUID()+path.extname(file.originalname));
  }
})

export const multerMiddleware = multer({ 
  storage, 
  fileFilter:(req, file, cb) =>{ 
    const fileTypes = /jpeg|jpg|png/
    const mimetype = fileTypes.test(file.mimetype)
    const extName = fileTypes.test(path.extname(file.originalname))
    if(mimetype && extName){
      return cb(null, true)
    }
    cb("ERROR, el archivo debe ser una imagen válida")
  }
})
