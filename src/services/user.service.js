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

//   async deletetwoDaysAgo(){
//     const twoDaysAgo = new Date()
//     twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
//     const filter = { last_connection: { $lt: twoDaysAgo } }
//     try {
//       const users = await userRepository.read(filter)
//       for (const user of users){
//       const mensaje = `<p>Hola ${user.email}, tu usuario ha sido eliminado por inactividad</p>`
//       await mailer.send(user.email, "Usuario borrado", mensaje )
//       }
//       const deletedUsers = await userRepository.delete(filter);
//       console.log(`${deletedUsers} usuarios eliminados.`);
//     } catch (error) {
//       //TODO hacer error
//       console.error('Error al eliminar usuarios:', error);
//     }
//   }
async deletetwoDaysAgo() {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  try {
    // Obtener todos los usuarios sin filtro
    const allUsers = await userRepository.read();

    // Filtrar los usuarios cuya última conexión sea anterior a dos días atrás
    const usersToDelete = allUsers.filter((user) => user.last_connection < twoDaysAgo);
    for (const user of usersToDelete) {
      const mensaje = `<p>Hola ${user.firstName}, tu usuario ha sido eliminado por inactividad</p>`;
      await mailer.send(user.email, "Usuario borrado", mensaje);
    }

    // Eliminar los usuarios filtrados
    await userRepository.deleteMany({ _id: { $in: usersToDelete.map((user) => user._id) } });
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante el proceso
    console.error('Error al eliminar usuarios:', error);
  }
}


}

export const userService = new UserService()

