import { validarNumeroEntero } from "../utils/validaciones.js";

export class Cart {
    constructor({idCart, productId, quantity}) {
        this.idCart = idCart,
        this.productId = productId,
        this.quantity = validarNumeroEntero(quantity)
    }
}
