import { Router } from 'express'
import { cartRouter } from './cart.router.js'
import { productosRouter } from './productos.router.js'
import { auth } from '../../middlewares/auth.js'
import { chatController } from '../../controllers/web/chatController.js'
import { autenticacion } from '../../middlewares/autenticacion.js'
import { orderRepository, userRepository } from '../../repositories/index.js'


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
    res.render('login', {title: "Login", loggedIn: loggedIn, user:req.user} )
})

webRouter.get('/restablecer', (req, res) =>{
    res.render('restablecer', {title: "Restablecer"})
})

webRouter.get('/token/:token', (req, res) =>{
    res.render('token', {title: "Restablecer", token: req.params.token})
})

// webRouter.get('/premium',autenticacion, (req, res) =>{
//     const uid = req.user._id
//     const esUser = req.user.rol == "user" ? true : false
//     res.render('upload', {title:"Cargar Archivos ", uid, loggedIn: true , esUser})
// })

async function profileGetController(req, res, next) {
        try {
            const { rol } = req.user
            let orders
            switch(rol){
                case 'admin' :
                const users = await userRepository.readDTO();
                orders = await orderRepository.read()
                res.render('adminProfile', {
                    title: 'Admin Profile',
                    users,
                    loggedIn: true,
                    esUser: req.user.rol === "user" ? true : false,
                    esAdmin: req.user.rol === "admin" ? true : false,
                    esPremium: req.user.rol === "premium" ? true : false,
                    user: req.user,
                    orders
                })
                break
                case 'user' :
                    const propiedadBuscada = 'documento'
                    const valorBuscado1 = 'identificacion'
                    const valorBuscado2 = 'domicilio'
                    const valorBuscado3 = 'estadoDeCuenta'
                    let identificacion = false ,domicilio = false, estadoDeCuenta = false
                    req.user.documents.forEach((objeto) => {
                        if (objeto[propiedadBuscada] === valorBuscado1) {
                            identificacion = true
                        } else if (objeto[propiedadBuscada] === valorBuscado2) {
                            domicilio = true
                        } else if(objeto[propiedadBuscada] === valorBuscado3) {
                            estadoDeCuenta = true
                        }
                    })
                    orders = await orderRepository.read({purchaser: req.user.email})
                    res.render('userProfile', {
                    title: 'User Profile',
                    user: req.user,
                    identificacion,
                    domicilio,
                    estadoDeCuenta,
                    loggedIn: true,
                    esUser: req.user.rol === "user" ? true : false,
                    esAdmin: req.user.rol === "admin" || req.user.rol === "premium" ? true : false,
                    orders
                });
                break
                case 'premium':
                    orders = await orderRepository.read({purchaser: req.user.email})
                    res.render('premiumProfile', {
                    title: 'Premium Profile',
                    user: req.user,
                    loggedIn: true,
                    esUser: req.user.rol === "user" ? true : false,
                    esAdmin: req.user.rol === "admin" ? true : false,
                    esPremium: req.user.rol === "premium" ? true : false,
                    orders
                })
            } 
        }catch (error) {next(error)}
}
webRouter.get('/profile',autenticacion, profileGetController)

async function orderGetController(req, res, next) {
    try {
        let orders
        if(req.user.rol == "admin"){
        }else{
            orders = await orderRepository.read({purchaser: req.user.email})
        }
        console.log(orders)
            res.render('order', {
                title: 'Orden de compra',
                user: req.user,
                loggedIn: true,
                esUser: req.user.rol === "user" ? true : false,
                esAdmin: req.user.rol === "admin" || req.user.rol === "premium" ? true : false,
                orders
            })
        } catch (error) {next(error)}
}

webRouter.get('/order', autenticacion, orderGetController)


webRouter.get("*", (req,res,next)=>{
    res.send("ruta no reconocida" + req.url)
})
