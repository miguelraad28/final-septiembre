import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const fileName = fileURLToPath(import.meta.url)
const dirName = dirname(fileName)


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationFolder = ''
    if (file.fieldname === 'profileImage') {
      destinationFolder = 'profiles'
    } else if (file.fieldname === 'productImage') {
      destinationFolder = 'products'
    } else if (file.fieldname === 'document') {
      destinationFolder = 'documents'
    }
    cb(null, join(dirName, destinationFolder))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const multerMiddleware = multer({ storage: storage })

export default multerMiddleware
