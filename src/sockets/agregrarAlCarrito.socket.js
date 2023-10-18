
export async function agregarAlCarritoSocket(io, socket) {
    socket.on('agregarAlCarrito', async datosACargar => {
        io.sockets.emit('carritoActualizado', datosACargar)
    })
}