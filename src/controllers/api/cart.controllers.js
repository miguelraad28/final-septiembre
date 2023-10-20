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
        const idDelProducto = req.params.pid || req.body.productId
        await cartService.checkOwner(req.user, idDelProducto)
        const cart = new Cart({idCart: req.params.cid, productId : idDelProducto, quantity: req.body.quantity})
        const updatedCart = await cartRepository.updateCart(cart)
        res.status(200).json(updatedCart)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function cartWithUserPutController(req, res, next) {
    try {
        const {productId, quantity} = req.body
        await cartService.checkOwner(req.user, productId)
        const updatedCart = await cartRepository.addProductToCart(req.user.cart, {_id : productId, cant: quantity})
        res.status(200).json(updatedCart)
    } catch (error) {
        next(error)
    }
}

export async function cartcompletePurchase(req, res, next) {
    try {
        const cart = await cartRepository.showCart({_id : req.params.cid})
        const finished = await checkoutService.completePurchase(cart[0]._id, cart[0].listProducts)
        res.status(201).json(finished)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function cartShowOrders(req, res, next) {
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
        const criteria = {_id: req.params.cid} || {}
        const cart = await cartRepository.showCart(criteria)
        res.status(200).json(cart)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}

export async function cartsDeleteProductsController(req, res, next) {
    try {
        const productId = req.params.pid || null
        const updatedCart = await cartRepository.removeProducts(req.params.cid, productId)
        res.status(200).json(updatedCart)
    } catch (error) {
        req.logger.error(`message: ${error.message} - ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        next(error)
    }
}


