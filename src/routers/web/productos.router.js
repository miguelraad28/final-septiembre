import { Router } from 'express'
import { crearProductsGetController, editarProductsGetController, productsGetController, productsGetOneController } from '../../controllers/web/productos.controller.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { auth } from '../../middlewares/auth.js'

export const productosRouter = Router()

productosRouter.get('/', autenticacion , productsGetController)
productosRouter.get('/detail/:pid', autenticacion, productsGetOneController)
productosRouter.get('/create', autenticacion, auth(["admin", "premium"]) , crearProductsGetController)
productosRouter.get('/:pid/edit', autenticacion, auth(["admin", "premium"]), editarProductsGetController)



