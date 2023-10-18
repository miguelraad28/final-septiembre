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

  // async documentsUpdate(filter, files){
  //   const documents = []
  //       if(files["identificacion"]){
  //           documents.push({
  //           documento: "identificacion",
  //           name: files["identificacion"][0].filename,
  //           reference: files["identificacion"][0].path
  //           })
  //       }
  //       if(files["domicilio"]){
  //           documents.push({
  //               documento: "domicilio",
  //               name: files["domicilio"][0].filename,
  //               reference: files["domicilio"][0].path
  //           })
  //       }
  //       if(files["estadoDeCuenta"]){
  //           documents.push({
  //               documento: "estadoDeCuenta",
  //               name: files["estadoDeCuenta"][0].filename,
  //               reference: files["estadoDeCuenta"][0].path
  //           })
  //       }
  // }

  // async documentsUpdate(filter, files) {
  //   const documents = [];

  //   if (files["identificacion"]) {
  //     documents.push({
  //       documento: "identificacion",
  //       name: files["identificacion"][0].filename,
  //       reference: files["identificacion"][0].path
  //     });
  //   }
  //   if (files["domicilio"]) {
  //     documents.push({
  //       documento: "domicilio",
  //       name: files["domicilio"][0].filename,
  //       reference: files["domicilio"][0].path
  //     });
  //   }
  //   if (files["estadoDeCuenta"]) {
  //     documents.push({
  //       documento: "estadoDeCuenta",
  //       name: files["estadoDeCuenta"][0].filename,
  //       reference: files["estadoDeCuenta"][0].path
  //     });
  //   }

  //   // Agregar los documentos a la propiedad "documents" usando la función "update"
  //   if (documents.length > 0) {
  //     // Si hay al menos un documento, actualiza la propiedad "documents" con los nuevos objetos
  //     const updateFilter = { _id: filter._id }; // Reemplaza '_id' por el campo que identifica al usuario
  //     const updatedData = { $push: { documents: { $each: documents } } };
  //     await userRepository.update(updateFilter, updatedData);
  //   }
  // }

  async documentsUpdate(filter, files) {
    const documentsToAdd = [];

    if (files["identificacion"]) {
      documentsToAdd.push({
        documento: "identificacion",
        name: files["identificacion"][0].filename,
        reference: files["identificacion"][0].path
      });
    }
    if (files["domicilio"]) {
      documentsToAdd.push({
        documento: "domicilio",
        name: files["domicilio"][0].filename,
        reference: files["domicilio"][0].path
      });
    }
    if (files["estadoDeCuenta"]) {
      documentsToAdd.push({
        documento: "estadoDeCuenta",
        name: files["estadoDeCuenta"][0].filename,
        reference: files["estadoDeCuenta"][0].path
      });
    }

    // Realizar una consulta para obtener el número actual de documentos en "documents"
    const user = await userRepository.readDTO(filter);
    const currentDocumentCount = user.documents.length;

    // Agregar los documentos a la propiedad "documents" usando la función "update"
    if (documentsToAdd.length > 0) {
      const updatedData = { $push: { documents: { $each: documentsToAdd } } };
      await userRepository.update(filter, updatedData);

      // Verificar si la cantidad total de "documents" es 3 y cambiar "status" a true si es el caso
      const totalDocumentCount = currentDocumentCount + documentsToAdd.length;
      if (totalDocumentCount === 3) {
        const updateStatusData = { $set: { status: true } };
        await userRepository.update(filter, updateStatusData);
      }
    }
  }

  async rolUpdate(filter, updatedData){
    const user = await userRepository.readDTO(filter)
    if((updatedData.rol === "premium" && user.status)||
        (updatedData.rol === "user")){
          return await userRepository.update(filter, updatedData)
        }
    //TODO ERROR
    console.log("devolver un error indicando que el usuario no ha terminado de procesar su documentación.")
  }

  async deletetwoDaysAgo(){
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    const filter = { last_connection: { $lt: twoDaysAgo } }
    try {
      const users = await userRepository.read(filter)
      for (const user of users){
      const mensaje = `<p>Hola ${user.email}, tu usuario ha sido eliminado por inactividad</p>`
      await mailer.send(user.email, "Usuario borrado", mensaje )
      }
      const deletedUsers = await userRepository.delete(filter);
      console.log(`${deletedUsers} usuarios eliminados.`);
    } catch (error) {
      //hacer error
      console.error('Error al eliminar usuarios:', error);
    }
  }
}

export const userService = new UserService()

