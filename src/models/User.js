import { validarEmail, validarNumeroEntero } from "../utils/validaciones.js";

export default class User{
    constructor(user){
        this.first_name = user.first_name,
        this.last_name = user.last_name,
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