const finalizarComprabtn = document.getElementById("finalizarCompra")

const idCart =  finalizarComprabtn.getAttribute('data-cart-id')

finalizarComprabtn.addEventListener("click", () => {
    fetch(`/api/carts/${idCart}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => {
        if (result.status === 201) {
            window.location.replace(`/carts/${idCart}`)
        }
    })
})

