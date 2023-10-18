import { validarNumero, validarNumeroEntero, validarString } from "../utils/validaciones.js"

export class Product {
    constructor({ title, description, price, thumbnail, code, stock,  owner }) {
        this.title = validarString(title)
        this.description = validarString(description)
        this.price = validarNumero(price)
        this.thumbnail = validarString(thumbnail)
        this.code = validarString(code)
        this.stock = validarNumeroEntero(stock)
        this.owner = owner
    }
}

