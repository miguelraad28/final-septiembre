import { Router } from 'express'
import { autentication } from '../../middlewares/autentication.js'
import { cartsGetController } from '../../controllers/web/carts.controller.js'

export const cartRouter = Router()

cartRouter.get("/:cid",autentication, cartsGetController)


