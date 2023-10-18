import { Router, json } from 'express'
import { productosRouter } from './productos.router.js'
import { cartRouter } from './cart.router.js'
import { usersRouter } from './users.router.js'
import { sessionsRouter } from './sessions.router.js'
import { loggerRouter } from './logger.router.js'
import { tokenRouter } from './token.router.js'


export const apiRouter = Router()

apiRouter.use(json())


apiRouter.use('/products', productosRouter)
apiRouter.use('/carts', cartRouter)

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)

apiRouter.use('/loggerTest', loggerRouter)
apiRouter.use('/token', tokenRouter)





