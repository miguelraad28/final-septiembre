const socket = io()

const btnAgregarAlCarrito = document.getElementById('btnAgregarAlCarrito')


if (btnAgregarAlCarrito) {
    btnAgregarAlCarrito.addEventListener('click', async () => {
        const cantidadInput = document.getElementById('cantidadInput')
        const cantidad = cantidadInput.value
        const datosACargar = {
            idProducto: btnAgregarAlCarrito.getAttribute('data-product-id'),
            cantidad: parseInt(cantidad) 
        }
        try {
            const response = await fetch('/api/carts', {
                method: 'PUT',
                body: JSON.stringify(datosACargar),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                socket.emit('agregarAlCarrito', datosACargar)
            } else {
                throw new Error(`Error al agregar el producto al carrito: ${response.status}`);
            }
        } catch (error) {
            //TODO
            console.error(error)
        }
    })
}

socket.on('carritoActualizado', datosCargados => {
    const { cantidad, idProducto } = datosCargados
    const pAgregado = document.getElementById(`p${idProducto}`)
    if (pAgregado) {
        pAgregado.innerHTML = `Agregado ${cantidad} al carrito.`
    }
})
