const socket = io()

const addToCart = document.getElementById('addToCart')


if (addToCart) {
    addToCart.addEventListener('click', async () => {
        const quantityInput = document.getElementById('quantityInput')
        const quantity = quantityInput.value
        const dataToLoad = {
            productId: addToCart.getAttribute('data-product-id'),
            quantity: parseInt(quantity) 
        }
        try {
            const response = await fetch(`/api/carts`, {
                method: 'PUT',
                body: JSON.stringify(dataToLoad),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                socket.emit('agregarAlCarrito', dataToLoad)
            } else {
                throw new Error(`Error al agregar el producto al carrito: ${response.status}`);
            }
        } catch (error) {
            //TODO
            console.error(error)
        }
    })
}



const btnDeleteProductos = document.querySelectorAll('.btnDeleteProductoDelCarrito')
const btnFinalizar = document.getElementById('completePurchase')
btnDeleteProductos.forEach((btn) => {
    btn.addEventListener('click', async () => {
        const cartId = btnFinalizar.getAttribute('data-cart-id')
        const productId = btn.getAttribute('data-product-id')
            const url = `/api/carts/${cartId}/products/${productId}`
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            })
            if (response.ok) {
                window.location.reload()
            } else {
                console.error(`Error al eliminar el producto del carrito: ${response.status}`)
            }
        } catch (error) {
            console.error(error)
        }
        })
    })

socket.on('updatedCart', datosCargados => {
    const { quantity, productId } = datosCargados
    const pAgregado = document.getElementById(`p${productId}`)
    if (pAgregado) {
        pAgregado.innerHTML = `Agregado ${quantity} al carrito.`
    }
})
