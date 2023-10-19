import User from "../models/User.js";

export default class UserRepository{
    constructor(persistence){
        this.persistence = persistence
    }

    async create(user) {
        const productToInsert = new User(user)
        return await this.persistence.create(productToInsert)
    }

    async readDTO(filter) {
        const result = await this.persistence.read(filter)
        if (Array.isArray(result)) {
            // Si el resultado es un array, excluimos el campo "password" de cada objeto
            return result.map(obj => {
                if (obj.password) {
                    delete obj.password
                }
                return obj
            })
        } else if (result && typeof result === 'object') {
            // Si el resultado es un solo objeto, excluimos el campo "password" del objeto
            if (result.password) {
                delete result.password;
            }
            return result;
        } else {
            // Si no se encontraron resultados, devolvemos un array vacío o null según sea el caso
            return Array.isArray(result) ? [] : null;
        }
    }
    async read(filter){
        const user = await this.persistence.read(filter)
        return user
    }

    async update(filter, updatedData){
        return await this.persistence.update(filter, updatedData)
    }
    async deleteMany(filter){
        return await this.persistence.deleteMany(filter)
    }
}


