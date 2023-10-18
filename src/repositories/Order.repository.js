import { winstonLogger } from "../utils/logger.js";

export default class OrderRepository {
    constructor(persistence){
        this.persistence = persistence
    }

    async createOrder(data) {
        return await this.persistence.create(data);
    }
    async mostrarOrdersSegunPropiedad(data) {
        try {
            return ordenesEncontradas = await this.persistence.read(data)
        } catch (error) {
            winstonLogger.error(`Error en la consulta: ${error}`)
        }
    }

}
