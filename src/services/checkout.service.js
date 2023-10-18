
import Ticket from "../models/Ticket.js";
import { cartRepository, orderRepository, productRepository, userRepository } from "../repositories/index.js";


class CheckoutService {

    async calculateAmount(withStock) {
        let amount = 0;
        for (const product of withStock) {
            const productFound = await productRepository.read({_id : product.id});
            const totalByProduct = productFound.price * product.cantidad;
            amount += totalByProduct;
        }
        return amount;
    }
    async updateCart(cartId, stock) {
        if(stock.withStock){
            const idToRemove = stock.withStock.map(product => product.id.toString());
            return await cartRepository.removeProducts(cartId.toString(), idToRemove)
        }
    }

    async generarTicket(idCarrito, productList) {
        const stock = await productRepository.checkStock(productList)
        if(stock.withStock){
            // creo ticket
            const precioTotal = await this.calculateAmount(stock.withStock)
            const user = await userRepository.read({cart : idCarrito})
            const emailUser = user.email
            const ticket = new Ticket(precioTotal, emailUser)
            const order = await orderRepository.createOrder(ticket)
            // actualizo carrito
            this.updateCart(idCarrito, stock)
            return order
        }
    }
    
    
    async finalizarCompra(idCarrito, productList) {
        const order = await this.generarTicket(idCarrito, productList)
        return order
    }
}

export const checkoutService = new CheckoutService()

