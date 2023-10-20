import { Router } from 'express'
import { crearProductsGetController, editarProductsGetController, productsGetController, productsGetOneController } from '../../controllers/web/productos.controller.js'
import { autentication } from '../../middlewares/autentication.js'
import { auth } from '../../middlewares/auth.js'

export const productosRouter = Router()

productosRouter.get('/', autentication , productsGetController)
productosRouter.get('/detail/:pid', autentication, productsGetOneController)
productosRouter.get('/create', autentication, auth(["admin", "premium"]) , crearProductsGetController)
productosRouter.get('/:pid/edit', autentication, auth(["admin", "premium"]), editarProductsGetController)



