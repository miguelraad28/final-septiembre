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
})
