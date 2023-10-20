import { Router } from 'express'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { cartsGetController } from '../../controllers/web/carts.controller.js'

export const cartRouter = Router()

cartRouter.get("/:cid",autenticacion, cartsGetController)
// cartRouter.get("/",autenticacion, cartsGetController)


