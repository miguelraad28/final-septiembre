
export async function agregarAlCarritoSocket(io, socket) {
    socket.on('agregarAlCarrito', async dataToLoad => {
        io.sockets.emit('updatedCart', dataToLoad)
    })
}