
export default class TokenRepository {
    constructor(persistence) {
        this.persistence = persistence
    }

    async createToken(record) {
        const token = await this.persistence.create(record)
        return token
    }

    async readToken(filter){
      return await this.persistence.read(filter)
  }

    async updateToken(filter, updatedData) {
        return await this.persistence.update(filter, updatedData)
    }

}