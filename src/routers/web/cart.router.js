import { Router } from 'express'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { cartsGetController } from '../../controllers/web/cartsGet.controller.js'

export const cartRouter = Router()

// listo !  Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico,
// donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
cartRouter.get("/:cid",autenticacion, cartsGetController)
cartRouter.get("/",autenticacion, cartsGetController)


