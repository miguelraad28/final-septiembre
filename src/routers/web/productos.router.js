import { Router } from 'express'
import { crearProductsGetController, editarProductsGetController, productsGetController } from '../../controllers/web/productosGet.controller.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { auth } from '../../middlewares/auth.js'

export const productosRouter = Router()

productosRouter.get('/', autenticacion , productsGetController)

productosRouter.get('/create', autenticacion, auth(["admin", "premium"]) , crearProductsGetController)
productosRouter.get('/:pid/edit', autenticacion, auth(["admin", "premium"]), editarProductsGetController)



