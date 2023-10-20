const completePurchaseButton = document.getElementById("completePurchase")

const idCart =  completePurchaseButton.getAttribute('data-cart-id')

completePurchaseButton.addEventListener("click", () => {
    fetch(`/api/carts/${idCart}/purchase`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(result => {
        if (result.status === 201) {
            window.location.replace(`/order`)
        }
    })
})
