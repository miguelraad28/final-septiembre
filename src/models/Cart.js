import { validarNumeroEntero } from "../utils/validaciones.js";

export class Cart {
    constructor({idCarrito, idProducto, cantidad}) {
        this.idCarrito = idCarrito,
        this.idProducto = idProducto,
        this.cantidad = validarNumeroEntero(cantidad)
    }
}
