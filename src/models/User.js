import { validarEmail, validarNumeroEntero } from "../utils/validaciones.js";

export default class User{
    constructor(user){
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.email = validarEmail(user.email),
        this.age = validarNumeroEntero(user.age),
        this.password = user.password,
        this.cart = user.cart,
        this.rol = user.rol,
        this.documents = [],
        this.last_connection = new Date(),
        this.status = false
    }
}