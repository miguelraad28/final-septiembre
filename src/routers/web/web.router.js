import { Router } from 'express'
import { cartRouter } from './cart.router.js'
import { productosRouter } from './productos.router.js'
import { auth } from '../../middlewares/auth.js'
import { chatController } from '../../controllers/web/chatController.js'


export const webRouter = Router()

webRouter.use('/products', productosRouter)
webRouter.use('/carts', cartRouter)

webRouter.get('/', (req, res) =>{
    res.redirect('/login')
})

webRouter.get('/chat', auth(["user"]), chatController)

webRouter.get('/register', (req, res) =>{
    res.render('register', {title: "Registrarse"})
})


webRouter.get('/login', (req, res) => {
    let loggedIn
    if(req.user){
        loggedIn =  true
    } else {
        loggedIn = false }

    res.render('login', {title: "Login", loggedIn: loggedIn} )
})

webRouter.get('/restablecer', (req, res) =>{
    res.render('restablecer', {title: "Restablecer"})
})

webRouter.get('/token/:token', (req, res) =>{
    res.render('token', {title: "Restablecer", token: req.params.token})
})


webRouter.get("*", (req,res,next)=>{
    res.send("ruta no reconocida" + req.url)
})
