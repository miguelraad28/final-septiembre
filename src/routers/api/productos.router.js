import { Router } from 'express'

import {
        mockProductsPostController,
        productsDeleteController,
        productsGetController,
        productsGetOneController,
        productsPostController,
        productsPutController
} from '../../controllers/api/products.controllers.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { auth } from '../../middlewares/auth.js'
import { multerMiddleware } from '../../middlewares/multer.js'

export const productosRouter = Router()

productosRouter.post('/mockingproducts', mockProductsPostController )
// productosRouter.post('/', autenticacion, auth(["admin", "premium"]), multerMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]), productsPostController) // guardar producto
productosRouter.post('/',autenticacion, auth(['admin', 'premium']), multerMiddleware.single('thumbnail'), productsPostController), // Usamos .single() para el campo "thumbnail" de imagen productsPostController);
// productosRouter.put('/:pid', autenticacion, auth(["admin", "premium"]),productsPutController)
productosRouter.put('/:pid', autenticacion, auth(["admin", "premium"]), multerMiddleware.single('thumbnail'), productsPutController);





productosRouter.delete('/:pid',autenticacion, auth(["admin", "premium"]), productsDeleteController)





productosRouter.get('/:pid', productsGetOneController) // ver solo un producto según id
productosRouter.get('/', productsGetController) // ver productos
