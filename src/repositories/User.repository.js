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
            return result.map(obj => {
                if (obj.password) {
                    delete obj.password
                }
                return obj
            })
        } else if (result && typeof result === 'object') {
            if (result.password) {
                delete result.password;
            }
            return result;
        } else {
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
    async deleteOne(filter){
        return await this.persistence.delete(filter)
    }
    async deleteMany(filter){
        return await this.persistence.deleteMany(filter)
    }
}


