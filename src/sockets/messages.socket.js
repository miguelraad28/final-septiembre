import { messagesRepository } from '../repositories/index.js'

export async function configureMessagesSocket(io, socket) {
    const mensajes = await messagesRepository.mostrarmensajes()
    io.sockets.emit('mensajes', mensajes)
    socket.on('nuevoMensaje', async msg => {
        await messagesRepository.registrar(msg)
        const mensajes = await messagesRepository.mostrarmensajes()
        io.sockets.emit('mensajes', mensajes)
    })
    socket.on('borrarMensajes', async() => {
        const mensajes = await messagesRepository.vaciarChat()
        io.sockets.emit('mensajes', mensajes)
    })
}