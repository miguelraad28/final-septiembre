import { persistence } from "../dao/factory.js";
import CartRepository from "./Cart.repository.js";
import MessagesRepository from "./Messages.repository.js";
import OrderRepository from "./Order.repository.js";
import ProductRepository from "./Product.repository.js";
import TokenRepository from "./Token.repository.js";
import UserRepository from "./User.repository.js";


export const productRepository = new ProductRepository(persistence.product)
export const cartRepository = new CartRepository(persistence.cart)
export const orderRepository = new OrderRepository(persistence.order)
export const messagesRepository = new MessagesRepository(persistence.messages)
export const userRepository = new UserRepository(persistence.user)
export const tokenRepository = new TokenRepository(persistence.token)