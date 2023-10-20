import { Router } from 'express'
import { cartRouter } from './cart.router.js'
import { productosRouter } from './productos.router.js'
import { auth } from '../../middlewares/auth.js'
import { chatController } from '../../controllers/web/chat.controller.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { orderRepository, userRepository } from '../../repositories/index.js'
import { loginController, orderGetController, profileGetController, registrarController, restablecerController, tokenController } from '../../controllers/web/user.controller.js'
import { NotFoundError } from '../../errors/errors.js'


export const webRouter = Router()

webRouter.use('/products', productosRouter)
webRouter.use('/carts', cartRouter)


webRouter.get('/', (req, res) => { res.redirect('/login')})
webRouter.get('/chat', auth(["user"]), chatController)

webRouter.get('/register', registrarController)
webRouter.get('/login', loginController)
webRouter.get('/restablecer', restablecerController)
webRouter.get('/token/:token', tokenController)
webRouter.get('/profile', autenticacion, profileGetController)
webRouter.get('/order', autenticacion, orderGetController)


webRouter.get("*", (req,res,next)=>{
    const error = new NotFoundError ()
    next(error);
})
