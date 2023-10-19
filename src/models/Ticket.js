import { validarNumero } from "../utils/validaciones.js"
import { randomUUID } from 'crypto';

export default class Ticket {
    constructor(amount, purchaser, listProducts){
        this.code = randomUUID()
        this.purchase_dateTime = new Date()
        this.amount = validarNumero(amount),
        this.purchaser = purchaser
        this.listProducts = listProducts
    }
}
