
export default class MessagesRepository {
    constructor(persistencia){
        this.persistencia = persistencia
    }
    async registrar(mensaje) {
        await this.persistencia.guardar(mensaje)
    }
    async mostrarmensajes() {
        const messages = await this.persistencia.read()
        return messages
    }
    async vaciarChat(){
        await this.persistencia.eliminarTodos()
        const messages = await this.persistencia.obtenerTodos()
        return messages
    }
}
