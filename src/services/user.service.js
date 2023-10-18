import { UserExistsError } from "../errors/errors.js"
import { Token } from "../models/Token.js"
import { cartRepository, tokenRepository, userRepository } from "../repositories/index.js"
import { decodificarToken, generarToken, hashear, validarQueSeanIguales } from "../utils/criptografia.js"
import { mailer } from "../utils/mailer.js"

class UserService {
  async checKIfExist(email){
      const exists = await userRepository.read({email : email})
      if (!Array.isArray(exists)) {
      throw new UserExistsError()
    }
  }
  async create(user){
    const { firstName, lastName, email, age, password, rol } = user
    await this.checKIfExist(email)
    const CartId = await cartRepository.createCart()
    const userToCreate = {
      firstName,
      lastName,
      email,
      age: Number(age),
      password: hashear(password),
      cart: CartId,
      rol
    }
    await userRepository.create(userToCreate)
  }
  async updatePassword(filter, updatedData, token){
    let resetToken
    try {
      resetToken = await tokenRepository.readToken(filter)
    } catch (error) {
      throw new Error(error)
    }
    try {
      decodificarToken(token)
    } catch (error) {
      throw new Error(error)
    }
    
    if(token !== resetToken.token){
      //TODO ERROR, NO TIENE AUTORIZACION PARA RESTABLECER
    }
    const user = await userRepository.read(filter)
    if(validarQueSeanIguales(updatedData.password, user.password)){
      // TODO CREAR ERROR
    }
    const hasheado = hashear(updatedData.password)
    const updated = await userRepository.update(filter, {password: hasheado})
    return updated
  }

  

  async generarTokenPassword(filter){
    
    const user = await userRepository.read(filter)
    const token = generarToken(filter, '1h')
    const url = "http://localhost:8080/"
    const mensaje = `<a href="${url}token/${token}">reestablecer</a>`
    await mailer.send(user.email, "Restablecer contraseña", mensaje )
    const objToken = new Token(filter, {token: token})
    tokenRepository.createToken(objToken)
  }
}

export const userService = new UserService()

