export default class Cart {
    products
    static idCounter = 0
    constructor() {
        const newId = ++Cart.idCounter
        this.products = []
        this.id = newId.toString()
    }
}