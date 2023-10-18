import { Cart } from '../../models/Cart.js'
import { cartRepository, orderRepository } from '../../repositories/index.js'
import { cartService } from '../../services/cart.service.js'
import { checkoutService } from '../../services/checkout.service.js'



export async function cartPostController(req, res, next) {
    try {
        const idNewCart = await cartRepository.createCart()
        res.status(201).json(`El id del nuevo carrito es : ${idNewCart}`)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function cartPutController(req, res, next) {
    try {
        const idDelProducto = req.params.pid || req.body.idProducto
        await cartService.checkOwner(req.user, idDelProducto)
        const cart = new Cart({idCarrito: req.params.cid, idProducto : idDelProducto, cantidad: req.body.cantidad})
        const carritoActualizado = await cartRepository.updateCart(cart)
        res.status(200).json(carritoActualizado)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function cartConUserPutController(req, res, next) {
    try {
        const {idProducto, cantidad} = req.body
        const carritoActualizado = await cartRepository.addProductToCart(req.user.cart, {_id : idProducto, cant: cantidad})
        res.status(200).json(carritoActualizado)
    } catch (error) {
        next(error)
    }
}

export async function cartFinalizarCompra(req, res, next) {
    try {
        const cart = await cartRepository.showCart({_id : req.params.cid})
        const finalizar = await checkoutService.finalizarCompra(cart[0]._id, cart[0].listProducts)
        res.status(201).json(finalizar);
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function cartMostrarOrders(req, res, next) {
    try {
        const orders = await orderRepository.mostrarOrdersSegunPropiedad({purchaser : req.user.email})
        res.status(200).json(orders);
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error);
    }
}



export async function cartsGetController(req, res, next) {
    try {
        const criterio = {_id: req.params.cid} || {}
        const carts = await cartRepository.showCart(criterio)
        res.status(200).json(carts)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


export async function cartsDeleteProductsController(req, res, next) {
    try {
        const idDelProducto = req.params.pid || null
        const carritoActualizado = await cartRepository.removeProductsFromCart(req.params.cid, idDelProducto)
        res.status(200).json(carritoActualizado)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


