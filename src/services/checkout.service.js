
import Ticket from "../models/Ticket.js";
import { cartRepository, orderRepository, productRepository, userRepository } from "../repositories/index.js";
import { mailer } from "../utils/mailer.js";
import { mensajeCompraExitosa } from "../utils/mensajesMailer.js";


class CheckoutService {

    async calculateAmount(withStock) {
        let amount = 0;
        for (const product of withStock) {
            const productFound = await productRepository.read({_id : product.productId});
            const totalByProduct = productFound.price * product.quantity;
            amount += totalByProduct;
        }
        return amount;
    }
    async updateCart(cartId, stock) {
        if(stock.withStock){
            const idToRemove = stock.withStock.map(product => product.productId.toString());
            return await cartRepository.removeProducts(cartId.toString(), idToRemove)
        }
    }

    async generarTicket(idCart, productList) {
        const stock = await productRepository.checkStock(productList)
        if(stock.withStock){
            // creo ticket
            const precioTotal = await this.calculateAmount(stock.withStock)
            const user = await userRepository.read({cart : idCart})
            const emailUser = user.email
            const ticket = new Ticket(precioTotal, emailUser, stock.withStock)
            const order = await orderRepository.createOrder(ticket)
            // actualizo carrito
            this.updateCart(idCart, stock)
            return order
        }
    }
    
    async completePurchase(idCart, productList) {
        const order = await this.generarTicket(idCart, productList)
        await mailer.send(order.purchaser, "Compra exitosa", mensajeCompraExitosa(order) )
        return order
    }
}

export const checkoutService = new CheckoutService()

