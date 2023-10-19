import { winstonLogger } from "../utils/logger.js";

export default class OrderRepository {
    constructor(persistence){
        this.persistence = persistence
    }

    async createOrder(data) {
        return await this.persistence.create(data);
    }
    async read(filter) {
        try {
            return await this.persistence.readAndPopulate(filter)
        } catch (error) {
            winstonLogger.error(`Error en la consulta: ${error}`)
        }
    }

}
