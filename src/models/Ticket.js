import { validarEmail, validarNumero } from "../utils/validaciones.js"

export default class Ticket {
    static codeCounter = 0
    constructor(amount, purchaser, products){
        this.code = Ticket.codeCounter++
        this.purchase_dateTime = new Date()
        this.amount = validarNumero(amount),
        this.purchaser = purchaser
        // this.listProducts = products
    }
}
